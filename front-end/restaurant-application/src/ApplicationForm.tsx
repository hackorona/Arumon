import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

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
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
      </div>
      <div>
        <label htmlFor="restaurantName">Restaurant Name</label>
        <input
          id="restaurantName"
          name="restaurantName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.restaurantName}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
