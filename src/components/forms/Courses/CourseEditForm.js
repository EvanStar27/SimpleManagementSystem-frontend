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
  FormHelperText,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useQueryClient } from 'react-query'
import { useUpdateCourse } from '../../../hooks/CourseHooks'

const CourseEditForm = ({ course, isOpen, onClose, title }) => {
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
    onClose()
    toast({
      position: 'top',
      variant: 'left-accent',
      title: 'Success',
      description: 'Course Updated Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    return data
  }

  const courseQuery = useUpdateCourse(onSuccess)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'darkAlpha')}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                name="courseName"
                {...formik.getFieldProps('courseName')}
              />
              <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
                {formik.touched.courseName && formik.errors.courseName
                  ? formik.errors.courseName
                  : ''}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Course Description</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                name="description"
                {...formik.getFieldProps('description')}
              />
              <FormHelperText color={useColorModeValue('red.500', 'red.200')}>
                {formik.touched.description && formik.errors.description
                  ? formik.errors.description
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

export default CourseEditForm
