import type { Invoice } from "./invoiceType.ts";

export interface DashboardTotals {
paid: number;
    pending: number;
    invoiceCount: number;
    costumerCount: number;
}

export interface Dashboard{
    totals: DashboardTotals;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
}