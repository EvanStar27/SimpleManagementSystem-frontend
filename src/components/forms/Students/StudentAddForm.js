import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Select,
  FormHelperText,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAddNewStudent } from '../../../hooks/StudentHooks'
import { useQueryClient } from 'react-query'

const StudentAddForm = ({ isOpen, onClose, title }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
    },

    validationSchema: yup.object({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      gender: yup.string().required('Gender is required'),
    }),

    onSubmit: (values) => {
      studentQuery.mutate(values)
    },
  })

  const onSuccess = (data) => {
    queryClient.invalidateQueries('fetch_all_students')
    queryClient.invalidateQueries('fetch_stats')
    queryClient.invalidateQueries('fetch_chart_stats')
    onClose()
    toast({
      position: 'top',
      variant: 'left-accent',
      title: 'Success',
      description: 'New student added successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    formik.resetForm()
    return data
  }

  const studentQuery = useAddNewStudent(onSuccess)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'darkAlpha')}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                name="firstName"
                {...formik.getFieldProps('firstName')}
              />
              <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
                {formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : ''}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                name="lastName"
                {...formik.getFieldProps('lastName')}
              />
              <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
                {formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : ''}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                placeholder="Select Gender"
                {...formik.getFieldProps('gender')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
                {formik.touched.gender && formik.errors.gender
                  ? formik.errors.gender
                  : ''}
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default StudentAddForm
