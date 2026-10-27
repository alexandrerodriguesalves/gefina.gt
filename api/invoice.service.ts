import pool from './database.ts';

export type InvoiceStatus = 'paid' | 'pending';
type InvoicesSituation = 'paid' | 'pending' | 'overdue';

interface Customer {
  id: number;
  name: string;
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

export interface CreateInvoicePayload {
  customerId: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

export interface UpdateInvoicePayload {
  customerId?: number;
  amount?: number;
  status?: InvoiceStatus;
  issueDate?: string;
  dueDate?: string;
}

interface InvoiceRow {
  id: number;
  amount: number;
  status: InvoiceStatus;
  situation: InvoicesSituation;
  issue_date: string;
  due_date: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
}

function toInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    amount: row.amount,
    status: row.status,
    situation: row.situation,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    customer: {
      id: row.customer_id,
      name: row.customer_name,
      email: row.customer_email
    }
  };
}

function toInvoices(rows: InvoiceRow[]): Invoice[] {
  return rows.map(toInvoice);
}

const baseQuery = `
  SELECT
    invoices.id,
    invoices.amount,
    invoices.status,
    CASE 
      WHEN invoices.status = 'paid' THEN 'paid'
      WHEN invoices.due_date < CURRENT_DATE THEN 'overdue'
      ELSE 'pending'
    END AS situation,
    invoices.issue_date::text,
    invoices.due_date::text,
    customers.id AS customer_id,
    customers.name AS customer_name,
    customers.email AS customer_email
  FROM invoices
  JOIN customers ON customers.id = invoices.customer_id
`;

export async function findAllInvoices(): Promise<Invoice[]> {
  const connect = await pool.query<InvoiceRow>(
    `${baseQuery} ORDER BY invoices.created_at DESC;`
  );
  return toInvoices(connect.rows);
}

export async function findInvoicesById(id: number): Promise<Invoice | undefined> {
  const connect = await pool.query<InvoiceRow>(
    `${baseQuery} WHERE invoices.id = $1;`,
    [id]
  );
  if (!connect.rows.length) return undefined;

  return toInvoice(connect.rows[0]);
}

// Corrigido o nome: findRecentInvoices (sem a letra 'e' extra)
export async function findRecentInvoices(): Promise<Invoice[]> {
  const connect = await pool.query<InvoiceRow>(
    `${baseQuery} ORDER BY invoices.created_at DESC LIMIT 5;`
  );
  return toInvoices(connect.rows);
}

export async function findOverdueInvoices(): Promise<Invoice[]> {
  const connect = await pool.query<InvoiceRow>(
    `${baseQuery} 
     WHERE invoices.status = 'pending' AND invoices.due_date < CURRENT_DATE
     ORDER BY invoices.issue_date 
     LIMIT 5;`
  );
  return toInvoices(connect.rows);
}

export async function insertInvoice(data: CreateInvoicePayload): Promise<Invoice | undefined> {
  const result = await pool.query<{ id: number }>(
    `INSERT INTO invoices (customer_id, amount, status, issue_date, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id;`,
    [data.customerId, data.amount, data.status, data.issueDate, data.dueDate]
  );

  if (!result.rows.length) return undefined;
  return findInvoicesById(result.rows[0].id);
}

export async function modifyInvoice(id: number, data: UpdateInvoicePayload): Promise<Invoice | undefined> {
  const result = await pool.query<{ id: number }>(
    `UPDATE invoices
     SET customer_id = COALESCE($1, customer_id),
         amount = COALESCE($2, amount),
         status = COALESCE($3, status),
         issue_date = COALESCE($4, issue_date),
         due_date = COALESCE($5, due_date)
     WHERE id = $6
     RETURNING id;`,
    [data.customerId, data.amount, data.status, data.issueDate, data.dueDate, id]
  );

  if (!result.rows.length) return undefined;
  return findInvoicesById(id);
}

export async function removeInvoice(id: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM invoices WHERE id = $1;`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}