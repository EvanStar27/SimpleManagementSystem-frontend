import { VStack } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <>
      <VStack mt={28}>
        <LoginForm />
      </VStack>
    </>
  );
};

export default Login;
