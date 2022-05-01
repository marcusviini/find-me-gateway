export class SignIn {
    constructor({ userService }) {
        this.userService = userService
    }

    async execute(request) {
        const { email, password } = request

        const signIn = await this.userService.signIn({ email, password })

        if (signIn.error) {
            return {
                error: signIn.error,
            }
        }

        return {
            message: signIn.message,
            nome: signIn.nome,
            avatar: signIn.avatar,
            token: signIn.token,
        }
    }
}
