import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MoreHoriz } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import SteinStore from 'stein-js-client';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledTextField = styled(TextField)`
  margin-bottom: 8px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

interface Values {
  storeId: string;
  lastName: string;
  firstName: string;
  email: string;
  restaurantName: string;
  zipCode: string;
  state: string;
  city: string;
  street: string;
  building: string;
}

interface Props {
  onSuccess?: () => void;
}

const ApplicationForm: React.FunctionComponent<Props> = ({ onSuccess }) => {
  useEffect(() => {
    fetch(`http://localhost:3000/domain-checker`).then((res) =>
      console.log({ res }),
    );
  }, []);
  const formik = useFormik<Values>({
    initialValues: {
      storeId: '',
      lastName: '',
      firstName: '',
      email: '',
      restaurantName: '',
      zipCode: '',
      state: '',
      city: '',
      street: '',
      building: '',
    },
    validationSchema: Yup.object({
      storeId: Yup.string().required('Store Id is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      restaurantName: Yup.string().required('Restaurant name is required'),
      zipCode: Yup.string()
        .length(7, 'Zip Code must be 7 digits')
        .required('Zip Code is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      street: Yup.string().required('Street name is required'),
      building: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const res = await fetch(`https://${values.storeId}.myshopify.com/.com/`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
          'access-control-allow-origin': '*',
          'Content-Type': 'html/text',
        },
      });
      console.log({ ...values, ...res });
      console.log(res?.text());
      return;

      const store = new SteinStore(
        `https://api.steinhq.com/v1/storages/${process.env.REACT_APP_STEIN_ID}`,
      );

      store
        .append(
          'account',
          [
            {
              storeId: values.storeId,
              userName: `${values.firstName} ${values.lastName}`,
              emailAddress: values.email,
              storeName: values.restaurantName,
            },
          ],
          {
            authentication: {
              username: process.env.REACT_APP_STEIN_USERNAME,
              password: process.env.REACT_APP_STEIN_PASSWORD,
            },
          },
        )
        .then((_res) => {
          setSubmitting(false);
          onSuccess();
        });
    },
  });

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="center">
        <Box width="50%" minWidth="300px" marginTop="8px">
          <StyledTextField
            id="storeId"
            name="storeId"
            label={touched.storeId ? errors.storeId : 'Store Id'}
            onChange={handleChange}
            value={values.storeId}
            error={touched.storeId && !!errors.storeId}
            fullWidth
          />

          <StyledTextField
            id="email"
            name="email"
            label={touched.email ? errors.email : 'Email'}
            type="email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && !!errors.email}
            fullWidth
          />

          <Box display="flex" flexDirection="row">
            <StyledTextField
              id="firstName"
              name="firstName"
              label={touched.firstName ? errors.firstName : 'First Name'}
              onChange={handleChange}
              value={values.firstName}
              error={touched.firstName && !!errors.firstName}
              fullWidth
            />
            <Box width={16} />
            <StyledTextField
              id="lastName"
              name="lastName"
              label={touched.lastName ? errors.lastName : 'Last Name'}
              onChange={handleChange}
              value={values.lastName}
              error={touched.lastName && !!errors.lastName}
              fullWidth
            />
          </Box>

          <StyledTextField
            id="restaurantName"
            name="restaurantName"
            label={
              touched.restaurantName ? errors.restaurantName : 'Restaurant Name'
            }
            onChange={handleChange}
            value={values.restaurantName}
            error={touched.restaurantName && !!errors.restaurantName}
            fullWidth
          />

          <StyledTextField
            id="zipCode"
            name="zipCode"
            label={touched.zipCode ? errors.zipCode : 'Zip Code'}
            onChange={handleChange}
            value={values.zipCode}
            error={touched.zipCode && !!errors.zipCode}
            fullWidth
          />

          <Box display="flex" flexDirection="row">
            <StyledTextField
              id="state"
              name="state"
              label={touched.state ? errors.state : 'State'}
              onChange={handleChange}
              value={values.state}
              error={touched.state && !!errors.state}
              fullWidth
            />
            <Box width={16} />
            <StyledTextField
              id="city"
              name="city"
              label={touched.city ? errors.city : 'City'}
              onChange={handleChange}
              value={values.city}
              error={touched.city && !!errors.city}
              fullWidth
            />
          </Box>

          <StyledTextField
            id="street"
            name="street"
            label={touched.street ? errors.street : 'Street'}
            onChange={handleChange}
            value={values.street}
            error={touched.street && !!errors.street}
            fullWidth
          />

          <StyledTextField
            id="building"
            name="building"
            label={touched.building ? errors.building : 'Building'}
            onChange={handleChange}
            value={values.building}
            error={touched.building && !!errors.building}
            fullWidth
          />

          <Box marginY="8px">
            <StyledButton
              type="submit"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? <MoreHoriz /> : 'Submit'}
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default ApplicationForm;
