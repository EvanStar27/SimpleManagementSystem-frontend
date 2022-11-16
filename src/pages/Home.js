import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Box>
          <Center>
            <Heading as="h1" size="4xl" fontWeight="bold">
              Welcome to
            </Heading>
          </Center>
          <Center>
            <Heading
              as="h1"
              size="4xl"
              fontWeight="bold"
              color={useColorModeValue('blue.500', 'blue.200')}
              align="center"
            >
              Simple
            </Heading>
          </Center>
          <Center>
            <Heading
              as="h1"
              size="4xl"
              fontWeight="bold"
              color={useColorModeValue('blue.500', 'blue.200')}
              align="center"
            >
              Management System
            </Heading>
          </Center>

          <Center mt={4}>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              align="center"
              color="slategray"
            >
              Full Stack Management System using Spring Boot, ReactJS and MySQL
            </Text>
          </Center>

          <Center mt={6} gap={4}>
            <Link to="/login">
              <Button colorScheme="blue" size="lg">
                Get Started
              </Button>
            </Link>
          </Center>
        </Box>
      </Flex>
    </>
  )
}

export default Home
