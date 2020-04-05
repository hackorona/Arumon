import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MoreHoriz } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useState } from 'react';
import SteinStore from 'stein-js-client';
import styled from 'styled-components';
import { initialValues, validationSchema } from './ApplicationFormSchema';

interface Props {
  onSuccess?: () => void;
}

const ApplicationForm: React.FunctionComponent<Props> = ({ onSuccess }) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.get(
            `https://${process.env.REACT_APP_LAMBDA_ENDPOINT}/Prod/domain-checker/?storeId=${values.storeId}`,
          );
          if (response.data.message !== 'Not Found') {
            setShowAlert(true);
            return;
          }
          const store = new SteinStore(
            `https://api.steinhq.com/v1/storages/${process.env.REACT_APP_STEIN_ID}`,
          );

          const {
            firstName,
            lastName,
            email: emailAddress,
            restaurantName: storeName,
            zipCode,
            ...rest
          } = values;
          store
            .append(
              'account',
              [
                {
                  userName: `${firstName} ${lastName}`,
                  emailAddress,
                  storeName,
                  zipCode: `${zipCode.slice(0, 3)}-${zipCode.slice(-4)}`,
                  ...rest,
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
              onSuccess();
            });
        } catch (e) {
          console.log({ e });
        } finally {
          setSubmitting(false);
        }
        return;
      }}
    >
      {(formikProps) => (
        <Form>
          {showAlert && (
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              This Store Id is already used.
            </Alert>
          )}
          <Box display="flex" justifyContent="center">
            <Box width="50%" minWidth="300px" marginTop="8px">
              <FormikTextField id="storeId" label="Store Id" />
              <FormikTextField id="email" label="Email" type="email" />
              <Box display="flex" flexDirection="row">
                <FormikTextField id="firstName" label="First Name" />
                <Box width={16} />
                <FormikTextField id="lastName" label="Last Name" />
              </Box>
              <FormikTextField id="restaurantName" label="Restaurant Name" />
              <FormikTextField id="zipCode" label="Zip Code" />
              <Box display="flex" flexDirection="row">
                <FormikTextField id="state" label="State" />
                <Box width={16} />
                <FormikTextField id="city" label="City" />
              </Box>
              <FormikTextField id="street" label="Street" />
              <FormikTextField id="building" label="Building (Optional)" />

              <Box marginY="8px">
                <StyledButton
                  type="submit"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  fullWidth
                >
                  {formikProps.isSubmitting ? <MoreHoriz /> : 'Submit'}
                </StyledButton>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

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

interface TextProps {
  id: string;
  label: string;
  type?: string;
}

const FormikTextField: React.FunctionComponent<TextProps> = ({
  id: key,
  label,
  type,
}) => {
  const { values, errors, touched, handleChange } = useFormikContext();
  return (
    <StyledTextField
      id={key}
      name={key}
      label={(touched[key] && errors[key]) || label}
      type={type || 'text'}
      onChange={handleChange}
      value={values[key]}
      error={touched[key] && !!errors[key]}
      fullWidth
    />
  );
};

export default ApplicationForm;
