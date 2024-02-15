export type PlenaryTableInterface = {
  title?: string;
  headers: PlenaryTableHeaderInterface[];
  content: PlenaryTableContentInterface[];
  actions?: boolean;
  selection?: boolean;
  searchable?: boolean;
  searchableConfig?: PlenaryTableFilterConfigInterface;
  paginator?: boolean;
  paginatorConfig?: PlenaryTablePaginatorConfigInterface;
  sortable?: boolean;
  sortConfig?: PlenaryTableSortConfigInterface;
  showMore?: boolean;
};

export type PlenaryTableHeaderInterface = {
  name: string;
  key?: string;
};

export type PlenaryTableContentInterface = {
  type: string;
  key: string;
};

export type PlenaryTablePaginatorConfigInterface = {
  defaultPageSize?: number;
  requestPagination?: boolean;
};

export type PlenaryTableFilterConfigInterface = {
  requestPagination?: boolean;
};

export type PlenaryTableSortConfigInterface = {
  requestPagination?: boolean;
};

export type PlenaryTablePaginatorInterface = {
  pageNumber: number;
  perPage: number;
};

export type PlenaryTableSortInterface = {
  field: string;
  sort: 'asc' | 'desc';
};
