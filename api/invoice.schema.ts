import { z, type ZodError } from 'zod';

const invoiceStatusSchema = z.enum(
    [
        'paid',
        'pending'
    ],
    {
        message: 'A situação informada é inválida. Os valores permitidos são "Paga" e "Pendente".'
    }
);
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

export const invoiceSchema = z
    .object(
        {
            customerId: z
                .number({ message: 'O cliente é obrigatório.' })
                .int('O identificador do cliente deve ser um número inteiro.')
                .positive('O cliente é obrigatório.'),
            amount: z
                .number({ message: 'O valor é obrigatório.' })
                .int('O valor da fatura deve ser um número inteiro.')
                .positive('O valor da fatura deve ser maior que zero.'),
            status: invoiceStatusSchema,
            issueDate: z.iso.date({ message: 'A data de emissão deve ser uma data válida.' }),
            dueDate: z.iso.date({ message: 'A data de vencimento deve ser uma data válida.' })
        }
    )
    .refine(
        (datas) => new Date(datas.dueDate).getTime() >= new Date(datas.issueDate).getTime(),
        {
            message: 'A data de vencimento não pode ser menor que a data de emissão.',
            path: ['dueDate']
        }
    );

export type InvoiceInput = z.infer<typeof invoiceSchema>;

interface InvoiceFieldErrors {
    customerId?: string;
    amount?: string;
    status?: string;
    issueDate?: string;
    dueDate?: string;
}

function firstError(message: string[] | undefined): string | undefined {
    return !message ? undefined : message[0];
}

export function tofieldErrors(error: ZodError<InvoiceInput>): InvoiceFieldErrors {
    const { fieldErrors } = z.flattenError(error);

    return {
        customerId: firstError(fieldErrors.customerId),
        amount: firstError(fieldErrors.amount),
        status: firstError(fieldErrors.status),
        issueDate: firstError(fieldErrors.issueDate),
        dueDate: firstError(fieldErrors.dueDate),
    };
}