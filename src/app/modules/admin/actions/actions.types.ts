export type ActionInterface = {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type ActionFilterInterface = {
  name?: string;
};
