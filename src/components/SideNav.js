import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineChartPie,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const SideNav = ({ isAdmin }) => {
  const hover = {
    bg: useColorModeValue("blue.50", "blueAlphaDark"),
    borderLeft: "4px",
    borderColor: useColorModeValue("blue.500", "blue.200"),
    color: useColorModeValue("blue.500", "blue.200"),
    transition: "ease-in-out",
  };
  const fontClr = useColorModeValue("gray.400", "gray.500");

  return (
    <Box
      w="250px"
      h="100vh"
      bg={useColorModeValue("white", "darkAlpha")}
      position="fixed"
      left="0"
      zIndex={8}
    >
      <Heading
        mt={24}
        mb={6}
        ml={4}
        size="sm"
        letterSpacing="wider"
        color="gray.500"
      >
        MENU
      </Heading>

      <Stack spacing={0}>
        <Link
          as={NavLink}
          to={isAdmin ? "/admin/dashboard" : "/student/dashboard"}
          _hover={hover}
          _activeLink={hover}
          color={useColorModeValue("gray.400", "gray.500")}
        >
          <Box p={4}>
            <Flex>
              <HiOutlineChartPie size={24} />
              &nbsp; Dashboard
            </Flex>
          </Box>
        </Link>

        {isAdmin ? (
          <Link
            as={NavLink}
            to="/admin/management/courses"
            _hover={hover}
            _activeLink={hover}
            color={fontClr}
          >
            <Box p={4}>
              <Flex>
                <HiOutlineAcademicCap size={24} />
                &nbsp; Course
              </Flex>
            </Box>
          </Link>
        ) : null}

        {isAdmin ? (
          <Link
            as={NavLink}
            to="/admin/management/subjects"
            _hover={hover}
            _activeLink={hover}
            color={fontClr}
          >
            <Box p={4}>
              <Flex>
                <HiOutlineBookOpen size={24} />
                &nbsp; Subject
              </Flex>
            </Box>
          </Link>
        ) : null}

        {isAdmin ? (
          <Link
            as={NavLink}
            to="/admin/management/students"
            _hover={hover}
            _activeLink={hover}
            color={fontClr}
          >
            <Box p={4}>
              <Flex>
                <HiOutlineUserGroup size={24} />
                &nbsp; Student
              </Flex>
            </Box>
          </Link>
        ) : null}

        {isAdmin ? (
          <Link
            as={NavLink}
            to="/admin/management/enclosures"
            _hover={hover}
            _activeLink={hover}
            color={fontClr}
          >
            <Box p={4}>
              <Flex>
                <HiOutlineShieldExclamation size={24} />
                &nbsp; Enclosures
              </Flex>
            </Box>
          </Link>
        ) : null}
      </Stack>
    </Box>
  );
};

export default SideNav;
