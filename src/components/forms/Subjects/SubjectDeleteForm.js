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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { useDeleteSubject } from "../../../hooks/SubjectHooks";

const SubjectDeleteForm = ({ subject, isOpen, onClose, title }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: subject,
    validationSchema: yup.object({
      subjectName: yup.string().required("Subject Name is required"),
      courseId: yup.string().required("Course  is required"),
    }),

    onSubmit: (values) => {
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
      description: "Subject Deleted Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return data;
  };

  // Query
  const subjectQuery = useDeleteSubject(onSuccess);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete{" "}
            <strong>{subject.subjectName}</strong>
            &nbsp;from <strong>{subject.courseName}</strong>?
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Delete
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

export default SubjectDeleteForm;
