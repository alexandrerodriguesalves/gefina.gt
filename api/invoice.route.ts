import { Router } from 'express';
import { findAllInvoices,
  findInvoicesById,
  insertInvoice, 
  modifyInvoice,
  removeInvoice } from './invoice.service.ts';

const router = Router();

function parseId(value: string): number | undefined {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) return undefined;

  return id;
} 

router.get('/', async (_request, response) => {
  const invoices = await findAllInvoices();

  response.status(200).json(invoices);
});

router.get('/:id', async (request, response) => {
  const id = parseId(request.params.id);

  if (!id) {
    return response.status(400).json({ error: {
      status: 400,
      message: 'Identificador inválido.'
    }});
  }

  const invoice = await findInvoicesById(id);

  if (!invoice) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  response.status(200).json(invoice);
});

router.post('/', async (request, response) => {
  const invoice = await insertInvoice(request.body);

  if (!invoice) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  response.status(201).json(invoice);
});

router.put('/:id', async (request, response) => {
  const id = parseId(request.params.id);

  if (!id) {
    return response.status(400).json({ error: {
      status: 400,
      message: 'Identificador inválido.'
    }});
  }

  const invoice = await modifyInvoice(
    id,
    request.body
  );

  if (!invoice) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  response.status(200).json(invoice);
});

router.delete('/:id', async (request, response) => {
  const id = parseId(request.params.id);

  if (!id) {
    return response.status(400).json({ error: {
      status: 400,
      message: 'Identificador inválido.'
    }});
  }

  const deleted = await removeInvoice(id);

  if (!deleted) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  response.status(204).end();
});

export default router;