import React from "react";
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
} from "@chakra-ui/react";
import {
  HiOutlineMagnifyingGlassPlus,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useState } from "react";
import CourseEditForm from "../../components/forms/Courses/CourseEditForm";
import { useFetchAllCourses } from "../../hooks/CourseHooks";
import CourseAddForm from "../../components/forms/Courses/CourseAddForm";
import CourseDeleteForm from "../../components/forms/Courses/CourseDeleteForm";
import { Link } from "react-router-dom";

const Courses = ({ isTab }) => {
  // States
  const [course, setCourse] = useState({});
  const [search, setSearch] = useState("");

  // Queries
  const { isLoading, isSuccess, data } = useFetchAllCourses(search);

  // Theme
  let theadBgColor = useColorModeValue("blue.400", "blue.200");
  let theadFntColor = useColorModeValue("gray.500", "gray.500");
  let boxBg = useColorModeValue("white", "darkAlpha");
  let stripeColor = useColorModeValue("gray.100", "#383838");

  // Modals
  const addModal = useDisclosure();
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  // handlers
  const handleEditCourse = (course) => {
    setCourse(course);
    editModal.onOpen();
  };

  const handleDeleteCourse = (course) => {
    setCourse(course);
    deleteModal.onOpen();
  };

  return isSuccess && !isLoading ? (
    <>
      {/* Modals */}
      <CourseAddForm
        title="Add Course"
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
      />

      <CourseEditForm
        course={course}
        title="Edit Course"
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />

      <CourseDeleteForm
        course={course}
        title="Warning!"
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      />

      {/* Content */}
      {!isTab ? (
        <Heading size="md" mt={24} letterSpacing="wider">
          Courses
        </Heading>
      ) : null}

      <Box bg={boxBg} mt={4} mb={16} p={4} shadow="md" rounded="lg">
        <Flex mt={4} justifyContent="space-between">
          <Button colorScheme="blue" onClick={addModal.onOpen}>
            <HiOutlinePlus size={24} />
            <Text display={{ xs: "none", sm: "block" }}>&nbsp; Add New</Text>
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
              <Thead>
                <Tr>
                  <Th isNumeric color={theadFntColor}>
                    ID
                  </Th>
                  <Th color={theadFntColor}>Course Name</Th>
                  <Th color={theadFntColor}>Description</Th>
                  <Th color={theadFntColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.map((course) => (
                  <Tr key={course.courseId} _odd={{ bg: stripeColor }}>
                    <Td isNumeric>{course.courseId}</Td>
                    <Td>{course.courseName}</Td>
                    <Td>{course.description}</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => handleEditCourse(course)}
                        >
                          <HiOutlinePencil />
                        </Button>
                        <Button
                          colorScheme="pink"
                          variant="outline"
                          onClick={() => handleDeleteCourse(course)}
                        >
                          <HiOutlineTrash />
                        </Button>
                        <Link
                          to={`/admin/management/courses/applicants/${course.courseId}`}
                          state={course}
                        >
                          <Button variant="outline" colorScheme="orange">
                            <HiOutlineMagnifyingGlassPlus />
                          </Button>
                        </Link>
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
                Course is empty
              </Heading>
            </Center>
            <Center>
              <Text color="slategray">
                Click on 'Add New' to add new courses.
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

export default Courses;
