import './auth.scss'
import SignIn from './signIn'
import SignUp from './signUp'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import $api from '../../../api';
function Auth() {
    const [hash, setHash] = useState(window.location.hash || '#sign-in');
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    async function handleLogin(email, password) {
        const credentials = {
            email: email,
            password: password
        };
        // const { data } = await $api.post('auth/login', credentials)
        localStorage.setItem('token', data.accessToken);
        navigate('/')
    }

    function handleRegister(name, surname, email, password, confirmation) {
        if (name !== '' && password !== '' && surname !== '' && email !== '' && confirmation == password) {

            const user = { name: name, surname: surname, email: email, password: password, confirmation: confirmation }

            // $api.post('auth/register', user)
            navigate('/auth#sign-in')
        }

    }
    function handleHashChange() {
        setHash(window.location.hash);
    }
    useEffect(() => {
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    useEffect(() => { window.location.hash = 'sign-in' }, [])
    return (
        <div className="auth-container">
            {
                hash === '#sign-in'
                    ? <SignIn onSignIn={handleLogin} error={error} errorMessage={errorMessage} />
                    : hash === '#sign-up'
                        ? <SignUp onSignUp={handleRegister} error={error} errorMessage={errorMessage} />
                        : null
            }
        </div>
    )
}

export default Auth