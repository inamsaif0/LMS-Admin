import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button, Typography, Stack, Autocomplete } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditTeacher = (props) => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({});
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    getCreds();
    getLevels();
  }, []);

  const getCreds = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/getTeacherCredentials', {
        email: props.email,
      });
      setCredentials(response.data.data);
    } catch (error) {
      console.error('Error fetching teacher credentials:', error);
    }
  };

  const getLevels = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/levels');
      setLevels(response.data.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put('http://localhost:3000/api/editTeacher', {
        _id: credentials._id,
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data.success) {
        console.log(response);
        router.replace('/teachers/teacherList');
      } else {
        console.error('Error updating teacher:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const initialValues = {
    name: credentials.name || '',
    email: credentials.email || '',
    password: credentials.password || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  });

  return (
    <>
      {credentials && (
        <Grid container lg="12" sm="8" md="10" shrink={false}>
          <Paper style={{ padding: 20, height: 'auto', width: 400, margin: '0 auto', marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }}>
            <Grid align="center" item>
              <h2 style={{ color: '#5c0931' }}>{props.title}</h2>
            </Grid>
            <Grid item>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={updateUser}>
                {() => (
                  <Form>
                    <Stack gap="1rem">
                      <Field
                        autoComplete="off"
                        as={TextField}
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
                        fullWidth
                        required
                        value={credentials.name}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, name: e.target.value }))}
                        helperText={<ErrorMessage name="name" />}
                      />
                      <Field
                        autoComplete="off"
                        as={TextField}
                        label="Email"
                        name="email"
                        placeholder="Enter email"
                        fullWidth
                        required
                        value={credentials.email}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                        helperText={<ErrorMessage name="email" />}
                      />
                      <Field
                        autoComplete="off"
                        as={TextField}
                        label="Password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        fullWidth
                        required
                        value={credentials.password}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                        helperText={<ErrorMessage name="password" />}
                      />
                      <Button type="submit" color="primary" variant="contained" style={{ margin: '8px 0', background: '#5c0931', color: 'white' }}>
                        Edit Teacher
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default EditTeacher;
