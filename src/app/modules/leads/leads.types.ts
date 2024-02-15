import { LeadColumnInterface } from '../admin/leads-columns/leads-columns.types';

export type LeadInterface = {
  id?: number;
  name: string;
  description?: string;
  budget?: string;
  email?: string;
  phone?: string;
  customerName?: string;
  customerRole?: string;
  leadColumnId: any;
  leadColumn?: LeadColumnInterface;
  position: number;
  dueAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TagInterface = {
  id?: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
