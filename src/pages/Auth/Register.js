import { Flex } from '@chakra-ui/react'
import React from 'react'
import RegisterForm from '../../components/forms/RegisterForm'

const Register = () => {
  return (
    <>
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <RegisterForm />
      </Flex>
    </>
  )
}

export default Register
