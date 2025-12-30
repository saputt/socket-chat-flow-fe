import React from 'react'
import AuthLayout from '../components/templates/AuthLayout'
import RegisterForm from '../components/organism/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthLayout 
        name="Register"
    >
        <RegisterForm/>
    </AuthLayout>
  )
}

export default RegisterPage