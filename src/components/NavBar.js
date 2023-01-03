import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

const NavBar = ({ onOpen, btnRef }) => {
  const colorMode = useColorMode();

  return (
    <Box
      w="100%"
      pos="fixed"
      top="0"
      p="4"
      bg={useColorModeValue("white", "darkAlpha")}
      zIndex={10}
      shadow="sm"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Heading
              size="md"
              fontWeight="semibold"
              bg={useColorModeValue("blue.500", "blue.200")}
              color={useColorModeValue("white", "black")}
              borderRadius="md"
              p={2}
            >
              Ms
            </Heading>
          </Link>

          <Button onClick={colorMode.toggleColorMode} variant="outline">
            {colorMode.colorMode === "light" ? (
              <HiOutlineMoon size={24} />
            ) : (
              <HiOutlineSun size={24} />
            )}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;
