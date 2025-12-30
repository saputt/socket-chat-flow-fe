import React, { useState } from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { loginAPI } from '../../services/AuthService'

const LoginForm = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { setLogin } = useAuthStore.getState()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await loginAPI({
                "email" : email, 
                "password" : password
            })

            setLogin(result.data.user, result.accessToken)

            navigate("/")
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-5'>
        <FormField
            label="Email"
            placeholder="Masukkan email"
            onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
            label="Password"
            placeholder="Masukkan email"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button>
            {loading ? 'loading...' : 'login'}
        </Button>
        <p>
            Dont have an account 
            <Link
                to={'/register'}
                className='text-green-800'
            >
                , register here
            </Link>
        </p>
    </form>
  )
}

export default LoginForm