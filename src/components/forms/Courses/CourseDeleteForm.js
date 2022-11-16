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
import { useQueryClient } from 'react-query'
import { useDeleteCourse } from '../../../hooks/CourseHooks'

const CourseDeleteForm = ({ course, isOpen, onClose, title }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: course,
    validationSchema: yup.object({
      courseName: yup.string().required('Course Name is required'),
      description: yup.string().required('Course Description is required'),
    }),

    onSubmit: (values) => {
      courseQuery.mutate(values)
    },
  })

  const onSuccess = (data) => {
    queryClient.invalidateQueries('fetch_all_courses')
    queryClient.invalidateQueries('fetch_stats')
    queryClient.invalidateQueries('fetch_chart_stats')

    onClose()
    toast({
      position: 'top',
      variant: 'left-accent',
      title: 'Success',
      description: 'Course Deleted Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    return data
  }

  // Query
  const courseQuery = useDeleteCourse(onSuccess)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'darkAlpha')}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <strong>{course.courseName}</strong>
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

export default CourseDeleteForm
