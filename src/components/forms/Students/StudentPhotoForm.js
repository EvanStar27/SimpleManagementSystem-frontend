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
  Image,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { useUpdatePhoto } from "../../../hooks/FileHooks";
import FormData from "form-data";

const StudentPhotoForm = ({
  student,
  isOpen,
  onClose,
  title,
  setIsUpdated,
}) => {
  // Const
  const FILE_SIZE = 10 * 1024 * 1024; // 10 * 1024 (kB) * 1024 (bytes) = 10 MB
  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  // Formik
  const toast = useToast();
  const queryClient = useQueryClient();

  const formik = useFormik({
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues: {
      studentId: student.studentId,
      photo: null,
    },

    validationSchema: yup.object({
      photo: yup
        .mixed()
        .required("Photo is required")
        .test("fileFormat", "File format not supported", (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File size too large", (value) => {
          return value && value.size <= FILE_SIZE;
        }),
    }),

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("studentId", values.studentId);
      formData.append("photo", values.photo);
      uploadQuery.mutate(formData, formData.getBoundary);
    },
  });

  const onSuccess = (data) => {
    setIsUpdated(true);
    onClose();
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "Student's Photo Updated Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    formik.resetForm();
    return data;
  };

  // Queries
  const uploadQuery = useUpdatePhoto(onSuccess);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <Image
                rounded="sm"
                src={`http://localhost:8080/api/v1/files/download/photo/${student.studentId}`}
                alt={`${student.firstName} ${student.lastName}`}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Upload Photo</FormLabel>
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
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Change Photo
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

export default StudentPhotoForm;
