import { useState, useEffect } from 'react';
import InvoiceForm from './InvoiceForm.tsx';
import { Invoice, InvoiceInput } from './invoiceType.ts';
import InvoiceTable from './InvoiceTable.tsx';
import { createInvoice, getAllInvoice } from './invoiceApi.ts';
import { CustomersOptions } from './costumerType.ts';

export default function InvoicePage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [customersOptions, setCustomersOptions] = useState<CustomersOptions[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState <string | null> (null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getInvoices() {
            try {
                const datas = await getAllInvoice();
                setInvoices(datas);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
            }

            setLoading(false);
        }

        getInvoices();
    }, []);

    useEffect(() => {
    async function getCustomersOptions() {
        try {
            const response = await fetch('/api/customers/options');

            if (!response.ok) {
                console.error(`Erro ${response.status} ao carregar clientes.`);
                return;
            }

            const datas = await response.json();
            setCustomersOptions(datas);
        } catch (error) {
            console.error('Falha na requisição de clientes:', error);
        }
    }

    getCustomersOptions();
}, []);

    async function refresh() {
        try {
            const datas = await getAllInvoice();
            setInvoices(datas);
        } catch (error) {
            if(error instanceof Error ) throw error;
        }
    }

    async function submit(datas: InvoiceInput) { 
        setBusy(true);
        setFormError(null);

        try{
            await createInvoice(datas);
            await refresh();
        } catch(error){
            if( error instanceof Error) setFormError(error.message);
        }
        setBusy(false)
    }

    if (loading) return <p>Carregando faturas...</p>;

    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Faturas</h1>
            <div className='panel'>
            <InvoiceTable invoices={invoices} />
            </div>
            <InvoiceForm  
            invoice={null} 
            customers={customersOptions}
            error={formError}
            onDelete={() => null}
            onCancel={() => null}
            onSubmit={submit}
            busy={busy}/>
        </>
    );
}