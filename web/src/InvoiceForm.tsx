import { FormEvent, useState } from 'react';
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
    const [amount, seAmount] = useState(!props.invoice ? '' : (props.invoice.amount / 100).toFixed(2));
    const [status, setStatus] = useState<InvoiceStatus>(!props.invoice ? 'PENDING' as InvoiceStatus : props.invoice.status);
    const [issueDate, setIssueDate] = useState(!props.invoice ? '' : props.invoice.issueDate);
    const [dueDate, setDueDate] = useState(!props.invoice ? '' : props.invoice.dueDate);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        props.onSubmit({
            customerId: Number(customerId),
            amount: Math.round(Number(amount) * 100),
            status,
            issueDate,
            dueDate
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{!props.invoice ? 'Nova fatura' : 'Atualizar fatura'}</h2>

            <div>
                <label htmlFor='customer'>Cliente</label>
                <select 
                    id='customer' 
                    value={customerId} 
                    onChange={(event) => setCustomerId(event.target.value)} 
                    required
                >
                    <option value=''>Selecione um cliente</option>
                    {props.customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name} - {customer.email}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='amount'>Valor</label>
                <input 
                    id='amount' 
                    type='number' 
                    step='0.01' 
                    min='0.01'
                    value={amount} 
                    onChange={(event) => seAmount(event.target.value)}
                    required 
                />
            </div>

            <div>
                <label htmlFor='status'>Situação</label>
                <select id='status' value={status} onChange={(event) => setStatus(event.target.value as InvoiceStatus)}>
                    <option value='PENDING'>Pendente</option>
                    <option value='PAID'>Paga</option>
                </select>
            </div>

            <div>
                <label htmlFor='issueDate'>Emissão</label>
                <input id='issueDate' type='date' value={issueDate} onChange={(event) => setIssueDate(event.target.value)} required />
            </div>

            <div>
                <label htmlFor='dueDate'>Vencimento</label>
                <input id='dueDate' type='date' value={dueDate} onChange={(event) => setDueDate(event.target.value)} required />
            </div>

            {props.error && <p className="error">{props.error}</p>}

            <div>
                {/* Botão de Excluir sempre renderizado */}
                <button type='button' onClick={props.onDelete} disabled={props.busy}>
                    Excluir
                </button>
                <button type='button' onClick={props.onCancel} disabled={props.busy}>
                    Cancelar
                </button>
                <button type='submit' disabled={props.busy}>
                    {props.busy ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
}