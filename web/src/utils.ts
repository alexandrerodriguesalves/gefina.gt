import { InvoicesSituation} from './invoiceType';
export function situationLabel(situation: InvoicesSituation) {
    return situation === 'paid' ? 'Paga' : situation === 'overdue' ? 'Atrasada': 'Pendente'
}
export function fomartCurrency(cents: number):string {
    const formatt= new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL'});

    return formatt.format(cents / 100);
}

export function formatdate(isoDate: string ):string {
    const formatter= new Intl.DateTimeFormat('pt-Br',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return formatter.format(new Date(`${isoDate}T00:00:00`));
}