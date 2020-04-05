import * as Yup from 'yup';

export interface Values {
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
export const initialValues = {
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
};

export const validationSchema = Yup.object({
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
});
