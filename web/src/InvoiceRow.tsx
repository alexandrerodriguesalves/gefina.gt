import { Invoice } from './invoiceType';
import statusLabel from './statusLabel';

interface InvoiceRowProps {
    invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
    const invoice = props.invoice
    return (
        <tr>
            <td>{invoice.customer.name}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.issueDate}</td>
            <td>{invoice.dueDate}</td>
            <td>{statusLabel(invoice.status)}</td>
        </tr>
    );
}