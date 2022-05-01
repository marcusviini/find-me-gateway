import { Router } from 'express'

import { adapRoute } from '../../adapter/express.adapter'
import { SvCheckPort } from '../../../data'
import { CheckPortController } from '../../../presentation/controllers'
import { CheckPortAdapter } from '../../../infra/adapter'
import { checkPortValidator } from '../../../infra/validators'

const routes = Router()

const checkPortController = () => {
    const svCheckPort = new SvCheckPort({
        checkPortService: new CheckPortAdapter(),
    })
    return new CheckPortController({ svCheckPort })
}

routes.post('/check-port', checkPortValidator, adapRoute(checkPortController()))

export default routes
