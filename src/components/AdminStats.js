import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { HiOutlineAcademicCap, HiOutlineUserGroup } from 'react-icons/hi2'
import { useFetchStats } from '../hooks/StatsHooks'

const AdminStats = () => {
  // Queries
  const statsQuery = useFetchStats()

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} h="300px">
        <GridItem
          bg={useColorModeValue('blue.500', 'blue.200')}
          color={useColorModeValue('white', 'black')}
          boxShadow="sm"
          p={4}
          borderRadius="md"
        >
          <Stat>
            <Flex flexDir="column" gap={4}>
              <StatLabel>Courses</StatLabel>
              <StatNumber>
                <Heading>{statsQuery.data?.data?.nCourses}</Heading>
              </StatNumber>
              <StatHelpText>Total Number of Courses</StatHelpText>
              <Center mt={6}>
                <HiOutlineAcademicCap size={48} />
              </Center>
            </Flex>
          </Stat>
        </GridItem>

        <GridItem
          bg={useColorModeValue('white', 'darkAlpha')}
          boxShadow="sm"
          p={4}
          borderRadius="md"
        >
          <Stat>
            <Flex flexDir="column" gap={4}>
              <StatLabel>Students</StatLabel>
              <StatNumber>
                <Heading>{statsQuery.data?.data?.nStudents}</Heading>
              </StatNumber>
              <StatHelpText>Total Number of Students</StatHelpText>
              <Center mt={6}>
                <HiOutlineUserGroup size={48} />
              </Center>
            </Flex>
          </Stat>
        </GridItem>
      </Grid>
    </>
  )
}

export default AdminStats
