import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import React from 'react';
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

const ApplicationForm: React.FunctionComponent = () => {
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
    }),
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box width="50%" marginTop="8px">
        <StyledTextField
          id="email"
          name="email"
          label="Email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          fullWidth
        />

        <Box display="flex" flexDirection="row">
          <StyledTextField
            id="lastName"
            name="lastName"
            label="Last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            fullWidth
          />
          <Box width={16} />
          <StyledTextField
            id="firstName"
            name="firstName"
            label="First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            fullWidth
          />
        </Box>

        <StyledTextField
          id="restaurantName"
          name="restaurantName"
          label="Restaurant Name"
          onChange={formik.handleChange}
          value={formik.values.restaurantName}
          fullWidth
        />

        <Box marginY="8px">
          <StyledButton type="submit" color="primary" fullWidth>
            Submit
          </StyledButton>
        </Box>
      </Box>
    </form>
  );
};

export default ApplicationForm;
