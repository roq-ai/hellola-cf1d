import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Button,
  Link,
  IconButton,
  Flex,
  Center,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getAuctions, deleteAuctionById } from 'apiSdk/auctions';
import { AuctionInterface } from 'interfaces/auction';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { FiTrash, FiEdit2 } from 'react-icons/fi';

function AuctionListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<AuctionInterface[]>(
    () => '/auctions',
    () =>
      getAuctions({
        relations: ['product', 'marketplace', 'bid.count'],
      }),
  );
  const router = useRouter();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteAuctionById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const handleView = (id: string) => {
    if (hasAccess('auction', AccessOperationEnum.READ, AccessServiceEnum.PROJECT)) {
      router.push(`/auctions/view/${id}`);
    }
  };

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('auction', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Flex justifyContent="space-between" mb={4}>
            <Text as="h1" fontSize="2xl" fontWeight="bold">
              Auction
            </Text>
            <NextLink href={`/auctions/create`} passHref legacyBehavior>
              <Button onClick={(e) => e.stopPropagation()} colorScheme="blue" mr="4" as="a">
                Create
              </Button>
            </NextLink>
          </Flex>
        )}
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {deleteError && (
          <Box mb={4}>
            <Error error={deleteError} />{' '}
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>start_time</Th>
                  <Th>end_time</Th>
                  {hasAccess('product', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>product</Th>}
                  {hasAccess('marketplace', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>marketplace</Th>
                  )}
                  {hasAccess('bid', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>bid</Th>}
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr cursor="pointer" onClick={() => handleView(record.id)} key={record.id}>
                    <Td>{record.start_time as unknown as string}</Td>
                    <Td>{record.end_time as unknown as string}</Td>
                    {hasAccess('product', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/products/view/${record.product?.id}`}>
                          {record.product?.name}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('marketplace', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/marketplaces/view/${record.marketplace?.id}`}>
                          {record.marketplace?.name}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('bid', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.bid}</Td>
                    )}
                    <Td>
                      {hasAccess('auction', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                        <NextLink href={`/auctions/edit/${record.id}`} passHref legacyBehavior>
                          <Button
                            onClick={(e) => e.stopPropagation()}
                            mr={2}
                            as="a"
                            variant="outline"
                            colorScheme="blue"
                            leftIcon={<FiEdit2 />}
                          >
                            Edit
                          </Button>
                        </NextLink>
                      )}
                      {hasAccess('auction', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(record.id);
                          }}
                          colorScheme="red"
                          variant="outline"
                          aria-label="edit"
                          icon={<FiTrash />}
                        />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'auction',
  operation: AccessOperationEnum.READ,
})(AuctionListPage);
