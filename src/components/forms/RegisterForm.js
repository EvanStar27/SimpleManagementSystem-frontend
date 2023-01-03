import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useRegisterUser } from "../../hooks/AuthHooks";

const RegisterForm = () => {
  // Router
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_confirmation: "",
    },

    validationSchema: yup.object({
      username: yup
        .string()
        .required("Username is required")
        .min(4, "Username must be atleast 4 characters long"),

      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be atleast 6 characters long"),

      password_confirmation: yup
        .string()
        .required("Password Confirmation is required")
        .oneOf([yup.ref("password"), null], "Passwords does not match"),
    }),

    onSubmit: (values) => {
      registerQuery.mutate(values);
    },
  });

  const toast = useToast();

  const onSuccess = (data) => {
    toast({
      position: "top",
      variant: "left-accent",
      title: "Success",
      description: "Registered Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    formik.resetForm();
    navigate("/login");
    return data;
  };

  const registerQuery = useRegisterUser(onSuccess);

  return (
    <Box w="320px">
      <Heading variant="xl" textAlign="center">
        Sign up
      </Heading>
      <Text textAlign="center" mt={4} color="gray.500">
        Fill in the fields below to create your account
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl mt={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            bg={useColorModeValue("white", "whiteAlpha.100")}
            name="username"
            {...formik.getFieldProps("username")}
          />
          <FormHelperText color={useColorModeValue("red.500", "red.200")}>
            {formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""}
            {registerQuery.isError &&
            registerQuery?.error?.response?.data?.status === 409
              ? "User already exists"
              : null}
          </FormHelperText>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            bg={useColorModeValue("white", "whiteAlpha.100")}
            name="password"
            {...formik.getFieldProps("password")}
          />
          <FormHelperText color={useColorModeValue("red.500", "red.200")}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FormHelperText>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            bg={useColorModeValue("white", "whiteAlpha.100")}
            name="password_confirmation"
            {...formik.getFieldProps("password_confirmation")}
          />
          <FormHelperText color={useColorModeValue("red.500", "red.200")}>
            {formik.touched.password_confirmation &&
            formik.errors.password_confirmation
              ? formik.errors.password_confirmation
              : ""}
          </FormHelperText>
        </FormControl>

        <Center mt={8}>
          <Button type="submit" colorScheme="blue" size="lg" w="full">
            Sign up
          </Button>
        </Center>
        <Text mt={4}>
          Already have an account?&nbsp;
          <Link
            as={ReachLink}
            to="/login"
            mt={2}
            color={useColorModeValue("blue.500", "blue.200")}
            fontSize="md"
          >
            Log in here
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default RegisterForm;
