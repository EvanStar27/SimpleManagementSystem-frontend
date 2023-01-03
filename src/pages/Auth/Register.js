import { VStack } from "@chakra-ui/react";
import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <>
      <VStack my={28}>
        <RegisterForm />
      </VStack>
    </>
  );
};

export default Register;
