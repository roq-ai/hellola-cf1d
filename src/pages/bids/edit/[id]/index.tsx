import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getBidById, updateBidById } from 'apiSdk/bids';
import { Error } from 'components/error';
import { bidValidationSchema } from 'validationSchema/bids';
import { BidInterface } from 'interfaces/bid';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AuctionInterface } from 'interfaces/auction';
import { UserInterface } from 'interfaces/user';
import { getAuctions } from 'apiSdk/auctions';
import { getUsers } from 'apiSdk/users';

function BidEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BidInterface>(
    () => (id ? `/bids/${id}` : null),
    () => getBidById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BidInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBidById(id, values);
      mutate(updated);
      resetForm();
      router.push('/bids');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BidInterface>({
    initialValues: data,
    validationSchema: bidValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Bid
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="amount" mb="4" isInvalid={!!formik.errors?.amount}>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                name="amount"
                value={formik.values?.amount}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.amount && <FormErrorMessage>{formik.errors?.amount}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<AuctionInterface>
              formik={formik}
              name={'auction_id'}
              label={'Select Auction'}
              placeholder={'Select Auction'}
              fetcher={getAuctions}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.start_time}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'bid',
  operation: AccessOperationEnum.UPDATE,
})(BidEditPage);
