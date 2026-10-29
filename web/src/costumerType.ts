export type InvoiceStatus = 'PAID' | 'PENDING' | 'CANCELLED';
export type InvoicesSituation = 'OVERDUE' | 'UP_TO_DATE'

export interface CustomersOptions {
  id: number;
  name: string;
  email: string;
}

export interface Customer {
  id: number;
  name:string;
  email: string;
}

export interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  situation: InvoicesSituation;
  issueDate: string;
  dueDate: string;
  customer: Customer;
}

export interface InvoiceInput {
  customerId: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}