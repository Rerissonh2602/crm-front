import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlenaryToastService } from '@plenary/services/toast';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { LeadsService } from '../../leads.service';
import { LeadInterface, TagInterface } from '../../leads.types';
import { LeadColumnInterface } from '../../../admin/leads-columns/leads-columns.types';
import { LeadsColumnsService } from '../../../admin/leads-columns/leads-columns.service';

@Component({
  selector: 'leads-form',
  templateUrl: './leads-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LeadsFormComponent implements OnInit, OnDestroy {
  @ViewChild('tagsPanelOrigin') private readonly tagsPanelOrigin: ElementRef;
  @ViewChild('tagsPanel') private readonly tagsPanel: TemplateRef<any>;

  public id: number = null;
  public lead: LeadInterface;
  public leadsColumns: LeadColumnInterface[] = [];
  public tags: TagInterface[] = [];
  public tagsEditMode = false;
  public filteredTags: TagInterface[] = [];
  public form: FormGroup;
  public times = [
    { key: '12:00am', value: '00:00' },
    { key: '12:15am', value: '00:15' },
    { key: '12:30am', value: '00:30' },
    { key: '12:45am', value: '00:45' },
    { key: '01:00am', value: '01:00' },
    { key: '01:15am', value: '01:15' },
    { key: '01:30am', value: '01:30' },
    { key: '01:45am', value: '01:45' },
    { key: '02:00am', value: '02:00' },
    { key: '02:15am', value: '02:15' },
    { key: '02:30am', value: '02:30' },
    { key: '02:45am', value: '02:45' },
    { key: '03:00am', value: '03:00' },
    { key: '03:15am', value: '03:15' },
    { key: '03:30am', value: '03:30' },
    { key: '03:45am', value: '03:45' },
    { key: '04:00am', value: '04:00' },
    { key: '04:15am', value: '04:15' },
    { key: '04:30am', value: '04:30' },
    { key: '04:45am', value: '04:45' },
    { key: '05:00am', value: '05:00' },
    { key: '05:15am', value: '05:15' },
    { key: '05:30am', value: '05:30' },
    { key: '05:45am', value: '05:45' },
    { key: '06:00am', value: '06:00' },
    { key: '06:15am', value: '06:15' },
    { key: '06:30am', value: '06:30' },
    { key: '06:45am', value: '06:45' },
    { key: '07:00am', value: '07:00' },
    { key: '07:15am', value: '07:15' },
    { key: '07:30am', value: '07:30' },
    { key: '07:45am', value: '07:45' },
    { key: '08:00am', value: '08:00' },
    { key: '08:15am', value: '08:15' },
    { key: '08:30am', value: '08:30' },
    { key: '08:45am', value: '08:45' },
    { key: '09:00am', value: '09:00' },
    { key: '09:15am', value: '09:15' },
    { key: '09:30am', value: '09:30' },
    { key: '09:45am', value: '09:45' },
    { key: '10:00am', value: '10:00' },
    { key: '10:15am', value: '10:15' },
    { key: '10:30am', value: '10:30' },
    { key: '10:45am', value: '10:45' },
    { key: '11:00am', value: '11:00' },
    { key: '11:15am', value: '11:15' },
    { key: '11:30am', value: '11:30' },
    { key: '11:45am', value: '11:45' },
    { key: '12:00pm', value: '12:00' },
    { key: '12:15pm', value: '12:15' },
    { key: '12:30pm', value: '12:30' },
    { key: '12:45pm', value: '12:45' },
    { key: '01:00pm', value: '13:00' },
    { key: '01:15pm', value: '13:15' },
    { key: '01:30pm', value: '13:30' },
    { key: '01:45pm', value: '13:45' },
    { key: '02:00pm', value: '14:00' },
    { key: '02:15pm', value: '14:15' },
    { key: '02:30pm', value: '14:30' },
    { key: '02:45pm', value: '14:45' },
    { key: '03:00pm', value: '15:00' },
    { key: '03:15pm', value: '15:15' },
    { key: '03:30pm', value: '15:30' },
    { key: '03:45pm', value: '15:45' },
    { key: '04:00pm', value: '16:00' },
    { key: '04:15pm', value: '16:15' },
    { key: '04:30pm', value: '16:30' },
    { key: '04:45pm', value: '16:45' },
    { key: '05:00pm', value: '17:00' },
    { key: '05:15pm', value: '17:15' },
    { key: '05:30pm', value: '17:30' },
    { key: '05:45pm', value: '17:45' },
    { key: '06:00pm', value: '18:00' },
    { key: '06:15pm', value: '18:15' },
    { key: '06:30pm', value: '18:30' },
    { key: '06:45pm', value: '18:45' },
    { key: '07:00pm', value: '19:00' },
    { key: '07:15pm', value: '19:15' },
    { key: '07:30pm', value: '19:30' },
    { key: '07:45pm', value: '19:45' },
    { key: '08:00pm', value: '20:00' },
    { key: '08:15pm', value: '20:15' },
    { key: '08:30pm', value: '20:30' },
    { key: '08:45pm', value: '20:45' },
    { key: '09:00pm', value: '21:00' },
    { key: '09:15pm', value: '21:15' },
    { key: '09:30pm', value: '21:30' },
    { key: '09:45pm', value: '21:45' },
    { key: '10:00pm', value: '22:00' },
    { key: '10:15pm', value: '22:15' },
    { key: '10:30pm', value: '22:30' },
    { key: '10:45pm', value: '22:45' },
    { key: '11:00pm', value: '23:00' },
    { key: '11:15pm', value: '23:15' },
    { key: '11:30pm', value: '23:30' },
    { key: '11:45pm', value: '23:45' },
  ];

  private tagsPanelOverlayRef: OverlayRef;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public readonly service: LeadsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly leadsColumnsService: LeadsColumnsService,
    private readonly toastService: PlenaryToastService,
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      budget: new FormControl(null, []),
      email: new FormControl('', []),
      phone: new FormControl('', []),
      customerName: new FormControl('', []),
      customerRole: new FormControl('', []),
      leadColumnId: new FormControl(null, []),
      dueAt: new FormControl(null, []),
      tags: new FormControl([], []),
    });

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((item) => {
        this.service.updateLead(this.form.value);
      });

    this.service.showModal$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((id) => {
        if (id) {
          this.id = id;
          this.getAll();
        }
      });
  }

  getAll(): void {
    this.service.findOne(this.id).subscribe((res) => {
      this.lead = res;
      this.service.updateLead(res);
      this.form.patchValue(res);
      this.transformAmount()
    });

    this.leadsColumnsService
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.leadsColumns = res;
      });

    this.service
      .findAllTags()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.tags = res;
        this.filteredTags = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();

    if (this.tagsPanelOverlayRef) {
      this.tagsPanelOverlayRef.dispose();
    }
  }

  closeModal(): void {
    this.service.hideModal({ id: this.id, ...this.form.value });
  }

  openTagsPanel(): void {
    this.tagsPanelOverlayRef = this.overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.tagsPanelOrigin.nativeElement)
        .withFlexibleDimensions(true)
        .withViewportMargin(64)
        .withLockedPosition(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
    });

    this.tagsPanelOverlayRef.attachments().subscribe(() => {
      this.tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
    });

    const templatePortal = new TemplatePortal(
      this.tagsPanel,
      this.viewContainerRef
    );

    this.tagsPanelOverlayRef.attach(templatePortal);

    this.tagsPanelOverlayRef.backdropClick().subscribe(() => {
      if (this.tagsPanelOverlayRef && this.tagsPanelOverlayRef.hasAttached()) {
        this.tagsPanelOverlayRef.detach();
        this.filteredTags = this.tags;
        this.tagsEditMode = false;
      }

      if (templatePortal && templatePortal.isAttached) {
        templatePortal.detach();
      }
    });
  }

  filterTags(event): void {
    const value = event.target.value.toLowerCase();

    this.filteredTags = this.tags.filter((tag) =>
      tag.title.toLowerCase().includes(value)
    );
  }

  filterTagsInputKeyDown(event): void {
    if (event.key !== 'Enter') {
      return;
    }

    if (this.filteredTags.length === 0) {
      this.createTag(event.target.value);

      event.target.value = '';

      return;
    }

    const tag = this.filteredTags[0];
    const isTagApplied = this.tags.find((item) => item.title === tag.title);

    if (isTagApplied) {
      this.deleteTagFromTask(tag);
    } else {
      this.addTagToTask(tag);
    }
  }

  createTag(title: string): void {
    const tag = {
      title,
    };

    this.service
      .createTag(tag)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.tags.push(res.tag);
        this.filteredTags = this.tags;
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  updateTagTitle(tag: TagInterface, event): void {
    tag.title = event.target.value;

    this.service
      .updateTag(tag.id, { id: tag.id, title: tag.title })
      .pipe(debounceTime(300), takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.tags = [
          ...this.tags.filter((item) => item.id !== tag.id),
          res.tag,
        ];
        this.filteredTags = this.tags;
        this.form.get('tags').setValue(this.tags);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });

    this.changeDetectorRef.markForCheck();
  }

  checkTag(tag: TagInterface): boolean {
    return this.form
      .get('tags')
      .value.map((item) => item.title)
      .includes(tag.title);
  }

  deleteTag(tag: TagInterface): void {
    this.service
      .deleteTag(tag.id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.tags = this.tags.filter((item) => item.id !== tag.id);
        this.form
          .get('tags')
          .setValue(
            this.form
              .get('tags')
              .value.filter((item) => item.title !== tag.title)
          );
        this.filteredTags = this.tags;
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  toggleTagsEditMode(): void {
    this.tagsEditMode = !this.tagsEditMode;
  }

  toggleTaskTag(tag: TagInterface): void {
    if (this.form.get('tags').value.find((item) => item.title === tag.title)) {
      this.deleteTagFromTask(tag);
    } else {
      this.addTagToTask(tag);
    }
  }

  addTagToTask(tag: TagInterface): void {
    this.form.get('tags').setValue([...this.form.get('tags').value, tag]);
  }

  deleteTagFromTask(tag: TagInterface): void {
    this.form
      .get('tags')
      .setValue(
        this.form.get('tags').value.filter((item) => item.title !== tag.title)
      );
  }

  getTaskLeadColumn(): LeadColumnInterface {
    return this.leadsColumns.find(
      (item) => item.id === this.form.get('leadColumnId').value
    );
  }

  setTaskLeadColumn(leadColumnId: number): void {
    this.form.get('leadColumnId').setValue(leadColumnId);
  }

  trackByFn(index: number, item: any): any {
    return item?.title || index;
  }

  shouldShowCreateTagButton(inputValue: string): boolean {
    return Boolean(
      !(
        inputValue === '' ||
        this.tags.findIndex(
          (tag) => tag.title.toLowerCase() === inputValue.toLowerCase()
        ) > -1
      )
    );
  }

  public getSelectedTime(): string {
    const currentDate = new Date(this.form.get('dueAt').value);
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return this.times.find(
      (item) =>
        item.key === formattedTime.replace(/\s/g, '').toLocaleLowerCase()
    ).value;
  }

  public addTimeToCurrentDate(selectedTime: string): void {
    const currentDate = this.form.get('dueAt').value
      ? new Date(this.form.get('dueAt').value)
      : new Date();
    const [hours, minutes] = selectedTime.replace(/[^\d:]/g, '').split(':');

    currentDate.setHours(parseInt(hours));
    currentDate.setMinutes(parseInt(minutes));

    this.form.get('dueAt').setValue(currentDate.toISOString());
  }

  setLeadWin(id: number): void {
    this.service
      .setLeadWin(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.service.hideModal(null);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  setLeadLost(id: number): void {
    this.service
      .setLeadLost(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.service.hideModal(null);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  archiveLead(id: number): void {
    // Adicionar o modal de verificação
    this.service
      .archiveLead(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.service.hideModal(null);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  deleteLead(id: number): void {
    // Adicionar o modal de verificação
    this.service
      .deleteLead(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.service.hideModal(null);
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
      });
  }

  getWhatsAppLink(): string {
    const phoneNumber = this.form.get('phone').value;
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');

    return `https://wa.me/${formattedPhoneNumber}`;
  }

  transformAmount(): void {
    const value =
      typeof this.form.get('budget').value === 'string'
        ? this.form.get('budget').value.replace('.', '').replace(',', '.').replace(/[^\d,.]/g, '')
        : this.form.get('budget').value.replace('.', '').replace(',', '.');

    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
    this.form.get('budget').setValue(amount);
  }
}
