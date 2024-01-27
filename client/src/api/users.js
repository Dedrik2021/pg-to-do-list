const BASE_URL = 'http://localhost:8000/api/user'

const authFunc = async (email, password, setError, setCookie, endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        if (!response.ok) {
            throw Error('Error signup api')
        }

        const data = await response.json()
        if (data.detail) {
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
            window.location.reload()
        }
    } catch(err) {
        console.error('Error signup user api', err);
    }
}

module.exports = {
    authFunc
}