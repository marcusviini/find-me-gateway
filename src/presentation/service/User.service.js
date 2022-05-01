import 'dotenv/config'
import load from '../../main/pb/loader'

export const UserService = load({
    serviceName: 'userService',
    address: process.env.GRPC_USER,
    fileName: 'user',
})
