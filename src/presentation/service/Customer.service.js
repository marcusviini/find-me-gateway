import 'dotenv/config'
import load from '../../main/pb/loader'

export const CustomerService = load({
    serviceName: 'customerService',
    address: process.env.GRPC_CUSTOMER,
    fileName: 'customer',
})
