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
import React, { useEffect, useState } from "react";
import StudentAddForm from "../../components/forms/Students/StudentAddForm";
import StudentPhotoForm from "../../components/forms/Students/StudentPhotoForm";
import StudentEditForm from "../../components/forms/Students/StudentEditForm";
import { useFetchStudentByUserId } from "../../hooks/StudentHooks";
import {
  HiOutlineAcademicCap,
  HiOutlinePencil,
  HiOutlinePhoto,
  HiOutlinePlus,
} from "react-icons/hi2";
import {
  useFetchAllSubject,
  useFetchSubjectsByStudentId,
} from "../../hooks/SubjectHooks";
import EnrollForm from "../../components/forms/Students/EnrollForm";
import UpdateEnrollForm from "../../components/forms/Students/UpdateEnrollForm";
import { useFetchAllCourses } from "../../hooks/CourseHooks";

const StudentDashboard = () => {
  // Modals
  const addModal = useDisclosure();

  // Queries
  const studentQuery = useFetchStudentByUserId(localStorage.getItem("userId"));
  const subjectArrQuery = useFetchSubjectsByStudentId(
    studentQuery?.data?.data?.studentId || 0
  );
  const subjectQuery = useFetchAllSubject();
  const courseQuery = useFetchAllCourses("");

  // State
  const [isUpdated, setIsUpdated] = useState(false);
  const [courseId, setCourseId] = useState(0);

  // Handlers
  const handleUpdate = (id) => {
    setCourseId(id);
    updateEnrollModal.onOpen();
  };

  // Modals
  const photoModal = useDisclosure();
  const editModal = useDisclosure();
  const enrollModal = useDisclosure();
  const updateEnrollModal = useDisclosure();

  // Breakpoints
  const gridBP = useBreakpointValue({ xs: "repeat(1, 1fr)", md: "30% 1fr" });

  // Theme
  let bgClr = useColorModeValue("white", "darkAlpha");
  let courseBgClr = useColorModeValue("gray.100", "#383838");

  useEffect(() => {
    if (studentQuery?.error?.response?.data?.status === 404) addModal.onOpen();
  }, [studentQuery.isError]);

  return (
    <>
      {/* Modals */}
      <StudentAddForm
        title="Update Your Profile"
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        setIsUpdated={setIsUpdated}
      />

      {studentQuery.isSuccess ? (
        <StudentPhotoForm
          student={studentQuery?.data?.data}
          title="Update Profile Photo"
          isOpen={photoModal.isOpen}
          onClose={photoModal.onClose}
          setIsUpdated={setIsUpdated}
        />
      ) : null}

      {studentQuery.isSuccess ? (
        <StudentEditForm
          student={studentQuery?.data?.data}
          title="Edit Profile"
          isOpen={editModal.isOpen}
          onClose={editModal.onClose}
        />
      ) : null}

      {studentQuery.isSuccess ? (
        <EnrollForm
          student={studentQuery?.data?.data}
          initSubject={subjectArrQuery?.data?.data}
          title="Enroll to Course"
          isOpen={enrollModal.isOpen}
          onClose={enrollModal.onClose}
        />
      ) : null}

      {studentQuery.isSuccess ? (
        <UpdateEnrollForm
          student={studentQuery?.data?.data}
          initSubject={
            subjectArrQuery?.data?.data?.filter(
              (subject) => subject.courseId === courseId
            ) || []
          }
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
      <Heading size="md" mt={24}>
        Overview
      </Heading>

      <Grid templateColumns={gridBP} gap={4}>
        <GridItem>
          <Box
            mt={4}
            p={4}
            bg={useColorModeValue("white", "darkAlpha")}
            rounded="3xl"
            boxShadow="xl"
          >
            {studentQuery.isSuccess ? (
              <>
                <Box position="relative">
                  <Image
                    rounded="2xl"
                    w="full"
                    src={`http://localhost:8080/api/v1/files/download/photo/${studentQuery?.data?.data?.studentId}?updated=${isUpdated}`}
                  />
                  <Button
                    colorScheme="orange"
                    rounded="3xl"
                    position="absolute"
                    bottom={-4}
                    right={16}
                    boxShadow="md"
                    onClick={() => photoModal.onOpen()}
                  >
                    <HiOutlinePhoto />
                  </Button>
                  <Button
                    colorScheme="blue"
                    rounded="3xl"
                    position="absolute"
                    bottom={-4}
                    right={2}
                    boxShadow="md"
                    onClick={() => editModal.onOpen()}
                  >
                    <HiOutlinePencil />
                  </Button>
                </Box>
                <Flex justifyContent="space-between" alignItems="end" mt={4}>
                  <Heading size="md">
                    {studentQuery?.data?.data?.firstName}&nbsp;
                    {studentQuery?.data?.data?.lastName}
                  </Heading>
                  <Text color="gray.500">
                    {studentQuery?.data?.data?.gender}
                  </Text>
                </Flex>
              </>
            ) : (
              <VStack color="gray.500">
                <HiOutlinePhoto size={64} />
                <Text color="gray.500">Start your learning journey by</Text>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => addModal.onOpen()}
                >
                  Setting up your profile
                </Button>
              </VStack>
            )}
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
  );
};

export default StudentDashboard;
