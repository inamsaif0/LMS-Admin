import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Autocomplete } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { redirect } from 'next/dist/server/api-utils';
import axios from 'axios';
// import Select from '../component/Select';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditUser = (props) => {
    //STYLING
    const router = useRouter();
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('')
    const [level, setLevel] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [inputvalue, setInputvalue] = React.useState('')
    const [credentials,setCredentials]=React.useState({});



    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // const [Datas, setDatas] = useState([]);

    // console.log('Data:', Datas);
    const paperStyle = { padding: 20, height: 'auto', width: 400, margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0', background: '#5c0931',color:'white' }
    //STATE
    const initialValues = {
        name: '',
        email: '',
        password: '',
        level: ''
    }
    //VALIDATION 
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4, 'too Short').max(50, 'too long').required("Required"),
        email: Yup.string().required('Required'),
        password: Yup.string().min(4, 'too Short').max(50, 'too long').required("Required"),
        password: Yup.string().required("Required"),
    })
    //FUNCTION TO LOGIN

    const login = async () => {
        if (validationSchema) {
            const response = await axios.put('http://localhost:3000/api/userList', {
                studentName: name,
                studentId: email,
                password: password,
                level: level.level,
                status: true
            })
            console.log(response)
            if (response.data.success) {
                console.log(response)
                router.replace('/users/userList')
            }
            else setError(true)

        }
    }
    // useEffect(() => {
    //     fetch('http://localhost:3000/api/userList')
    //         .then((response) => response.json())
    //         .then((data) => setValue(data))
    // }, []);
    useEffect(() => {    
        getCreds();

    }, []);
        async function getCreds() {

            console.log(props.email + " Props email")
            await fetch('http://localhost:3000/api/getCredentials', {
                headers: {
                    "Content-Type": "application/json",

                },

                method: 'POST',
                body: JSON.stringify({ studentId: props.email })
            })
                .then((response) => response.json())
                .then((res) => setCredentials(res.data))
            console.log(value)
        }

    useEffect(() => {
        fetch('http://localhost:3000/api/levels')
            .then((response) => response.json())
            .then((data) => setValue(data))
        // getCreds();   

        


    }, []);


    const defaultProps = {
        options: value.data,
        getOptionLabel: (option) => option.level,
    };
    return (
        <Grid container lg='12' sm='8' md="10" shrink={false}>
            <Paper style={paperStyle}>
                <Grid align='center' item>
                    <h2 style={{ color: '#5c0931' }}>{props.title}</h2>
                </Grid>
                <Grid item>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={login}>
                        {({ props, errors, touched }) => (
                            <Form >
                                <Stack gap="1rem">

                                    <Field  autoComplete='off' as={TextField} label='Name' name="name"
                                        placeholder='Enter Name' fullWidth required value={credentials.studentName} 
                                        onChange={(e) => {
                                            setCredentials((prev) => ({
                                              ...prev,
                                              studentName: e.target.value
                                            }));
                                          }}
                                        helperText={<ErrorMessage name="name" />} >
                                        {errors.firstName && touched.firstName ? (
                                            <div>{errors.firstName}</div>
                                        ) : null}
                                    </Field>
                                    <Field autoComplete='off' as={TextField} label='Email' name="email"
                                        placeholder='Enter email' fullWidth required value={credentials.studentId} 
                                        onChange={(e) => {
                                            setCredentials((prev) => ({
                                              ...prev,
                                              studentId: e.target.value
                                            }));
                                          }}

                                        helperText={<ErrorMessage name="email" />}
                                    >{errors.firstName && touched.firstName ? (
                                        <div>{errors.firstName}</div>
                                    ) : null}</Field>

                                    <Field autoComplete='off' as={TextField} label='Password' name="password"
                                        placeholder='Enter password' type='password' fullWidth required value={credentials.password}
                                        onChange={(e) => {
                                            setCredentials((prev) => ({
                                              ...prev,
                                              password: e.target.value
                                            }));
                                          }}

                                        helperText={<ErrorMessage name="password" />} >{errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}</Field>

                                    <Field autoComplete='off' as={Autocomplete} name="level"
                                        {...defaultProps}
                                        value={level}
                                        onChange={(e) => {
                                            setCredentials((prev) => ({
                                              ...prev,
                                              studentName: e.target.value
                                            }));
                                          }}

                                        inputValue={credentials.level}
                                        onInputChange={(event, newInputValue) => {
                                            setInputvalue(newInputValue);
                                        }}
                                        id="controllable-states-demo"
                                        getOptionLabel={(option) => option && option.level}

                                        renderInput={(params) => <TextField {...params} placeholder='Level' />}
                                        fullWidth
                                    >{errors.level && touched.level ? (
                                        <div>{errors.level}</div>
                                    ) : null}</Field>
                                    <Button type='submit' color='primary' variant="contained"
                                        style={btnstyle} >Edit User</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Paper>
        </Grid >
    )

}

export default EditUser