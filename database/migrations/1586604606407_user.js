'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })

    //novos campos adicionados
    this.alter('users', (table) => {
      table.string('nickname', 80).notNullable().after('username')
      table.string('genre', 5).after('nickname')
      table.string('telephone', 20).after('email')
      table.boolean('status').defaultTo(true)
        .comment('active=1/inactive=0')
        .after('password')
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
