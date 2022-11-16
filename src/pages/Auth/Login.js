import { Flex } from '@chakra-ui/react'
import React from 'react'
import LoginForm from '../../components/forms/LoginForm'

const Login = () => {
  return (
    <>
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <LoginForm />
      </Flex>
    </>
  )
}

export default Login
