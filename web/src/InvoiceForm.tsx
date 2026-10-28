import { useState } from 'react';
import { Customer } from './costumerType.ts'; 
import { Invoice, InvoiceInput, InvoiceStatus } from './invoiceType.ts';

interface InvoiceProps {
    invoice: Invoice | null;
    customers: Customer[];
    error: string | null;
    onDelete: () => void;
    onCancel: () => void;
    onSubmit: (values: InvoiceInput) => void;
    busy: boolean;
}

export default function InvoiceForm(props: InvoiceProps) {
    const [customerId, setCustomerId] = useState(!props.invoice ? '' : props.invoice.customer.id);
    const [amount, seAmount] = useState(!props.invoice ? '' : props.invoice.amount / 100);
    const [status, setStatus] = useState<InvoiceStatus>(!props.invoice ? 'PENDING' as InvoiceStatus : props.invoice.status);
    const [issueDate, setIssueDate] = useState(!props.invoice ? '' : props.invoice.issueDate);
    const [dueDate, setDueDate] = useState(!props.invoice ? '' : props.invoice.dueDate);

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault;

        props.onSubmit({
            customerId:Number(customerId),
            amount: Math.round(Number(amount) * 100),
            status,
            issueDate,
            dueDate
        });
    }

    return <form>
        <div>
            <label htmlFor='customer'>Cliente</label>
            <select id='customer'></select>            
        </div>
        <div>
            <label htmlFor='amount'>Valor</label>
            <input id='amount' type='number' step='0.01' min='0.01' required />
        </div>
        <div>
            <label htmlFor='status'>Situação</label>
            <select id='status'>
                <option>Pendente</option>
                <option>Paga</option>
            </select>
        </div>
        <div>
            <label htmlFor='issuDate'>Emissão</label>
            <input id='issudate' type='date' required />
        </div>
        <div>
            <label htmlFor='dueDate'>Vencimento</label>
            <input id='duedate' type='date' required />
        </div>
        <div>
            <button type='button'>Excluir</button>
            <button type='button'>Cancelar</button>
            <button type='submit'>Salvar</button>
        </div>
    </form>;
}