import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFetchAllSubject } from "../../hooks/SubjectHooks";
import {
  HiOutlineMagnifyingGlassPlus,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import SubjectAddForm from "../../components/forms/Subjects/SubjectAddForm";
import SubjectUpdateForm from "../../components/forms/Subjects/SubjectUpdateForm";
import SubjectDeleteForm from "../../components/forms/Subjects/SubjectDeleteForm";

const Subjects = ({ isTab }) => {
  // State
  const [subject, setSubject] = useState({});
  const [search, setSearch] = useState("");

  // Theme
  let theadBgColor = useColorModeValue("blue.400", "blue.200");
  let theadFntColor = useColorModeValue("gray.500", "gray.500");
  let boxBg = useColorModeValue("white", "darkAlpha");
  let stripeColor = useColorModeValue("gray.100", "#383838");

  // Modals
  const addModal = useDisclosure();
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  // handlers
  const handleEditSubject = (subject) => {
    setSubject(subject);
    editModal.onOpen();
  };

  const handleDeleteSubject = (subject) => {
    setSubject(subject);
    deleteModal.onOpen();
  };

  // Queries
  const { isLoading, isSuccess, data } = useFetchAllSubject();

  return isSuccess && !isLoading ? (
    <>
      {/* Modals */}
      <SubjectAddForm
        title="Add Subject"
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
      />

      <SubjectUpdateForm
        title="Edit Subject"
        subject={subject}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />

      <SubjectDeleteForm
        title="Warning!"
        subject={subject}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      />

      {/* Content */}
      {!isTab ? (
        <Heading size="md" mt={24} letterSpacing="wider">
          Subjects
        </Heading>
      ) : null}

      <Box bg={boxBg} mt={4} mb={16} p={4} shadow="md" rounded="lg">
        <Flex mt={4} justifyContent="space-between">
          <Button colorScheme="blue" onClick={addModal.onOpen}>
            <HiOutlinePlus size={24} />
            &nbsp; Add New
          </Button>

          <Input
            w={64}
            placeholder="Search"
            focusBorderColor={theadBgColor}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>

        {data?.data?.length ? (
          <TableContainer mt={4}>
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Th isNumeric color={theadFntColor}>
                    ID
                  </Th>
                  <Th color={theadFntColor}>Course Name</Th>
                  <Th color={theadFntColor}>Subject Name</Th>
                  <Th color={theadFntColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.map((subject) => (
                  <Tr
                    key={subject.subjectId}
                    _odd={{
                      bg: stripeColor,
                    }}
                  >
                    <Td isNumeric>{subject.subjectId}</Td>
                    <Td>{subject.courseName}</Td>
                    <Td>{subject.subjectName}</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => handleEditSubject(subject)}
                        >
                          <HiOutlinePencil />
                        </Button>
                        <Button
                          colorScheme="pink"
                          variant="outline"
                          onClick={() => handleDeleteSubject(subject)}
                        >
                          <HiOutlineTrash />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : data?.data?.length === 0 && search !== "" ? (
          <>
            <Text size="md" mt={4}>
              Searching for{" "}
              <strong>
                <q>{search}</q>
              </strong>
            </Text>

            <Heading size="lg">No results found</Heading>
          </>
        ) : (
          <>
            <Center>
              <Heading mt={4} size="lg">
                Subject is empty
              </Heading>
            </Center>
            <Center>
              <Text color="slategray">
                Click on 'Add New' to add new subjects.
              </Text>
            </Center>
          </>
        )}
      </Box>
    </>
  ) : (
    <Heading mt={24}>Loading...</Heading>
  );
};

export default Subjects;
