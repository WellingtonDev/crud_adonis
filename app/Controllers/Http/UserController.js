'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use('Validator')
const Logger = use('Logger')
const Database = use('Database')
const StoreUser = use('App/Validators/StoreUser')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let users = await Database
      .table('users')
      .orderBy('id', 'desc')
    //: users.toJSON()
    return view.render('users.list', { users })
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render('users.new')
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, session, response }) {
    const userValidator = new StoreUser()

    const validation = await validateAll(
      request.all(),
      userValidator.rules,
      userValidator.messages
    )

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    //remove filds csrf and password confirmation
    const userData = request.except(['_csrf', 'password_confirmation'])
    await User.create(userData)
    //success
    session.flash({ notification: 'Usuário Salvo' })
    response.redirect('dashboard/users')
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return view.render('users.new')
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    let user = await User.findBy({ id: params.id })
    //Logger.info(user)
    return view.render('users.edit', { user })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, session, response }) {

    const userValidator = new StoreUser()

    //override validation rules
    const rules = {
      username: 'required',
      nickname: 'required',
      email: 'required|email',
      password: 'confirmed'
    }

    const validation = await validateAll(
      request.post(),
      rules,
      userValidator.messages
    )

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }

    const user = await User.findOrFail(params.id)
    const userData = request.except(['_csrf', '_method', 'password_confirmation'])
    userData.password ? user.password = userData.password : delete userData.password
    user.merge(userData)
    const saved = await user.save()
    session.flash({ notification: 'Usuário Atualizado!' })
    response.redirect('/dashboard/users')
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = UserController
