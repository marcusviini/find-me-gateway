import { Router } from 'express'

import { adapRoute } from '../../adapter/express.adapter'
import { SignUp } from '../../../data'
import { SignUpController } from '../../../presentation/controllers'
import { UserService } from '../../../presentation/service/User.service'
import { signUpValidator } from '../../../infra/validators'

const routes = Router()

const signUpController = () => {
    const svSignUp = new SignUp({
        userService: UserService,
    })
    return new SignUpController({ svSignUp })
}

routes.post('/signUp', signUpValidator, adapRoute(signUpController()))

export default routes
