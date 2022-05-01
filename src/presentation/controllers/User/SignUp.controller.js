export class SignUpController {
    constructor({ svSignUp }) {
        this.svSignUp = svSignUp
    }

    async handle(httpRequest) {
        try {
            const response = await this.svSignUp.execute(httpRequest.body)

            if (response.error) {
                return {
                    status: 400,
                    data: { error: response.error },
                }
            }

            return {
                status: 200,
                data: response,
            }
        } catch (error) {
            return {
                status: 500,
                data: 'Ocorreu um problema interno, tente novamente ou fale com o suporte',
            }
        }
    }
}
