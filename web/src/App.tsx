import { useState, useEffect } from "react";
import Invoicetable from "./InvoiceTable";
import { Invoice } from "./invoiceType";


export default function App() {
  const [invoices, setInvoice] = useState<Invoice[]>([]);
  const [error, setError] = useState <string | null>(null);

  useEffect(() => {
    async function getInvoices() {
      try {
        const response = await fetch('/api/invoices');
        if (!response.ok)
          setError('Não foi possível carregar faturas');

          const datas = await response.json();
        setInvoice(datas)
      } catch {
       setError('Não foi possível carregar faturas');

      }
    }
    getInvoices();
  }, []);
  if(error) return <p>{error}</p>;

  return <Invoicetable invoice={invoices} />
}