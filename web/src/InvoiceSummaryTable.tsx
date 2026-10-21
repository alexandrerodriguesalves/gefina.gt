import { Invoice } from "./dashboardType.ts";

import {fomartCurrency, formatdate} from './utils.ts'

interface InvoiceSummaryTableProps{
    title: string;
    dateLabel: string;
    invoices: Invoice[];
    date: (invoice: Invoice) => string;
}

export default function InvoiceSummaryTable(props: InvoiceSummaryTableProps){
    return <div>
        <h2>{props.title}</h2>
        <table>
            <thead><tr>
                <th>Cliente</th>
                <th>Valor</th>
                </tr>{props.dateLabel}</thead>
            <tbody>
                    {props.invoices.map((invoice) =>{
                    return <tr>
                        <td>{invoice.customer.name}</td>
                        <td className="numeric">{fomartCurrency(invoice.amount)}</td>
                        <td className="numeric">{formatdate(props.date(invoice))}</td>
                    </tr>;
                })}
            </tbody>
        </table>
    </div>
}