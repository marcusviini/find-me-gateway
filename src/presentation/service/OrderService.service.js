import 'dotenv/config'
import load from '../../main/pb/loader'

export const OrderService = load({
    serviceName: 'orderServiceService',
    address: process.env.GRPC_OS,
    fileName: 'orderService',
})
