import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import tracer from 'dd-trace'
import responseTime from 'response-time'
import client from 'prom-client'
import { exposeRoutes } from './routes'

const app = express()

const register = new client.Registry()

register.setDefaultLabels({
    app: 'find-me-gateway',
})

client.collectDefaultMetrics({ register })

const httpRequestDurationMicroseconds = new client.Summary({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
    percentiles: [1],
})

const httpRequestDurationMicrosecondsHistogram = new client.Histogram({
    name: 'http_request_duration_seconds_histogram',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
})

register.registerMetric(httpRequestDurationMicroseconds)
register.registerMetric(httpRequestDurationMicrosecondsHistogram)

app.get('/metrics', async (req, res) => {
    const remoteIp =
        (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    console.log(remoteIp)
    res.setHeader('Content-Type', register.contentType)
    res.send(await register.metrics())
})

app.use(json())
app.use(helmet())
app.use(cors())

app.use(
    responseTime((req, res, time) => {
        if (req.path !== '/metrics') {
            httpRequestDurationMicroseconds
                .labels(req.method, req.path, res.statusCode)
                .observe(time)

            httpRequestDurationMicrosecondsHistogram
                .labels(req.method, req.path, res.statusCode)
                .observe(time)
        }
    })
)

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 500,
    message: {
        status: 429,
        message:
            'Você fez muitas requisições em um curto período de tempo. Aguarde 5 minutos e tente novamente.',
    },
})

app.use(limiter)

app.use(exposeRoutes)

tracer.init()

export default app
