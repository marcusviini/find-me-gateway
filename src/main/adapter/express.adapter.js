export const adapRoute = (controller) => async (req, res) => {
    const httpRequest = {
        body: req.body,
        params: req.params,
        userLogin: req.userLogin,
        userEmail: req.userEmail,
        headers: req.headers,
        file: req.file,
        query: req.query,
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
        res.status(httpResponse.status).json(httpResponse.data)
    } else if (httpResponse.status >= 300 && httpResponse.status <= 499) {
        res.status(httpResponse.status).json({
            error: `${httpResponse.data.error}`,
        })
    } else {
        console.log(httpResponse)
        if (
            (httpResponse.data.details &&
                httpResponse.data.details.match(/TCP/gi)) ||
            (httpResponse.data.error && httpResponse.data.error.match(/TCP/gi))
        ) {
            return res.status(httpResponse.status).json({
                error: `${httpResponse.data.details}`,
            })
        }

        res.status(httpResponse.status).json({
            error: 'Ocorreu um problema interno, por favor tente novamente.',
        })
    }
}
