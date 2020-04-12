'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('login', ({ view }) => {
    return view.render('login')
})

Route.get('dashboard', ({ view }) => {
    return view.render('dashboard')
})

// Route.resource('users', 'UsersController')
//     .only(['store', 'update', 'destroy'])

Route.post('users', 'UserController.store').as('users.store')
Route.put('users/:id', 'UserController.update').as('users.update')
Route.delete('users/:id', 'UserController.destroy').as('users.destroy')

Route.group(() => {
    Route.get('users', 'UserController.index').as('users.index')
    Route.get('users/create', 'UserController.create').as('users.create')
    Route.get('users/:id', 'UserController.show').as('users.show')
    Route.get('users/:id/edit', 'UserController.edit').as('users.edit')
}).prefix('dashboard')