import { Container, Typography } from '@material-ui/core';
import React from 'react';

const AcceptApplication: React.FunctionComponent = () => {
  return (
    <Container maxWidth="md" component="main">
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Thanks for your application.
      </Typography>
      <Typography
        component="p"
        variant="h6"
        align="center"
        color="textSecondary"
      >
        We will send an email after the registration. Please contact us if you
        don't get the email in 3 working days.
      </Typography>
    </Container>
  );
};

export default AcceptApplication;
