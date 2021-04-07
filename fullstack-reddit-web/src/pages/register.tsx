import React from 'react';
import { Form, Formik } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(values, handleChange) => (
        <Form>
          <FormControl>
            <FormLabel htmlFor="username">Usename</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id="username"
              placeholder="username"
            />
            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Register;