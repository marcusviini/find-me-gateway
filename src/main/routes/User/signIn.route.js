import { Router } from 'express'

import { adapRoute } from '../../adapter/express.adapter'
import { SignIn } from '../../../data'
import { SignInController } from '../../../presentation/controllers'
import { UserService } from '../../../presentation/service/User.service'
import { signInValidator } from '../../../infra/validators'

const routes = Router()

const signInController = () => {
    const svSignIn = new SignIn({
        userService: UserService,
    })
    return new SignInController({ svSignIn })
}

routes.post('/signIn', signInValidator, adapRoute(signInController()))

export default routes
