import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { useLocation, useParams } from "react-router-dom";
import { useFetchApplicantsByCourseId } from "../../hooks/CourseHooks";
import CourseApplicantDeleteForm from "../../components/forms/Courses/CourseApplicantDeleteForm";
import { useState } from "react";
import { useFetchSubjectsByCourseId } from "../../hooks/SubjectHooks";

const CourseApplicants = () => {
  const params = useParams();
  const course = useLocation().state;

  // Queries
  const studentQuery = useFetchApplicantsByCourseId(params.id);
  const subjectQuery = useFetchSubjectsByCourseId(params.id);

  // States
  const [student, setStudent] = useState({});

  // Modal
  const deleteModal = useDisclosure();

  // Theme
  let theadFntColor = useColorModeValue("gray.500", "gray.500");
  let boxBg = useColorModeValue("white", "darkAlpha");
  let stripeColor = useColorModeValue("gray.100", "#383838");

  // Handlers
  const handleDeleteStudent = (student) => {
    setStudent(student);
    deleteModal.onOpen();
  };

  return studentQuery.isError ? (
    <VStack mt={24}>
      <Heading size="3xl">404</Heading>
      <Heading>Students Not Found</Heading>
      <Text>Course you requested does not exists.</Text>
    </VStack>
  ) : studentQuery.isLoading || subjectQuery.isLoading ? (
    <Heading mt={24}>Loading...</Heading>
  ) : (
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

      {studentQuery?.data?.data?.length ? (
        <Box bg={boxBg} mt={4} p={4} shadow="md" rounded="lg">
          <Heading>{course?.courseName}</Heading>
          <Text color="slategray">{course?.description}</Text>
          <TableContainer mt={4}>
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Th isNumeric color={theadFntColor}>
                    ID
                  </Th>
                  <Th color={theadFntColor}>Name</Th>
                  <Th color={theadFntColor}>Gender</Th>
                  <Th color={theadFntColor}>Subjects</Th>
                  <Th color={theadFntColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {studentQuery?.data?.data.map((student) => (
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
                          src={`http://localhost:8080/api/v1/files/download/photo/${student.studentId}`}
                        />
                        <span>
                          {student.firstName} {student.lastName}
                        </span>
                      </Flex>
                    </Td>
                    <Td>{student.gender}</Td>
                    <Td>
                      <Flex gap={2} flexWrap={true}>
                        {JSON.parse(student.subjects).map((subjectId) => {
                          return (
                            <Tag key={subjectId}>
                              {
                                subjectQuery.data?.data.filter(
                                  (subject) =>
                                    parseInt(subject.subjectId) ===
                                    parseInt(subjectId)
                                )[0]?.subjectName
                              }
                            </Tag>
                          );
                        })}
                      </Flex>
                    </Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          colorScheme="pink"
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
          <Heading>{course?.courseName}</Heading>
          <Text color="slategray">{course?.description}</Text>
          <Center>
            <Heading mt={8}>This course has 0 applicants</Heading>
          </Center>
        </Box>
      )}
    </>
  );
};

export default CourseApplicants;
