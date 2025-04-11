/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */export async function seed(knex) {
  await knex('products').del();

  await knex('products').insert([
    { id: 1, price: 19.99, name: 'Product A' },
    { id: 2, price: 29.99, name: 'Product B' },
    { id: 3, price: 39.99, name: 'Product C' }
  ]);
}
