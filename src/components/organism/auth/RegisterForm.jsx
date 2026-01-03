import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../../../services/AuthService'
import FormField from '../../molecules/FormField'
import Button from '../../atoms/Button'

const RegisterForm = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await registerAPI({name, email, password})
            navigate('/login')
        } catch (error) {
            console.log(error.message || "error")
        } finally {
            setLoading(false)
        }
    }

  return (
    <form onSubmit={handleRegister} className='flex flex-col gap-5'>
        <FormField
            label="Username"
            placeholder="Masukkan username"
            onChange={e => setName(e.target.value)} 
        />
        <FormField
            label="Email"
            placeholder="Masukkan email"
            onChange={e => setEmail(e.target.value)} 
        />
        <FormField
            label="Password"
            placeholder="Masukkan email"
            type="password"
            onChange={e => setPassword(e.target.value)} 
        />
        <Button>
            {loading ? 'loading...' : 'register'}
        </Button>
        <p>
            Have an account 
            <Link
                to={'/login'}
                className='text-green-800'
            >
                , login here
            </Link>
        </p>
    </form>
  )
}

export default RegisterForm