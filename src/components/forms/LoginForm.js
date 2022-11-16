import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { useLoginUser } from '../../hooks/AuthHooks'

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: yup.object({
      username: yup
        .string()
        .required('Username is required')
        .min(4, 'Username must be atleast 4 characters long'),

      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be atleast 6 characters long'),
    }),

    onSubmit: (values) => {
      loginQuery.mutate(values)
    },
  })

  const toast = useToast()

  const onSuccess = (data) => {
    localStorage.setItem('token', data?.data?.token)
    localStorage.setItem('role', data?.data?.role)
    if (data?.data?.role === 'ROLE_ADMIN')
      window.location.href = 'http://localhost:3000/admin/dashboard'
    else if (data?.data?.role === 'ROLE_STUDENT')
      window.location.href = 'http://localhost:3000/'
    return data
  }

  const onError = (errors) => {
    toast({
      position: 'top',
      variant: 'left-accent',
      title: 'Bad Credentials',
      description: 'Please check your username and password',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })

    return errors
  }

  const loginQuery = useLoginUser(onSuccess, onError)

  return (
    <Box w="320px">
      <Text fontSize="4xl" fontWeight="bold" textAlign="center">
        Login to your Account
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl mt={8}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            name="username"
            {...formik.getFieldProps('username')}
          />
          <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
            {formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ''}
          </FormHelperText>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            name="password"
            {...formik.getFieldProps('password')}
          />
          <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''}
          </FormHelperText>
        </FormControl>

        <Center mt={8}>
          <Button type="submit" colorScheme="blue" size="lg" w="full">
            Login
          </Button>
        </Center>
      </form>
    </Box>
  )
}

export default LoginForm
