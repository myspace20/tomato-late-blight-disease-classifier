import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('scans',(table)=>{
    table.dropColumn('image_url')
    table.dropColumn('confidence_level')
    table.dropColumn('disease_class')
  })
  await knex.schema.alterTable('scans',(table)=>{
    table.string('image_url',500)
    table.float('confidence_level',10)
    table.string('disease_class',50)
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('scans')
}

