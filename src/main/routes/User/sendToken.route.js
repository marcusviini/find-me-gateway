import { Router } from 'express'

import { adapRoute } from '../../adapter/express.adapter'
import { SendToken } from '../../../data'
import { SendTokenController } from '../../../presentation/controllers'
import { UserService } from '../../../presentation/service/User.service'
import { sendTokenValidator } from '../../../infra/validators'

const routes = Router()

const sendTokenController = () => {
    const svSendToken = new SendToken({
        userService: UserService,
    })
    return new SendTokenController({ svSendToken })
}

routes.get('/token', sendTokenValidator, adapRoute(sendTokenController()))

export default routes
