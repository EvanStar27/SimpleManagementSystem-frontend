import {
  Box,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import AdminStats from '../../components/AdminStats'
import CourseChart from '../../components/CourseChart'
import CoursesTab from './CoursesTab'
import StudentsTab from './StudentsTab'

const AdminDashboard = () => {
  const gridBP = useBreakpointValue({ sm: 'repeat(1, 1fr)', lg: '1fr 40%' })

  return (
    <>
      <Heading size="md" mt={24}>
        Overview
      </Heading>
      <Grid templateColumns={gridBP} mt={4} gap={8}>
        <GridItem>
          <Box
            maxHeight="300px"
            bg={useColorModeValue('white', 'darkAlpha')}
            p={4}
            rounded="md"
            shadow="md"
          >
            <CourseChart />
          </Box>
        </GridItem>
        <GridItem>
          <AdminStats />
        </GridItem>
      </Grid>

      <Tabs mt={8}>
        <TabList>
          <Tab>Courses</Tab>
          <Tab>Students</Tab>
        </TabList>

        <TabPanels mt={8}>
          <TabPanel p={0}>
            <CoursesTab />
          </TabPanel>
          <TabPanel p={0}>
            <StudentsTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminDashboard
