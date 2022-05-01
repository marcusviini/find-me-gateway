import * as Yup from 'yup'

export const signUpValidator = async (req, res, next) => {
    try {
        const Schema = Yup.object().shape({
            nome: Yup.string().required('Por favor informe o nome'),
            email: Yup.string()
                .email('O email informado não é válido')
                .required('Por favor informe um email'),
            password: Yup.string()
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    'A senha deve conter no mínimo 6 caracteres, um maiúsculo, um minusculo, um numero e um carácter especial'
                )
                .required('Por favor informe uma senha')
                .min(6, 'A senha deve conter no mínimo 8 caracteres'),
        })

        await Schema.validate(req.body, { abortEarly: false })

        return next()
    } catch (e) {
        return res.status(400).json({
            error: 'Erro na validação',
            messages: e.errors,
        })
    }
}
