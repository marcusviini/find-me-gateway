import jsonwebtoken from 'jsonwebtoken'

import { promisify } from 'util'

require('dotenv').config()

export const authMidlleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token não localizado',

            type: 'error',
        })
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jsonwebtoken.verify)(
            token,

            process.env.TOKEN_SECRET
        )

        req.userId = decoded.id

        return next()
    } catch (err) {
        return res.status(401).json({
            message: 'Token inválido',

            type: 'error',
        })
    }
}
