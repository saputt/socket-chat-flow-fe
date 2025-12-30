import React from 'react'
import AuthLayout from '../components/templates/AuthLayout'
import LoginForm from '../components/organism/LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout
      name="Login"
    >
      <LoginForm/>
    </AuthLayout>
  )
}

export default LoginPage