import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PlenaryToastService } from '@plenary/services/toast';
import { Subject, takeUntil } from 'rxjs';

import { LeadsService } from '../../leads.service';
import { LeadInterface } from '../../leads.types';
import { LeadColumnInterface } from '../../../admin/leads-columns/leads-columns.types';

@Component({
  selector: 'leads-lost',
  templateUrl: './leads-lost.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LeadsLostComponent implements OnInit, OnDestroy {
  public id: number = null;
  public leadsLost: LeadInterface[];
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();
  @Output() readonly closeModalEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() readonly changeLeadEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    public readonly service: LeadsService,
    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  getAll(): void {
    void this.service.findAllLost().subscribe((res) => {
      this.leadsLost = res;
    });
  }

  trackByFn(index: number, item: LeadColumnInterface): any {
    return item.id || index;
  }

  downloadReport(): void {
    this.service
      .downloadReport({ type: 'win' })
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        var a = document.createElement("a");
        a.href = "data:application/vnd.ms-excel;base64," + res;
        a.download = "Relatorio de Leads Fechados Perdidos.xlsx";
        a.click();
      });
  }

  unArchiveLead(id: number): void {
    this.service
      .unArchiveLead(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.getAll();
        this.changeLeadEvent.emit(true);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  deleteLead(id: number): void {
    this.service
      .deleteLead(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.getAll();
        this.changeLeadEvent.emit(true);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  closeModal(): void {
    this.closeModalEvent.emit(true);
  }
}
