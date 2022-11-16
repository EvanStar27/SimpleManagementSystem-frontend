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
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDeleteStudent } from '../../../hooks/StudentHooks'
import { useQueryClient } from 'react-query'

const StudentDeleteForm = ({ student, isOpen, onClose, title }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: student,
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
      description: 'Student Deleted Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    return data
  }

  // Query
  const studentQuery = useDeleteStudent(onSuccess)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'darkAlpha')}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete{' '}
            <strong>
              {student.firstName} {student.lastName}
            </strong>
            ?
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Delete
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

export default StudentDeleteForm
