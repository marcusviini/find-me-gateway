import { Router } from 'express'

import { adapRoute } from '../../adapter/express.adapter'
import { ResetPassword } from '../../../data'
import { ResetPasswordController } from '../../../presentation/controllers'
import { UserService } from '../../../presentation/service/User.service'
import { resetPasswordValidator } from '../../../infra/validators'

const routes = Router()

const resetPasswordController = () => {
    const svResetPassword = new ResetPassword({
        userService: UserService,
    })
    return new ResetPasswordController({ svResetPassword })
}

routes.put(
    '/resetPassword',
    resetPasswordValidator,
    adapRoute(resetPasswordController())
)

export default routes
