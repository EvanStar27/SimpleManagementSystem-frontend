import React from "react";
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
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import {
  useEnrollCourse,
  useFetchAllCourses,
} from "../../../hooks/CourseHooks";
import { useFetchSubjectsByCourseId } from "../../../hooks/SubjectHooks";

const EnrollForm = ({ student, initSubject, isOpen, onClose, title }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const courseIds = initSubject
    ?.map((course) => course.courseId)
    .filter((value, index, self) => self.indexOf(value) === index); // Get Unique Ids

  console.log(courseIds);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      studentId: student.studentId,
      courseId: 0,
      subjects: [],
    },

    validationSchema: yup.object({
      studentId: yup.number().required("Student is required"),
      courseId: yup.number().required("Course is required"),
      subjects: yup.array().min(1, "Please select a subject"),
    }),

    onSubmit: (values) => {
      values.subjects = values.subjects.map((id) => parseInt(id));
      values.subjects = JSON.stringify(values.subjects);
      values.courseId = parseInt(values.courseId);
      enrollQuery.mutate(values);
    },
  });

  const onSuccess = (data) => {
    queryClient.invalidateQueries("fetch_all_students");
    queryClient.invalidateQueries("fetch_chart_stats");
    queryClient.invalidateQueries("fetch_subjects_by_student_id");
    onClose();
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "Student Enrolled Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    formik.resetForm();
    return data;
  };

  // Queries
  const enrollQuery = useEnrollCourse(onSuccess);
  const courseQuery = useFetchAllCourses("");
  const subjectQuery = useFetchSubjectsByCourseId(formik.values.courseId);

  // Theme
  let errClr = useColorModeValue("red.500", "red.200");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Course</FormLabel>
              <Select
                name="courseId"
                placeholder="Select Course"
                {...formik.getFieldProps("courseId")}
              >
                {courseQuery.data?.data.map((course) => (
                  <option
                    key={course.courseId}
                    value={course.courseId}
                    disabled={courseIds?.includes(course.courseId)}
                  >
                    {course.courseName}
                  </option>
                ))}
              </Select>
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.courseId && formik.errors.courseId
                  ? formik.errors.courseId
                  : ""}
              </FormHelperText>
            </FormControl>

            {formik.values.courseId ? (
              <FormControl mt={4}>
                <FormLabel>Select Subjects</FormLabel>
                <Flex gap={4} flexWrap={true}>
                  {subjectQuery.data?.data.map((subject) => {
                    return (
                      <Checkbox
                        key={subject.subjectId}
                        name="subjects[]"
                        {...formik.getFieldProps("subjects")}
                        value={subject.subjectId}
                      >
                        {subject.subjectName}
                      </Checkbox>
                    );
                  })}
                </Flex>
                <FormHelperText color={errClr}>
                  {formik.touched.subjects && formik.errors.subjects
                    ? formik.errors.subjects
                    : ""}
                </FormHelperText>
              </FormControl>
            ) : null}
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
  );
};

export default EnrollForm;
