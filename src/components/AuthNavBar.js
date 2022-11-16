import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Hide,
  Show,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBars3,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2'

const AuthNavBar = ({ onOpen, btnRef }) => {
  const colorMode = useColorMode()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location.href = 'http://localhost:3000/'
  }

  return (
    <Box
      w="100%"
      pos="fixed"
      top="0"
      p="4"
      bg={useColorModeValue('white', 'darkAlpha')}
      zIndex={10}
      shadow="sm"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={4} alignItems="center">
            <Show below="lg">
              <Button ref={btnRef} onClick={onOpen} variant="outline">
                <HiOutlineBars3 size={24} />
              </Button>
            </Show>
            <Link to="">
              <Heading size="lg" fontWeight="semibold">
                SiMS
              </Heading>
            </Link>
          </Flex>

          <Hide below="lg">
            <Flex gap={4}>
              <Button onClick={colorMode.toggleColorMode} variant="outline">
                {colorMode.colorMode === 'light' ? (
                  <HiOutlineMoon size={24} />
                ) : (
                  <HiOutlineSun size={24} />
                )}
              </Button>

              <Button variant="outline" onClick={handleLogout}>
                <HiOutlineArrowLeftOnRectangle size={24} />
              </Button>
            </Flex>
          </Hide>
        </Flex>
      </Container>
    </Box>
  )
}

export default AuthNavBar
