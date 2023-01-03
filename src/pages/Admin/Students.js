import React from "react";
import { useFetchAllStudents } from "../../hooks/StudentHooks";
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
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HiOutlineEllipsisVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import StudentAddForm from "../../components/forms/Students/StudentAddForm";
import { useState } from "react";
import StudentEditForm from "../../components/forms/Students/StudentEditForm";
import StudentDeleteForm from "../../components/forms/Students/StudentDeleteForm";
import { Link } from "react-router-dom";
import StudentPhotoForm from "../../components/forms/Students/StudentPhotoForm";

const Students = ({ isTab }) => {
  // States
  const [student, setStudent] = useState({});
  const [search, setSearch] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  // Queries
  const { isLoading, isSuccess, data } = useFetchAllStudents(search);

  // Theme
  let theadBgColor = useColorModeValue("blue.400", "blue.200");
  let theadFntColor = useColorModeValue("gray.500", "gray.500");
  let boxBg = useColorModeValue("white", "darkAlpha");
  let stripeColor = useColorModeValue("gray.100", "#383838");

  // Modals
  const addModal = useDisclosure();
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();
  const photoModal = useDisclosure();

  // handlers
  const handleEditStudent = (student) => {
    setStudent(student);
    editModal.onOpen();
  };

  const handleDeleteStudent = (student) => {
    setStudent(student);
    deleteModal.onOpen();
  };

  const handleAvatarClicked = (student) => {
    setIsUpdated(false);
    setStudent(student);
    photoModal.onOpen();
  };

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

      <StudentPhotoForm
        student={student}
        title="Update Student Photo"
        isOpen={photoModal.isOpen}
        onClose={photoModal.onClose}
        setIsUpdated={setIsUpdated}
      />

      {/* Content */}
      {!isTab ? (
        <Heading size="md" mt={24} letterSpacing="wider">
          Students
        </Heading>
      ) : null}

      <Box bg={boxBg} mt={4} mb={16} p={4} shadow="md" rounded="lg">
        <Flex mt={4} justifyContent="end">
          {/* <Button colorScheme="blue" onClick={addModal.onOpen}>
            <HiOutlinePlus size={24} />
            &nbsp; Add New
          </Button> */}

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
              <Thead>
                <Tr>
                  <Th isNumeric color={theadFntColor}>
                    ID
                  </Th>
                  <Th color={theadFntColor}>Name</Th>
                  <Th color={theadFntColor}>Gender</Th>
                  <Th color={theadFntColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.map((student) => (
                  <Tr
                    key={student.studentId}
                    _odd={{
                      bg: stripeColor,
                    }}
                  >
                    <Td isNumeric>{student.studentId}</Td>
                    <Td>
                      <Flex alignItems="center" gap={4}>
                        <Avatar
                          name={student.firstName + " " + student.lastName}
                          src={`http://localhost:8080/api/v1/files/download/photo/${student.studentId}?updated=${isUpdated}`} // isUpdated for browser cache to reload
                          _hover={{
                            cursor: "pointer",
                            ring: 4,
                            ringColor: "blue.200",
                          }}
                          onClick={() => handleAvatarClicked(student)}
                        />
                        <span>
                          {student.firstName} {student.lastName}
                        </span>
                      </Flex>
                    </Td>
                    <Td>{student.gender}</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => handleEditStudent(student)}
                        >
                          <HiOutlinePencil />
                        </Button>
                        <Button
                          colorScheme="pink"
                          variant="outline"
                          onClick={() => handleDeleteStudent(student)}
                        >
                          <HiOutlineTrash />
                        </Button>

                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Actions"
                            icon={<HiOutlineEllipsisVertical />}
                            variant="outline"
                            colorScheme="orange"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<HiOutlineEye />}
                              as={Link}
                              to={`/admin/management/students/${student.studentId}`}
                            >
                              View
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : data?.data?.length === 0 && search !== "" ? (
          <>
            <Text size="md" mt={4}>
              Searching for{" "}
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
  );
};

export default Students;
