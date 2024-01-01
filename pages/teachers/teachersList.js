import { Stack, Typography, Grid,TextField } from '@mui/material'
import Layout from '../Layout'
import BasicTable from '../../component/Table';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit'
import TeacherTable from '../../component/TeacherTable';


export default function TeachersList(){
    return (
        <Layout>
            
            <Stack flexDirection={'column'} alignItems='center' justifyContent='flex-end' gap='2rem' 
            sx={{ 
             mt:{lg:'10rem', sm:'3rem', md:'2rem'},
            //  ml:{lg:'5rem', md:'15rem', sm:'1rem'},
            //  mb:{lg:'2rem', md:'1rem',sm:'1rem'},
   
             }}>
            
                <Stack alignItems='center' justifyContent="center"><Typography variant='h4' sx={{color:'#5c0931'}}><b>TEACHERS LIST</b></Typography></Stack>
              <Stack direction={'column'} alignItems='center' justifyContent='center' sx={{marginLeft:'auto'}}>

                    {/* <Button onClick={handleOpen} sx={{width:'150px',height:'50px'}}>Add New</Button> */}
                    <Button
                        href='/teachers/createTeacher'
                        style={{ background: '#5c0931', color: '#FFFFFF', width: '150px', height: '50px' }}
                    >Add New</Button></Stack>

                    <TeacherTable/>
            </Stack>
                
  
        </Layout>
    )
} 