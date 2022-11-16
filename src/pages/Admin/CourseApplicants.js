import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import { useLocation, useParams } from 'react-router-dom'
import { useFetchApplicantsByCourseId } from '../../hooks/CourseHooks'
import CourseApplicantDeleteForm from '../../components/forms/Courses/CourseApplicantDeleteForm'
import { useState } from 'react'

const CourseApplicants = () => {
  const params = useParams()
  const course = useLocation().state
  const { data } = useFetchApplicantsByCourseId(params.id)

  // States
  const [student, setStudent] = useState({})

  // Modal
  const deleteModal = useDisclosure()

  // Theme
  let theadBgColor = useColorModeValue('blue.500', 'blue.200')
  let theadFntColor = useColorModeValue('white', 'black')
  let boxBg = useColorModeValue('white', 'darkAlpha')

  // Handlers
  const handleDeleteStudent = (student) => {
    setStudent(student)
    deleteModal.onOpen()
  }

  return (
    <>
      <Heading mt={24} size="md">
        Course Applicants
      </Heading>

      <CourseApplicantDeleteForm
        student={student}
        title="Warning!"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      />

      {data?.data?.length ? (
        <Box bg={boxBg} mt={4} p={4} shadow="md" rounded="lg">
          <Heading>{course.courseName}</Heading>
          <Text color="slategray">{course.description}</Text>
          <TableContainer mt={4}>
            <Table variant="unstyled">
              <Thead bg={theadBgColor}>
                <Tr>
                  <Th isNumeric color={theadFntColor}>
                    ID
                  </Th>
                  <Th color={theadFntColor}>First Name</Th>
                  <Th color={theadFntColor}>Last Name</Th>
                  <Th color={theadFntColor}>Gender</Th>
                  <Th color={theadFntColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.map((student) => (
                  <Tr key={student.studentId}>
                    <Td isNumeric>{student.studentId}</Td>
                    <Td>{student.firstName}</Td>
                    <Td>{student.lastName}</Td>
                    <Td>{student.gender}</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          variant="outline"
                          onClick={() => handleDeleteStudent(student)}
                        >
                          <HiOutlineTrash />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box bg={boxBg} mt={4} p={4} shadow="md" rounded="lg">
          <Heading>{course.courseName}</Heading>
          <Text color="slategray">{course.description}</Text>
          <Center>
            <Heading mt={8}>This course has 0 applicants</Heading>
          </Center>
        </Box>
      )}
    </>
  )
}

export default CourseApplicants
