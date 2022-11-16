import React from 'react'
import { useFetchAllStudents } from '../../hooks/StudentHooks'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Input,
  Button,
  useDisclosure,
  Box,
  Heading,
  useColorModeValue,
  Text,
  Center,
} from '@chakra-ui/react'
import {
  HiOutlineBookOpen,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2'
import StudentAddForm from '../../components/forms/Students/StudentAddForm'
import { useState } from 'react'
import StudentEditForm from '../../components/forms/Students/StudentEditForm'
import StudentDeleteForm from '../../components/forms/Students/StudentDeleteForm'
import EnrollForm from '../../components/forms/Students/EnrollForm'

const Students = () => {
  // States
  const [student, setStudent] = useState({})
  const [search, setSearch] = useState('')

  // Queries
  const { isLoading, isSuccess, data } = useFetchAllStudents(search)

  // Theme
  let theadBgColor = useColorModeValue('blue.500', 'blue.200')
  let theadFntColor = useColorModeValue('white', 'black')
  let boxBg = useColorModeValue('white', 'darkAlpha')

  // Modals
  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()
  const enrollModal = useDisclosure()

  // handlers
  const handleEditStudent = (student) => {
    setStudent(student)
    editModal.onOpen()
  }

  const handleEnroll = (student) => {
    setStudent(student)
    enrollModal.onOpen()
  }

  const handleDeleteStudent = (student) => {
    setStudent(student)
    deleteModal.onOpen()
  }

  return isSuccess && !isLoading ? (
    <>
      {/* Modals */}
      <StudentAddForm
        title="Add Student"
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
      />

      <StudentEditForm
        student={student}
        title="Edit Student"
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />

      <StudentDeleteForm
        student={student}
        title="Warning!"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      />

      <EnrollForm
        student={student}
        title="Enroll to Course"
        isOpen={enrollModal.isOpen}
        onClose={enrollModal.onClose}
      />

      {/* Content */}
      <Heading size="md" mt={24} letterSpacing="wider">
        Students
      </Heading>

      <Box bg={boxBg} mt={4} mb={16} p={4} shadow="md" rounded="lg">
        <Flex mt={4} justifyContent="space-between">
          <Button colorScheme="blue" onClick={addModal.onOpen}>
            <HiOutlinePlus size={24} />
            &nbsp; Add New
          </Button>

          <Input
            w={64}
            placeholder="Search"
            focusBorderColor={theadBgColor}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>

        {data?.data?.length ? (
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
                          onClick={() => handleEditStudent(student)}
                        >
                          <HiOutlinePencil />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDeleteStudent(student)}
                        >
                          <HiOutlineTrash />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleEnroll(student)}
                        >
                          <HiOutlineBookOpen />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : data?.data?.length === 0 && search !== '' ? (
          <>
            <Text size="md" mt={4}>
              Searching for{' '}
              <strong>
                <q>{search}</q>
              </strong>
            </Text>

            <Heading size="lg">No results found</Heading>
          </>
        ) : (
          <>
            <Center>
              <Heading mt={4} size="lg">
                Student is empty
              </Heading>
            </Center>
            <Center>
              <Text color="slategray">
                Click on 'Add New' to add new students.
              </Text>
            </Center>
          </>
        )}
      </Box>
    </>
  ) : (
    <Heading mt={24}>Loading...</Heading>
  )
}

export default Students
