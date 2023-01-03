import { Container, Flex, Hide, Show, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import AuthNavBar from "./components/AuthNavBar";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import SideNav from "./components/SideNav";

const Layout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return localStorage.getItem("token") &&
    localStorage.getItem("role") &&
    localStorage.getItem("role") === "ROLE_ADMIN" ? (
    <>
      <AuthNavBar isAdmin={true} onOpen={onOpen} btnRef={btnRef} />
      <Flex>
        <Hide below="lg">
          <SideNav isAdmin={true} />
          <Container maxW="container.xl" ml="250px">
            {props.children}
          </Container>
        </Hide>
        <Show below="lg">
          <SideBar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
          <Container maxW="container.xl">{props.children}</Container>
        </Show>
      </Flex>
    </>
  ) : localStorage.getItem("token") &&
    localStorage.getItem("role") &&
    localStorage.getItem("role") === "ROLE_STUDENT" ? (
    <>
      <AuthNavBar isAdmin={false} onOpen={onOpen} btnRef={btnRef} />
      <Flex>
        <Hide below="lg">
          <SideNav isAdmin={false} />
          <Container maxW="container.xl" ml="250px">
            {props.children}
          </Container>
        </Hide>
        <Show below="lg">
          <SideBar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
          <Container maxW="container.xl">{props.children}</Container>
        </Show>
      </Flex>
    </>
  ) : (
    <>
      <NavBar onOpen={onOpen} btnRef={btnRef} />
      <SideBar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Container maxW="container.xl">{props.children}</Container>
    </>
  );
};

export default Layout;
