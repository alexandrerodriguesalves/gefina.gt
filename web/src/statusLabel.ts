import { InvoiceStatus } from './invoiceType.js';
export default function statusLabel(status: InvoiceStatus) {
    return status === 'paid' ? 'Pago' : 'Pendente';
}