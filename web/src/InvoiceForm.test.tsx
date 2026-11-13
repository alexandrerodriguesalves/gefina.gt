import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InvoiceForm from './InvoiceForm';

describe('InvoiceForm', () => {
    it('apresenta os campos com rotulos associados', () => {
        render(
            <InvoiceForm
                invoice={null}
                customers={[
                    {
                        id: 1,
                        name: 'Cliente de teste',
                        email: 'cliente@teste.com.br',
                    },
                ]}
                error={null}
                fieldErrors={{}}
                onDelete={() => undefined}
                confirmDelete={false}
                setConfirmDelete={() => undefined}
                confirm={() => undefined}
                onCancel={() => { }}
                onSubmit={() => { }}
                busy={false}
            />
        );

        expect(screen.getByLabelText('Cliente')).toBeDefined();
        expect(screen.getByLabelText('Valor')).toBeDefined();
        expect(screen.getByLabelText('Situação')).toBeDefined();
        expect(screen.getByLabelText('Emissão')).toBeDefined();
        expect(screen.getByLabelText('Vencimento')).toBeDefined();
    });

    it('entrega os valores convertidos no envio', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(
            <InvoiceForm
                invoice={null}
                customers={[
                    {
                        id: 1,
                        name: 'Cliente de teste',
                        email: 'cliente@teste.com.br',
                    },
                ]}
                error={null}
                fieldErrors={{}}
                onDelete={() => undefined}
                confirmDelete={false}
                setConfirmDelete={() => undefined}
                confirm={() => undefined}
                onCancel={() => { }}
                onSubmit={onSubmit}
                busy={false}
            />
        );

        await user.selectOptions(screen.getByLabelText('Cliente'), '1');
        await user.type(screen.getByLabelText('Valor'), '1250.37');
        await user.selectOptions(screen.getByLabelText('Situação'), 'pending');
        await user.type(screen.getByLabelText('Emissão'), '2026-11-01');
        await user.type(screen.getByLabelText('Vencimento'), '2026-11-30');
        await user.click(screen.getByRole('button', { name: 'Salvar' }));

        expect(onSubmit).toHaveBeenLastCalledWith({
            customerId: 1,
            amount: 125037,
            status: 'pending',
            issueDate: '2026-11-01',
            dueDate: '2026-11-30',
        });
    });
});
