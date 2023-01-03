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
  Checkbox,
  Radio,
  RadioGroup,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { useUpdateEnclosure } from "../../../hooks/EnclosureHooks";

const EnclosureEditForm = ({ enclosure, isOpen, onClose, title }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // CONST
  const FILE_SIZES = [0.25, 0.5, 1, 5, 10];
  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      enclosureId: enclosure.enclosureId,
      enclosureName: enclosure.enclosureName,
      required: enclosure.required,
      fileTypes: enclosure.fileTypes,
      fileSize: enclosure.fileSize,
      type: enclosure.type,
    },
    validationSchema: yup.object({
      enclosureName: yup.string().required("Enclosure Name is required"),
      required: yup
        .boolean()
        .oneOf([true, false], "Invalid Field Input")
        .required("Please check if the field is required"),
      // fileTypes: yup
      //   .mixed()
      //   .test(
      //     "selected",
      //     "File Types is required",
      //     (value) => value && value.length
      //   )
      //   .test("fileFormat", "Invalid File Format", (value) => {
      //     value ??
      //       value.forEach((format) => {
      //         if (!SUPPORTED_FORMATS.includes(format)) return false;
      //       });
      //     return true;
      //   }),
      fileSize: yup
        .number()
        .required("File Size is required")
        .oneOf(
          FILE_SIZES.map((size) => size * 1024 * 1024),
          "Invalid File Size"
        ),
      type: yup.string().required("Type is required"),
    }),

    onSubmit: (values) => {
      values.fileTypes = JSON.stringify(values.fileTypes);
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
      description: "Enclosure Updated Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    formik.resetForm();
    return data;
  };

  // Queries
  const enclosureQuery = useUpdateEnclosure(onSuccess);
  const fileTypes = enclosure.fileTypes || [];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "darkAlpha")}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enclosure Name</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                bg={useColorModeValue("white", "whiteAlpha.100")}
                name="enclosureName"
                {...formik.getFieldProps("enclosureName")}
              />
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.enclosureName && formik.errors.enclosureName
                  ? formik.errors.enclosureName
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Required</FormLabel>
              <Flex gap={4}>
                <RadioGroup
                  defaultValue={enclosure.required ? "true" : "false"}
                >
                  <Stack spacing={4} direction="row">
                    <Radio
                      colorScheme="blue"
                      value="true"
                      onChange={(e) =>
                        e.target.checked
                          ? formik.setFieldValue("required", true)
                          : formik.setFieldValue("required", false)
                      }
                    >
                      Yes
                    </Radio>
                    <Radio
                      colorScheme="blue"
                      value="false"
                      onChange={(e) => {
                        e.target.checked
                          ? formik.setFieldValue("required", false)
                          : formik.setFieldValue("required", true);
                      }}
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.required && formik.errors.required
                  ? formik.errors.required
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>File Types</FormLabel>
              <Flex gap={4} wrap="wrap">
                {SUPPORTED_FORMATS.map((format) => (
                  <Checkbox
                    key={format}
                    name="fileTypes[]"
                    {...formik.getFieldProps("fileTypes")}
                    value={format}
                    defaultChecked={fileTypes.includes(format)}
                  >
                    .{format.split("/")[1]}
                  </Checkbox>
                ))}
              </Flex>
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.fileTypes && formik.errors.fileTypes
                  ? formik.errors.fileTypes
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>File Size</FormLabel>
              <Select
                name="fileSize"
                placeholder="Select File Size"
                {...formik.getFieldProps("fileSize")}
              >
                {FILE_SIZES.map((size) => (
                  <option key={size} value={size * 1024 * 1024}>
                    {size < 1 ? <>{size * 1024} KB</> : <>{size} MB</>}
                  </option>
                ))}
              </Select>
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.fileSize && formik.errors.fileSize
                  ? formik.errors.fileSize
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                bg={useColorModeValue("white", "whiteAlpha.100")}
                name="type"
                {...formik.getFieldProps("type")}
              />
              <FormHelperText color={useColorModeValue("red.500", "red.200")}>
                {formik.touched.type && formik.errors.type
                  ? formik.errors.type
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

export default EnclosureEditForm;
