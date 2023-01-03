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
import { useQueryClient } from "react-query";
import { useDeleteEnclosure } from "../../../hooks/EnclosureHooks";

const EnclosureDeleteForm = ({ enclosure, isOpen, onClose, title }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      enclosureId: enclosure.enclosureId,
    },
    onSubmit: (values) => {
      enclosureQuery.mutate(values);
    },
  });

  const onSuccess = (data) => {
    queryClient.invalidateQueries("fetch_all_enclosures");
    onClose();
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "Enclosure Deleted Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return data;
  };

  // Query
  const enclosureQuery = useDeleteEnclosure(onSuccess);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete{" "}
            <strong>{enclosure.enclosureName}</strong> from Enclosures?
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

export default EnclosureDeleteForm;
