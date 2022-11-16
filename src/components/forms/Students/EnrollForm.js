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
  useColorModeValue,
  Select,
  FormHelperText,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useQueryClient } from 'react-query'
import { useEnrollCourse, useFetchAllCourses } from '../../../hooks/CourseHooks'

const EnrollForm = ({ student, isOpen, onClose, title }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      studentId: student.studentId,
      courseId: '',
    },

    validationSchema: yup.object({
      studentId: yup.number().required('Student is required'),
      courseId: yup.number().required('Course is required'),
    }),

    onSubmit: (values) => {
      enrollQuery.mutate(values)
    },
  })

  const onSuccess = (data) => {
    queryClient.invalidateQueries('fetch_all_students')
    queryClient.invalidateQueries('fetch_chart_stats')

    onClose()
    toast({
      position: 'top',
      variant: 'left-accent',
      title: 'Success',
      description: 'Student Enrolled Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    formik.resetForm()
    return data
  }

  // Queries
  const enrollQuery = useEnrollCourse(onSuccess)
  const courseQuery = useFetchAllCourses('')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'darkAlpha')}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Course</FormLabel>
              <Select
                name="courseId"
                placeholder="Select Course"
                {...formik.getFieldProps('courseId')}
              >
                {courseQuery.data?.data.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.courseName}
                  </option>
                ))}
              </Select>
              <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
                {formik.touched.courseId && formik.errors.courseId
                  ? formik.errors.courseId
                  : ''}
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Enroll
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

export default EnrollForm
