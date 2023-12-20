import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack} from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { redirect } from 'next/dist/server/api-utils';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';



const Login = ({ handleChange }) => {

    //STYLING
    const router = useRouter();
    const [Datas, setDatas] = useState([]);
    const [error,setError] = useState(false)

   
    // console.log('Data:', Datas);
    const paperStyle = { padding: 20, height: 'auto', width: 300, margin: "0 auto", marginTop:'5rem', borderRadius:'15px 15px 15px 15px' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0',backgroundColor:'#5c0931',color:'white' }
    //STATE
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const initialValues = {
        username: '',
        password: '',
        remember: false
    }
    //VALIDATION 

    //FUNCTION TO LOGIN
    const onSubmit = (values, props) => {

        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

    }
    // const router = useRouter()
    const login = async (values, props) => {
        const response = await axios.post('http://localhost:3000/api/login/login',{
            email :  values.username,
            password: values.password
        })
        console.log(response)
 
        
        if(response.data.success) {
            Cookies.set('userRole', response.data.data.role, { expires: 1 });
            console.log(response.data.data.role)
            router.replace('/Dashboard')
        } 
        else if(!response.data.success){
            console.log(response.data.success)
            setError(true)
        } 
    }

  

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                
                    <h2>Admin Login</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={login} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Stack gap="1rem">
                            <Field as={TextField} label='Username' name="username"
                            
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="username" />}
                              
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} 
                                 />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                           
                            <Button type='submit' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Log in"}  </Button>
                        </Stack>
                        </Form>
                    )}
                </Formik>
                {error?<p style={{color:"red"}}>please enter the correct credentials</p>:null}
            </Paper>
        </Grid>
    )
}

export default Login