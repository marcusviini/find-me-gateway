export class SendToken {
    constructor({ userService }) {
        this.userService = userService
    }

    async execute(request) {
        const { email } = request

        const SendToken = await this.userService.sendToken({ email })

        if (SendToken.error) {
            return {
                error: SendToken.error,
            }
        }

        return {
            message: SendToken.message,
        }
    }
}
