export interface IBaseField {
  $id: string;
  $createdAt: string;
}

export interface ICustomer extends IBaseField {
  name: string;
  email: string;
  avatart: string;
  from_source?: string;
}

export interface IComment extends IBaseField {
  text: string;
}

export enum EnumStatus {
  "to-do" = "to-do",
  "to-be-agreed" = "to-be-agreed",
  "in-progress" = "in-progress",
  "produced" = "produced",
  "done" = "done",
}

export interface IDeal extends IBaseField {
  name: string;
  price: number;
  status: EnumStatus;
  comments: IComment[];
  customer: ICustomer;
}
