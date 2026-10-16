export type InvoicesSituation = 'paid' | 'overdue' | 'pending'; // (ou os valores que você usa)

export interface Invoice {
    id: string;
    customer: {
        name: string;
    };
    amount: number;
    issueDate: string;
    dueDate: string;
    situation: InvoicesSituation;}