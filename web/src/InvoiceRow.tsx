import { Invoice } from './dashboardType';
import { situationLabel, formatdate, fomartCurrency } from './utils';

interface InvoiceRowProps {
    invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
    const invoice = props.invoice;
    return (
        <tr>
            <td>{invoice.customer.name}</td>
            <td className='numeric'>{fomartCurrency(invoice.amount)}</td>
            <td className='numeric'>{formatdate(invoice.issueDate)}</td> 
            <td className='numeric'>{formatdate(invoice.dueDate)}</td>
            <td>{situationLabel(invoice.situation)}</td>
        </tr>
    );
}