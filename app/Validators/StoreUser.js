'use strict'

class StoreUser {
  get rules() {
    return {
      // validation rules
      username: 'required',
      nickname: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages() {
    return {
      'nickname.required': 'Você deve fornecer seu nome de usuário.',
      'username.required': 'Você deve fornecer seu nome.',
      'email.required': 'Você deve fornecer um endereço de email.',
      'email.email': 'Você deve fornecer um endereço de email válido.',
      'email.unique': 'Este e-mail já está registrado.',
      'password.required': 'Você deve fornecer uma senha',
      'password.confirmed': 'Os campos Senha / Confirmar senha não coincidem.'
    }
  }

  get validateAll() {
    return false
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    }
  }

  // get data () {
  //   const requestBody = this.ctx.request.all()
  //   const sessionId = this.ctx.request.header('X-Session-Id')

  //   return Object.assign({}, requestBody, { sessionId })
  // }
  
  // async fails (errorMessages) {
  //   return this.ctx.response.send(errorMessages)
  // }

}

module.exports = StoreUser
