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
import { useDeleteApplicantsById } from '../../../hooks/CourseHooks'

const CourseApplicantDeleteForm = ({ student, isOpen, onClose, title }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: student,
    validationSchema: yup.object({
      courseName: yup.string().required('Course Name is required'),
      description: yup.string().required('Course Description is required'),
    }),

    onSubmit: (values) => {
      courseQuery.mutate(values)
    },
  })

  const onSuccess = (data) => {
    queryClient.invalidateQueries(
      'fetch_applicants_by_course_id',
      student.csMappingId,
    )
    queryClient.invalidateQueries('fetch_chart_stats')
    onClose()
    toast({
      position: 'top',
      variant: 'left-accent',
      title: 'Success',
      description: 'Applicant Removed Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    return data
  }

  // Query
  const courseQuery = useDeleteApplicantsById(student, onSuccess)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'darkAlpha')}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove{' '}
            <strong>
              {student.firstName} {student.lastName}
            </strong>{' '}
            from <strong>{student.courseName}</strong>?
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

export default CourseApplicantDeleteForm
