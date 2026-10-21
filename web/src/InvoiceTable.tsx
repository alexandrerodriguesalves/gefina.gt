import { Invoice } from './dashboardType.ts';

interface InvoiceTableProps {
    invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Valor</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.dueDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}