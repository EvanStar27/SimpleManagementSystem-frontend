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
  Input,
  useColorModeValue,
  FormHelperText,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { useUpdateSubject } from "../../../hooks/SubjectHooks";
import { useFetchAllCourses } from "../../../hooks/CourseHooks";

const SubjectUpdateForm = ({ isOpen, onClose, title, subject }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: subject,
    validationSchema: yup.object({
      subjectName: yup.string().required("Subject Name is required"),
      courseId: yup.number().required("Course  is required"),
    }),

    onSubmit: (values) => {
      values.courseId = parseInt(values.courseId);
      subjectQuery.mutate(values);
    },
  });

  const onSuccess = (data) => {
    queryClient.invalidateQueries("fetch_all_subjects");
    onClose();
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "Subject Updated Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    formik.resetForm();
    return data;
  };

  // Queries
  const subjectQuery = useUpdateSubject(onSuccess);
  const courseQuery = useFetchAllCourses("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Subject Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                bg={useColorModeValue("white", "whiteAlpha.100")}
                name="subjectName"
                {...formik.getFieldProps("subjectName")}
              />
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.subjectName && formik.errors.subjectName
                  ? formik.errors.subjectName
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Course</FormLabel>
              <Select
                name="courseId"
                placeholder="Select Course"
                {...formik.getFieldProps("courseId")}
              >
                {courseQuery.data?.data.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
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

export default SubjectUpdateForm;
