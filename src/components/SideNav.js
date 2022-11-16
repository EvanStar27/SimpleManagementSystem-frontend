import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import {
  HiOutlineAcademicCap,
  HiOutlineChartPie,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

const SideNav = () => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg={useColorModeValue('white', 'darkAlpha')}
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
        color={useColorModeValue('gray.400', '#555')}
      >
        MENU
      </Heading>

      <Stack spacing={0}>
        <Link
          as={NavLink}
          to="/admin/dashboard"
          _hover={{
            bg: useColorModeValue('blue.50', 'blue.200'),
            borderLeft: '4px',
            borderColor: 'blue.500',
            color: 'black',
            transition: 'ease-in-out',
          }}
          _activeLink={{
            bg: useColorModeValue('blue.50', 'blue.200'),
            borderLeft: '4px',
            borderColor: 'blue.500',
            color: 'black',
            transition: 'ease-in-out',
          }}
          color={useColorModeValue('gray.400', '#555')}
        >
          <Box p={4}>
            <Flex>
              <HiOutlineChartPie size={24} />
              &nbsp; Dashboard
            </Flex>
          </Box>
        </Link>

        <Link
          as={NavLink}
          to="/admin/management/courses"
          _hover={{
            bg: useColorModeValue('blue.50', 'blue.200'),
            borderLeft: '4px',
            borderColor: 'blue.500',
            color: 'black',
            transition: 'ease-in-out',
          }}
          _activeLink={{
            bg: useColorModeValue('blue.50', 'blue.200'),
            borderLeft: '4px',
            borderColor: 'blue.500',
            color: 'black',
            transition: 'ease-in-out',
          }}
          color={useColorModeValue('gray.400', '#555')}
        >
          <Box p={4}>
            <Flex>
              <HiOutlineAcademicCap size={24} />
              &nbsp; Course
            </Flex>
          </Box>
        </Link>

        <Link
          as={NavLink}
          to="/admin/management/students"
          _hover={{
            bg: useColorModeValue('blue.50', 'blue.200'),
            borderLeft: '4px',
            borderColor: 'blue.500',
            color: 'black',
            transition: 'ease-in-out',
          }}
          _activeLink={{
            bg: useColorModeValue('blue.50', 'blue.200'),
            borderLeft: '4px',
            borderColor: 'blue.500',
            color: 'black',
            transition: 'ease-in-out',
          }}
          color={useColorModeValue('gray.400', '#555')}
        >
          <Box p={4}>
            <Flex>
              <HiOutlineUserGroup size={24} />
              &nbsp; Student
            </Flex>
          </Box>
        </Link>
      </Stack>
    </Box>
  )
}

export default SideNav
