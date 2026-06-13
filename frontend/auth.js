const API =
'https://sistema-monitoramento-4sts.onrender.com'

async function fazerLogin() {

    const email =
        document.getElementById('email').value

    const senha =
        document.getElementById('senha').value

    try {

        const response =
            await fetch(
                `${API}/login`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        email,
                        senha
                    })
                }
            )

        const dados =
            await response.json()

        if (!response.ok) {

            throw new Error()

        }

        localStorage.setItem(
            'usuario',
            JSON.stringify(
                dados.usuario
            )
        )

        localStorage.setItem(
            'token',
            dados.token
        )

        window.location.href =
            'index.html'

    }

    catch {

        document.getElementById(
            'erro'
        ).innerHTML =
            'Email ou senha inválidos'

    }

}