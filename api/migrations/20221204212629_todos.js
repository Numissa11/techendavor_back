/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { default: knex } = require("knex");

// where we define the structure of our database
// here we create tables
exports.up = async knex => {
    await knex.schema.createTable('todos', tbl => {
        tbl.increments();
        tbl.text('message', 256).notNullable()
    })
}



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// here we drop table  (if we drop a db, we have to drop the tables first)
exports.down  = async knex => {
        await knex.schema.dropTableIfExists('todos')
};
