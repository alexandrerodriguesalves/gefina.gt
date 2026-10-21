import { Invoice } from './invoiceType';
import { situationLabel, formatdate, fomartCurrency } from './utils';

interface InvoiceRowProps {
    invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
    const invoice = props.invoice;
    return (
        <tr>
            <td>{invoice.customer.name}</td>
            <td>{fomartCurrency(invoice.amount)}</td>
            <td>{formatdate(invoice.issueDate)}</td> 
            <td>{formatdate(invoice.dueDate)}</td>
            <td>{situationLabel(invoice.situation)}</td>
        </tr>
    );
}