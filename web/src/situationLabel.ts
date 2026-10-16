import { InvoicesSituation} from './invoiceType';
export default function situationLabel(situation: InvoicesSituation) {
    return situation === 'paid' ? 'Paga' : situation === 'overdue' ? 'Atrasada': 'Pendente'
}