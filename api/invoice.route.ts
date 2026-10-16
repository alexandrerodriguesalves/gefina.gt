import { Router } from 'express';
import { findAllInvoices, findInvoicesById } from './invoice.service.ts';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const invoices = await findAllInvoices();

    response.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const id = Number(request.params.id);

    const invoice = await findInvoicesById(id);

    if (!invoice)  response.status(404).json({error:{
        status: 404,
        message: 'Fatura não encontrada'
    }});

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    response.status(500).json({error: 
     { message: 'Não foi possivel carregar fatura' }});
  } 
}); 

export default router;