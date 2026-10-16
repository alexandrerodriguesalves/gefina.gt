import {Pool} from 'pg';

if (!process.env.DATABASE_URL) throw new Error
 ('A variável DATABASSS_URL não está disponivel');


const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export default pool;
