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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAuction } from 'apiSdk/auctions';
import { Error } from 'components/error';
import { auctionValidationSchema } from 'validationSchema/auctions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProductInterface } from 'interfaces/product';
import { MarketplaceInterface } from 'interfaces/marketplace';
import { getProducts } from 'apiSdk/products';
import { getMarketplaces } from 'apiSdk/marketplaces';
import { AuctionInterface } from 'interfaces/auction';

function AuctionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AuctionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAuction(values);
      resetForm();
      router.push('/auctions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AuctionInterface>({
    initialValues: {
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      product_id: (router.query.product_id as string) ?? null,
      marketplace_id: (router.query.marketplace_id as string) ?? null,
    },
    validationSchema: auctionValidationSchema,
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
            Create Auction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="start_time" mb="4">
            <FormLabel>Start Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
                onChange={(value: Date) => formik.setFieldValue('start_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel>End Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
                onChange={(value: Date) => formik.setFieldValue('end_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<ProductInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Product'}
            placeholder={'Select Product'}
            fetcher={getProducts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<MarketplaceInterface>
            formik={formik}
            name={'marketplace_id'}
            label={'Select Marketplace'}
            placeholder={'Select Marketplace'}
            fetcher={getMarketplaces}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'auction',
  operation: AccessOperationEnum.CREATE,
})(AuctionCreatePage);
