export class ResetPassword {
    constructor({ userService }) {
        this.userService = userService
    }

    async execute(request) {
        const { email, token, password } = request

        const ResetPassword = await this.userService.resetPassword({
            email,
            token,
            password,
        })

        if (ResetPassword.error) {
            return {
                error: ResetPassword.error,
            }
        }

        return {
            message: ResetPassword.message,
        }
    }
}
