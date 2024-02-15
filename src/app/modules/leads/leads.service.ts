import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LeadInterface, TagInterface } from './leads.types';
import { PlenaryToastService } from '@plenary/services/toast';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  private readonly _show$: BehaviorSubject<number> =
    new BehaviorSubject<number>(null);
  private readonly _lead$: BehaviorSubject<LeadInterface> =
    new BehaviorSubject<LeadInterface>(null);

  constructor(
    private readonly toastService: PlenaryToastService,
    private readonly httpClient: HttpClient
  ) {}

  findAll(): Observable<LeadInterface[]> {
    return this.httpClient.get<LeadInterface[]>('@plenary-api/leads');
  }

  findAllWin(): Observable<LeadInterface[]> {
    return this.httpClient.get<LeadInterface[]>('@plenary-api/leads/win');
  }

  findAllLost(): Observable<LeadInterface[]> {
    return this.httpClient.get<LeadInterface[]>('@plenary-api/leads/lost');
  }

  findAllArchived(): Observable<LeadInterface[]> {
    return this.httpClient.get<LeadInterface[]>('@plenary-api/leads/archived');
  }

  findAllTags(): Observable<TagInterface[]> {
    return this.httpClient.get<TagInterface[]>('@plenary-api/leads/tags');
  }

  findOne(id: number): Observable<LeadInterface> {
    return this.httpClient.get<LeadInterface>(`@plenary-api/leads/${id}`);
  }

  downloadReport(body?: { type: string }): Observable<any> {
    return this.httpClient.post(`@plenary-api/leads/report`, body, { responseType: 'text' });
  }

  get showModal$(): Observable<number> {
    return this._show$.asObservable();
  }

  showModal(id: number): void {
    if (this._show$.value) {
      this.update(this._lead$.getValue().id, this._lead$.getValue()).subscribe(
        (res) => {
          this.toastService.handleMessage(res, null, {
            handleRequest: true,
          });
          this._show$.next(id);
        }
      );
    } else {
      this._show$.next(id);
    }
  }

  hideModal(data?: LeadInterface): void {
    if (data) {
      this.update(data.id, data).subscribe((res) => {
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
        this._show$.next(null);
      });
    } else {
      this._show$.next(null);
    }
  }

  create(
    data: LeadInterface
  ): Observable<{ message: string; lead: LeadInterface }> {
    return this.httpClient.post<{ message: string; lead: LeadInterface }>(
      '@plenary-api/leads',
      data
    );
  }

  createTag(tag: TagInterface): Observable<any> {
    return this.httpClient.post('@plenary-api/leads/tags', tag);
  }

  update(id: number, data: LeadInterface): Observable<any> {
    return this.httpClient.put(`@plenary-api/leads/${id}`, data);
  }

  updateLeadPosition(id: number, data: LeadInterface): Observable<any> {
    return this.httpClient.put(
      `@plenary-api/leads/update-position/${id}`,
      data
    );
  }

  updateTag(id: number, tag: TagInterface): Observable<any> {
    return this.httpClient.put(`@plenary-api/leads/tags/${id}`, tag);
  }

  updateLead(lead: LeadInterface): void {
    this._lead$.next(lead);
  }

  deleteTag(id: number): Observable<any> {
    return this.httpClient.delete(`@plenary-api/leads/tags/${id}`);
  }

  archiveLead(id: number): Observable<any> {
    return this.httpClient.patch(`@plenary-api/leads/archive/${id}`, null);
  }

  setLeadWin(id: number): Observable<any> {
    return this.httpClient.patch(`@plenary-api/leads/set-lead-win/${id}`, null);
  }

  setLeadLost(id: number): Observable<any> {
    return this.httpClient.patch(`@plenary-api/leads/set-lead-lost/${id}`, null);
  }

  unArchiveLead(id: number): Observable<any> {
    return this.httpClient.patch(`@plenary-api/leads/unarchive/${id}`, null);
  }

  deleteLead(id: number): Observable<any> {
    return this.httpClient.delete(`@plenary-api/leads/${id}`);
  }
}
