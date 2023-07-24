import React from 'react'
import LoginForm from '../components/LoginForm'

export default function LoginPage({ setIsAuthenticated }) {
  return <LoginForm setIsAuthenticated={setIsAuthenticated} />
}
