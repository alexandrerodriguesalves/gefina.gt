import pool from "./database.ts";

interface CustomersOption {
  id: number;
  name: string;
  email: string;
}

export async function findCustomersOptions(): Promise<CustomersOption[]> {
  const query = `
    SELECT id, name, email 
    FROM customers 
    ORDER BY name
  `; 
  
  const result = await pool.query(query);
  return result.rows;
}