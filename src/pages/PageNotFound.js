import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const PageNotFound = () => {
  return (
    <>
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Box>
          <Heading size="4xl">Oops! Page Not Found</Heading>
          <Text mt={8} textAlign="center">
            The page you requested does not exists.
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default PageNotFound
