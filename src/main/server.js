import http from 'http'
import app from './app'

const server = http.Server(app)

server.listen(process.env.PORT, () => {
    console.info(`PORT = ${process.env.PORT}`)
    console.info(`USER SERVICE = ${process.env.GRPC_USER}`)
    console.info(`CUSTOMER SERVICE = ${process.env.GRPC_CUSTOMER}`)
    console.info(`OS SERVICE = ${process.env.GRPC_OS}`)
})

export default server
