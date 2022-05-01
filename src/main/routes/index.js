import { Router } from 'express'

// USER ROUTES
import SignUp from './User/signUp.route'
import SignIn from './User/signIn.route'
import SendToken from './User/sendToken.route'
import ResetPassword from './User/resetPassword.route'

const routes = [SignUp, SignIn, SendToken, ResetPassword]

const router = Router()

export const exposeRoutes = routes.map((routerMap) =>
    router.use('/', routerMap)
)
