import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineUserGroup,
  HiOutlineSun,
  HiOutlineMoon,
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const SideBar = ({ isOpen, onClose, btnRef }) => {
  const colorMode = useColorMode()

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading size="lg">Managment Menu</Heading>
        </DrawerHeader>

        <DrawerBody>
          <Flex styleType="none" flexDir="column" color="slategray">
            <Link to="/admin/dashboard" onClick={onClose}>
              <Box
                _hover={{
                  bg: useColorModeValue('blue.500', 'blue.200'),
                  color: useColorModeValue('white', 'black'),
                  transition: 'ease-in-out',
                }}
                borderRadius="md"
                p={4}
              >
                <Flex alignItems="center" gap={4}>
                  <HiOutlineHome size={24} /> Dashboard
                </Flex>
              </Box>
            </Link>

            <Link onClick={onClose} to="/admin/management/courses">
              <Box
                _hover={{
                  bg: useColorModeValue('blue.500', 'blue.200'),
                  color: useColorModeValue('white', 'black'),
                  transition: 'ease-in-out',
                }}
                borderRadius="md"
                p={4}
              >
                <Flex alignItems="center" gap={4}>
                  <HiOutlineBookOpen size={24} /> Course
                </Flex>
              </Box>
            </Link>

            <Link to="/admin/management/students" onClick={onClose}>
              <Box
                _hover={{
                  bg: useColorModeValue('blue.500', 'blue.200'),
                  color: useColorModeValue('white', 'black'),
                  transition: 'ease-in-out',
                }}
                borderRadius="md"
                p={4}
              >
                <Flex alignItems="center" gap={4}>
                  <HiOutlineUserGroup size={24} /> Students
                </Flex>
              </Box>
            </Link>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={colorMode.toggleColorMode} variant="outline">
            {colorMode.colorMode === 'light' ? (
              <>
                <HiOutlineMoon size={24} /> &nbsp; Dark Mode
              </>
            ) : (
              <>
                <HiOutlineSun size={24} /> &nbsp; Light Mode
              </>
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SideBar
