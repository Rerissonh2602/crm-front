import { saveAs } from 'file-saver';

import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { UntypedFormGroup } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PlenaryToastService } from '@plenary/services/toast';
import { plenaryAnimations } from '@plenary/animations';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../core/user/user.service';

import { LeadsService } from '../../leads.service';
import { LeadsColumnsService } from '../../../admin/leads-columns/leads-columns.service';
import { LeadColumnInterface } from '../../../admin/leads-columns/leads-columns.types';
import { LeadInterface } from '../../leads.types';

@Component({
  selector: 'leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: plenaryAnimations,
})
export class LeadsListComponent implements OnInit {
  public listTitleForm: UntypedFormGroup;
  public selection = new SelectionModel<number>(true, []);
  public columns: LeadColumnInterface[] = [];
  public dataSource: LeadInterface[] = [];
  public showModal: number = null;
  public showModalArchived: boolean = false;
  public showModalWin: boolean = false;
  public showModalLost: boolean = false;
  public isMasterRole: boolean = false;
  private readonly positionStep: number = 65536;
  private readonly maxListCount: number = 10;
  private readonly maxPosition: number = this.positionStep * 500;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public readonly service: LeadsService,
    private readonly userService: UserService,
    private readonly toastService: PlenaryToastService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly leadsColumnsService: LeadsColumnsService
  ) {}

  ngOnInit(): void {
    this.userService.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user) => {
        if (user.roleId === 1) {
          this.isMasterRole = true;
        }
      });

    this.service.showModal$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((show) => {
        this.showModal = show;
        this.getAll();
      });
    this.getAll();
  }

  getAll(): void {
    this.service
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.dataSource = res.sort((a, b) => a.position - b.position);
        this.changeDetectorRef.markForCheck();
      });

    this.leadsColumnsService
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.columns = res.sort((a, b) => a.position - b.position);
        this.changeDetectorRef.markForCheck();
      });
  }

  downloadReport(): void {
    this.service
      .downloadReport()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        var a = document.createElement("a");
        a.href = "data:application/vnd.ms-excel;base64," + res;
        a.download = "Relatorio de Leads.xlsx";
        a.click();
      });
  }

  findLeads(id: number): LeadInterface[] {
    return this.dataSource
      .filter((item) => item.leadColumnId === id)
      .sort((a, b) => a.position - b.position);
  }

  trackByFn(index: number, item: LeadColumnInterface): any {
    return item.id || index;
  }

  addColumn(name: string): void {
    if (this.columns.length >= this.maxListCount) {
      return;
    }

    const column = {
      name,
      position: this.columns.length
        ? this.columns[this.columns.length - 1].position + this.positionStep
        : this.positionStep,
    };

    this.leadsColumnsService.create(column).subscribe(() => {
      this.getAll();
    });
  }

  addCard(column: LeadColumnInterface, name: string): void {
    const lead = {
      name,
      leadColumnId: column.id,
      position: this.findLeads(column.id).length
        ? this.findLeads(column.id)[this.findLeads(column.id).length - 1]
            .position + this.positionStep
        : this.positionStep,
    };

    this.service.create(lead).subscribe((res) => {
      this.getAll();
      this.toastService.handleMessage(res, null, {
        handleRequest: true,
      });
    });
  }

  leadDropped(event: CdkDragDrop<LeadInterface[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      event.container.data[event.currentIndex].leadColumnId =
        event.container.id;
    }

    const updated = this.calculatePositions(event);

    this.service.updateLeadPosition(updated[0].id, updated[0]).subscribe(() => {
      this.getAll();
    });
  }

  columnDropped(event: CdkDragDrop<LeadColumnInterface[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    const data = this.columns;

    data.forEach((item, index) => {
      item.position = index;
    });

    this.leadsColumnsService.updateLeadColumnPosition(data).subscribe(() => {
      this.columns = data;
    });
  }

  updateColumnTitle(event: any, column: LeadColumnInterface): void {
    const element: HTMLInputElement = event.target;
    const newTitle = element.value;

    if (!newTitle || newTitle.trim() === '') {
      element.value = column.name;
      return;
    }

    column.name = element.value = newTitle.trim();

    this.leadsColumnsService.update(column.id, column).subscribe(() => {
      this.getAll();
    });
  }

  renameColumn(listTitleInput: HTMLElement): void {
    setTimeout(() => {
      listTitleInput.focus();
    });
  }

  deleteColumn(id: number): void {
    this.leadsColumnsService.delete(id).subscribe(() => {
      this.getAll();
    });
  }

  private calculatePositions(event: CdkDragDrop<any[]>): any[] {
    let items = event.container.data;
    const currentItem = items[event.currentIndex];
    const prevItem = items[event.currentIndex - 1] || null;
    const nextItem = items[event.currentIndex + 1] || null;

    if (!prevItem) {
      if (!nextItem) {
        currentItem.position = this.positionStep;
      } else {
        currentItem.position = nextItem.position / 2;
      }
    } else if (!nextItem) {
      currentItem.position = prevItem.position + this.positionStep;
    } else {
      currentItem.position = (prevItem.position + nextItem.position) / 2;
    }

    if (
      !Number.isInteger(currentItem.position) ||
      currentItem.position >= this.maxPosition
    ) {
      items = items.map((value, index) => {
        value.position = (index + 1) * this.positionStep;
        return value;
      });

      return items;
    }

    return [currentItem];
  }
}
