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
  Select,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAddNewStudent } from "../../../hooks/StudentHooks";
import { useQueryClient } from "react-query";
import FormData from "form-data";
import { useUploadPhoto } from "../../../hooks/FileHooks";
import { useFetchEnclosuresByType } from "../../../hooks/EnclosureHooks";

const StudentAddForm = ({ isOpen, onClose, title, setIsUpdated }) => {
  // Formik
  const toast = useToast();
  const queryClient = useQueryClient();

  const onSuccess = (data) => {
    const formData = new FormData();
    formData.append("studentId", data?.data?.studentId);
    formData.append("enclosureId", photoValidation?.enclosureId);
    formData.append("photo", formik.values.photo);
    uploadPhotoQuery.mutate(formData, formData.getBoundary);

    queryClient.invalidateQueries("fetch_all_students");
    queryClient.invalidateQueries("fetch_stats");
    queryClient.invalidateQueries("fetch_chart_stats");
    queryClient.invalidateQueries("fetch_student_by_user_id");

    setIsUpdated(true);
    onClose();
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "New student added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    formik.resetForm();
    return data;
  };

  // Queries
  const studentQuery = useAddNewStudent(onSuccess);
  const uploadPhotoQuery = useUploadPhoto();
  const enclosureQuery = useFetchEnclosuresByType("profile");

  const photoValidation = enclosureQuery?.data?.data?.filter(
    (enclosure) => enclosure.enclosureName === "Photo"
  )[0];

  const certificateValidation = enclosureQuery?.data?.data?.filter(
    (enclosure) => enclosure.enclosureName === "Birth Certificate"
  )[0];

  // Validation using Enclosure
  const photoSchema = photoValidation?.required
    ? yup
        .mixed()
        .required("Photo is required")
        .test("fileFormat", "File format not supported", (value) => {
          return value && photoValidation?.fileTypes?.includes(value.type);
        })
        .test("fileSize", "File size too large", (value) => {
          return value && value.size <= photoValidation?.fileSize;
        })
    : yup
        .mixed()
        .nullable()
        .test("fileFormat", "File format not supported", (value) => {
          if (value === null) return true;
          return value && photoValidation?.fileTypes?.includes(value.type);
        })
        .test("fileSize", "File size too large", (value) => {
          if (value === null) return true;
          return value && value.size <= photoValidation?.fileSize;
        });

  const certificateSchema = certificateValidation?.required
    ? yup
        .mixed()
        .required("Birth Certificate is required")
        .test("fileFormat", "File format not supported", (value) => {
          return (
            value && certificateValidation?.fileTypes?.includes(value.type)
          );
        })
        .test("fileSize", "File size too large", (value) => {
          return value && value.size <= certificateValidation?.fileSize;
        })
    : yup
        .mixed()
        .nullable()
        .test("fileFormat", "File format not supported", (value) => {
          if (value === null) return true;
          return (
            value && certificateValidation?.fileTypes?.includes(value.type)
          );
        })
        .test("fileSize", "File size too large", (value) => {
          if (value === null) return true;
          return value && value.size <= certificateValidation?.fileSize;
        });

  const formik = useFormik({
    validateOnBlur: true,
    initialValues: {
      userId: localStorage.getItem("userId"),
      firstName: "",
      lastName: "",
      gender: "",
      photo: null,
      birthCertificate: null,
    },

    validationSchema: yup.object({
      firstName: yup
        .string()
        .matches(
          /^[a-zA-Z ]*$/,
          "First Name cannot contain numbers or special characters"
        )
        .required("First Name is required")
        .max(50, "First Name cannot be more than 50 characters"),
      lastName: yup
        .string()
        .matches(
          /^[a-zA-Z ]*$/,
          "Last Name cannot contain numbers or special characters"
        )
        .required("Last Name is required")
        .max(50, "Last Name cannot be more than 50 characters"),
      gender: yup.string().required("Gender is required"),
      photo: photoSchema,
      birthCertificate: certificateSchema,
    }),

    onSubmit: (values) => {
      const studentFields = {
        userId: parseInt(values.userId),
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
      };
      studentQuery.mutate(studentFields);
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                bg={useColorModeValue("white", "whiteAlpha.100")}
                name="firstName"
                {...formik.getFieldProps("firstName")}
              />
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                bg={useColorModeValue("white", "whiteAlpha.100")}
                name="lastName"
                {...formik.getFieldProps("lastName")}
              />
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                placeholder="Select Gender"
                {...formik.getFieldProps("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.gender && formik.errors.gender
                  ? formik.errors.gender
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Student's Photo</FormLabel>
              <Input
                type="file"
                pt={1}
                name="photo"
                onChange={(e) =>
                  formik.setFieldValue("photo", e.target.files[0])
                }
              />

              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.photo && formik.errors.photo
                  ? formik.errors.photo
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Student's Birth Certificate</FormLabel>
              <Input
                type="file"
                pt={1}
                name="birthCertificate"
                onChange={(e) =>
                  formik.setFieldValue("birthCertificate", e.target.files[0])
                }
              />

              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.birthCertificate &&
                formik.errors.birthCertificate
                  ? formik.errors.birthCertificate
                  : ""}
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Add
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

export default StudentAddForm;
