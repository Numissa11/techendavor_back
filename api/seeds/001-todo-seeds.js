/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
          message: 'walk the doge'
        },
        {
          message: 'update address'
        },
        {
          message: 'wash clothe'
        },
        {
          message: 'call your mom'
        }
      ]);
    });
};