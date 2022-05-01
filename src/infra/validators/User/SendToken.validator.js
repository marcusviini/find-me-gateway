import * as Yup from 'yup'

export const sendTokenValidator = async (req, res, next) => {
    try {
        const Schema = Yup.object().shape({
            email: Yup.string()
                .email('O email informado não é válido')
                .required('Por favor informe um email'),
        })

        await Schema.validate(req.headers, { abortEarly: false })

        return next()
    } catch (e) {
        return res.status(400).json({
            error: 'Erro na validação',
            messages: e.errors,
        })
    }
}
