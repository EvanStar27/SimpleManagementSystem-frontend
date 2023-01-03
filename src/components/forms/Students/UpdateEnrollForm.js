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
  useFetchAllCourses,
  useUpdateEnrolledCourse,
} from "../../../hooks/CourseHooks";
import { useFetchSubjectsByCourseId } from "../../../hooks/SubjectHooks";

const UpdateEnrollForm = ({
  student,
  initSubject,
  courseIds,
  isOpen,
  onClose,
  title,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // disable only enrolled courses not the currently selected
  courseIds = courseIds?.filter((value) => value !== initSubject[0]?.courseId);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      csMappingId: initSubject[0]?.csMappingId,
      studentId: student.studentId,
      courseId: initSubject[0]?.courseId,
      subjectList:
        initSubject?.map((subject) => parseInt(subject.subjectId)) || [],
    },

    validationSchema: yup.object({
      studentId: yup.number().required("Student is required"),
      courseId: yup.number().required("Course is required"),
      subjectList: yup.array().min(1, "Please select a subject"),
    }),

    onSubmit: (values) => {
      values.csMappingId = parseInt(values.csMappingId);
      values.studentId = parseInt(values.studentId);
      values.courseId = parseInt(values.courseId);
      enrollQuery.mutate(values);
    },
  });

  const onSuccess = (data) => {
    formik.resetForm();
    queryClient.invalidateQueries("fetch_subjects_by_student_id");

    onClose();
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "Course Enrolled Updated Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return data;
  };

  // Queries
  const enrollQuery = useUpdateEnrolledCourse(onSuccess);
  const courseQuery = useFetchAllCourses("");
  const subjectQuery = useFetchSubjectsByCourseId(formik.values.courseId || 0);

  // Handlers
  const handleCourseChange = () => {
    if (
      parseInt(formik.values.courseId) === parseInt(initSubject[0]?.courseId)
    ) {
      formik.setFieldValue(
        "subjectList",
        initSubject?.map((subject) => parseInt(subject.subjectId))
      );
    } else formik.setFieldValue("subjectList", []);
  };

  const handleSubjectChange = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("subjectList", [
        ...formik.values.subjectList,
        parseInt(e.target.value),
      ]);
    } else {
      formik.setFieldValue(
        "subjectList",
        formik.values.subjectList.filter(
          (sub) => parseInt(sub) !== parseInt(e.target.value)
        )
      );
    }
  };

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
                onClick={handleCourseChange}
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
                        name="subjectList[]"
                        // {...formik.getFieldProps("subjectList")}
                        value={parseInt(subject.subjectId)}
                        defaultChecked={
                          formik.values.subjectList?.includes(subject.subjectId)
                            ? true
                            : false
                        }
                        onChange={(e) => handleSubjectChange(e)}
                      >
                        {subject.subjectName}
                      </Checkbox>
                    );
                  })}
                </Flex>
                <FormHelperText color={errClr}>
                  {formik.touched.subjectList && formik.errors.subjectList
                    ? formik.errors.subjectList
                    : ""}
                </FormHelperText>
              </FormControl>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Update
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

export default UpdateEnrollForm;
