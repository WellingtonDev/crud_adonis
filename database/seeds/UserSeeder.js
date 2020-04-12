'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run() {
    const user = await User.create({
      username: 'Administrador',
      nickname: 'admin',
      email: 'admin@admin.com.br',
      password: '12345678',
      status: true
    })
    await user;
  }
}

module.exports = UserSeeder
