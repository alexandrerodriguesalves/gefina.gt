import InvoiceRow from "./InvoiceRow";
import { Invoice } from "./invoiceType";

interface InvoiceTableProps {
    invoice: Invoice[];
}

export default function Invoicetable(props: InvoiceTableProps) {
 const invoice = props.invoice
    return <table>
        <thead>
            <tr>
                <td>Cliente</td>
                <td>Valor</td>
                <td>Data de emissão</td>
                <td>Data de vencimento</td>
                <td>Situação</td>
            </tr>
        </thead>
        <tbody>
            {invoice.map(invoice=>(
                <InvoiceRow key={invoice.id}invoice={invoice}/>
            ))}
        </tbody>
    </table>
}