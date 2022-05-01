export class SignUp {
    constructor({ userService }) {
        this.userService = userService
    }

    async execute(request) {
        const { nome, email, password } = request

        const signUp = await this.userService.signUp({ nome, email, password })

        if (signUp.error) {
            return {
                error: signUp.error,
            }
        }

        return {
            message: signUp.message,
        }
    }
}
