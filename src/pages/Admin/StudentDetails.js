import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Tag,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlinePencil,
  HiOutlinePlus,
} from "react-icons/hi2";
import { useParams } from "react-router-dom";
import EnrollForm from "../../components/forms/Students/EnrollForm";
import UpdateEnrollForm from "../../components/forms/Students/UpdateEnrollForm";
import { useFetchAllCourses } from "../../hooks/CourseHooks";
import { useFetchStudentById } from "../../hooks/StudentHooks";
import {
  useFetchAllSubject,
  useFetchSubjectsByStudentId,
} from "../../hooks/SubjectHooks";

const StudentDetails = () => {
  const params = useParams();

  // Queries
  const studentQuery = useFetchStudentById(params.id);
  const subjectArrQuery = useFetchSubjectsByStudentId(params.id);
  const subjectQuery = useFetchAllSubject();
  const courseQuery = useFetchAllCourses("");

  const student = studentQuery?.data?.data ? studentQuery?.data?.data : null;

  // Theme
  let boxBg = useColorModeValue("white", "darkAlpha");
  let bgClr = useColorModeValue("white", "darkAlpha");
  let courseBgClr = useColorModeValue("gray.100", "#383838");

  // Modals
  const enrollModal = useDisclosure();
  const updateEnrollModal = useDisclosure();

  // Breakpoints
  const gridBP = useBreakpointValue({ xs: "repeat(1, 1fr)", md: "30% 1fr" });

  // States
  const [courseId, setCourseId] = useState(0);

  // Handlers
  const handleUpdate = (id) => {
    setCourseId(id);
    updateEnrollModal.onOpen();
  };

  return studentQuery.isError ? (
    <VStack mt={24}>
      <Heading size="3xl">404</Heading>
      <Heading>Student Not Found</Heading>
      <Text>Student you requested does not exists.</Text>
    </VStack>
  ) : studentQuery.isLoading || subjectArrQuery.isLoading ? (
    <Heading mt={24}>Loading...</Heading>
  ) : studentQuery.isSuccess && subjectArrQuery.isSuccess ? (
    <>
      <EnrollForm
        student={student}
        initSubject={subjectArrQuery?.data?.data}
        title="Enroll to Course"
        isOpen={enrollModal.isOpen}
        onClose={enrollModal.onClose}
      />

      {subjectArrQuery?.data?.data?.length !== 0 ? (
        <UpdateEnrollForm
          student={student}
          initSubject={subjectArrQuery?.data?.data?.filter(
            (subject) => subject.courseId === courseId
          )}
          courseIds={
            subjectArrQuery?.data?.data
              .map((subject) => subject.courseId)
              .filter((value, index, self) => self.indexOf(value) === index) // distinct
          }
          title="Update Course Enrolled"
          isOpen={updateEnrollModal.isOpen}
          onClose={updateEnrollModal.onClose}
        />
      ) : null}
      {/* Content */}
      <Heading size="md" mt={24} letterSpacing="wider">
        Student Details
      </Heading>
      <Grid templateColumns={gridBP} gap={4}>
        <GridItem>
          <Box bg={boxBg} mt={4} mb={16} p={4} shadow="md" rounded="3xl">
            <Image
              src={`http://localhost:8080/api/v1/files/download/photo/${student?.studentId}`}
              alt={student?.firstName + " " + student?.lastName}
              w="full"
              rounded="2xl"
            />

            <Flex justifyContent="space-between" alignItems="end">
              <Heading size="md" mt={4}>
                {student?.firstName}&nbsp;{student?.lastName}
              </Heading>
              <Text color="gray.500">{student?.gender}</Text>
            </Flex>
          </Box>
        </GridItem>

        {/* RIGHT */}
        <GridItem>
          <Box mt={4} w="full" p={4} bg={bgClr} rounded="3xl" boxShadow="xl">
            {subjectArrQuery?.data?.data?.length !== 0 ? (
              <Button
                mb={4}
                colorScheme="blue"
                rounded="2xl"
                onClick={() => enrollModal.onOpen()}
              >
                <HiOutlinePlus size={24} />
                &nbsp;Enroll New
              </Button>
            ) : null}
            {subjectArrQuery?.data?.data?.length !== 0 ? (
              courseQuery?.data?.data?.map((course) => {
                return subjectArrQuery?.data?.data?.filter(
                  (subject) => subject.courseId === course.courseId
                ).length ? (
                  <>
                    <Box
                      key={course.courseId}
                      _odd={{ bg: courseBgClr }}
                      rounded="2xl"
                      p={4}
                    >
                      <Flex
                        gap={4}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Heading size="md" letterSpacing="wider">
                          {course.courseName}
                        </Heading>
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          onClick={() => handleUpdate(course.courseId)}
                          rounded="xl"
                        >
                          <HiOutlinePencil />
                        </Button>
                      </Flex>
                      <Flex gap={4} mt={4}>
                        {subjectArrQuery?.data?.data
                          ?.filter(
                            (subject) => subject.courseId === course.courseId
                          )
                          .map((sub) => {
                            return (
                              <Tag
                                key={sub.subjectId}
                                size="lg"
                                rounded="2xl"
                                colorScheme="blue"
                              >
                                {
                                  subjectQuery?.data?.data.filter(
                                    (subject) =>
                                      sub.subjectId === subject.subjectId
                                  )[0].subjectName
                                }
                              </Tag>
                            );
                          })}
                      </Flex>
                    </Box>
                  </>
                ) : null;
              })
            ) : (
              <>
                <VStack color="gray.500">
                  <HiOutlineAcademicCap size={64} />
                  <Text>Student not yet enrolled in any courses.</Text>
                  <Button
                    disabled={studentQuery.isError}
                    colorScheme="blue"
                    onClick={() => enrollModal.onOpen()}
                  >
                    Enroll Now
                  </Button>
                </VStack>
              </>
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  ) : null;
};

export default StudentDetails;
