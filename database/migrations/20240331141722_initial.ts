import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("users", (table) => {
      table
        .uuid("id", { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("email", 50).notNullable().unique();
      table.string("display_name", 30).notNullable();
      table.string("password_hash", 100).notNullable();
      table.string("description", 80);
      table.string("image_url");
      table.boolean("active").defaultTo(false).notNullable();
      table
        .enum("role", ["basic", "moderator", "admin"])
        .defaultTo("basic")
        .notNullable();
      table.boolean("profile_complete").defaultTo(false).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(null);
    })
    .createTable("scans", (table) => {
      table
        .uuid("id", { primaryKey: true })
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("image_url").notNullable();
      table.string("disease_class").notNullable();
      table.string("confidence_level");
      table
        .uuid("user_id")
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(null);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('auth')
}
