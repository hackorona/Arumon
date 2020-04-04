import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MoreHoriz } from '@material-ui/icons';
import { useFormik } from 'formik';
import React from 'react';
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
  lastName: string;
  firstName: string;
  email: string;
  restaurantName: string;
}

interface Props {
  onSuccess?: () => void;
}

const ApplicationForm: React.FunctionComponent<Props> = ({ onSuccess }) => {
  const formik = useFormik<Values>({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      restaurantName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      restaurantName: Yup.string().required('Restaurant name is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      const store = new SteinStore(
        `https://api.steinhq.com/v1/storages/${process.env.REACT_APP_STEIN_ID}`,
      );

      store
        .append(
          'account',
          [
            {
              userName: `${values.lastName} ${values.firstName}`,
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
              id="lastName"
              name="lastName"
              label={touched.lastName ? errors.lastName : 'Last Name'}
              onChange={handleChange}
              value={values.lastName}
              error={touched.lastName && !!errors.lastName}
              fullWidth
            />
            <Box width={16} />
            <StyledTextField
              id="firstName"
              name="firstName"
              label={touched.firstName ? errors.firstName : 'First Name'}
              onChange={handleChange}
              value={values.firstName}
              error={touched.firstName && !!errors.firstName}
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
