import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  Tag,
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
import {
  HiOutlineMagnifyingGlassPlus,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useFetchAllEnclosures } from "../../hooks/EnclosureHooks";
import EnclosureAddForm from "../../components/forms/Enclosures/EnclosureAddForm";
import EnclosureEditForm from "../../components/forms/Enclosures/EnclosureEditForm";
import EnclosureDeleteForm from "../../components/forms/Enclosures/EnclosureDeleteForm";

const Enclosures = ({ isTab }) => {
  // State
  const [enclosure, setEnclosure] = useState({});
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
  const handleEditEnclosure = (enclosure) => {
    setEnclosure(enclosure);
    editModal.onOpen();
  };

  const handleDeleteEnclosure = (enclosure) => {
    setEnclosure(enclosure);
    deleteModal.onOpen();
  };

  // Queries
  const { isLoading, isSuccess, data } = useFetchAllEnclosures();

  return isSuccess && !isLoading ? (
    <>
      {/* Modals */}
      <EnclosureAddForm
        title="Add Enclosure"
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
      />

      <EnclosureEditForm
        title="Edit Enclosure"
        enclosure={enclosure}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />

      <EnclosureDeleteForm
        title="Warning!"
        enclosure={enclosure}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      />

      {/* Content */}
      {!isTab ? (
        <Heading size="md" mt={24} letterSpacing="wider">
          Enclosures
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
          <Box overflowX="auto" maxW="100%" mt={4}>
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Th isNumeric color={theadFntColor}>
                    ID
                  </Th>
                  <Th color={theadFntColor}>Name</Th>
                  <Th color={theadFntColor}>Required</Th>
                  <Th color={theadFntColor}>File Types</Th>
                  <Th color={theadFntColor}>File Size</Th>
                  <Th color={theadFntColor}>Type</Th>
                  <Th color={theadFntColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data.map((enclosure) => (
                  <Tr
                    key={enclosure.enclosureId}
                    _odd={{
                      bg: stripeColor,
                    }}
                  >
                    <Td isNumeric>{enclosure.enclosureId}</Td>
                    <Td>{enclosure.enclosureName}</Td>
                    <Td>
                      {enclosure.required ? (
                        <Tag colorScheme="blue">True</Tag>
                      ) : (
                        <Tag colorScheme="orange">False</Tag>
                      )}
                    </Td>
                    <Td>
                      <Flex gap={2} wrap="wrap">
                        {enclosure.fileTypes.map((fileType) => (
                          <Tag key={fileType} colorScheme="blue">
                            {fileType.split("/")[1]}
                          </Tag>
                        ))}
                      </Flex>
                    </Td>
                    <Td>{enclosure.fileSize / 1024 / 1024} MB</Td>
                    <Td>{enclosure.type}</Td>
                    <Td>
                      <Flex gap={4}>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => handleEditEnclosure(enclosure)}
                        >
                          <HiOutlinePencil />
                        </Button>
                        <Button
                          colorScheme="pink"
                          variant="outline"
                          onClick={() => handleDeleteEnclosure(enclosure)}
                        >
                          <HiOutlineTrash />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
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
                Enclosure is empty
              </Heading>
            </Center>
            <Center>
              <Text color="slategray">
                Click on 'Add New' to add new enclosure.
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

export default Enclosures;
