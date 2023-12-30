import { Stack, Typography, TextField } from '@mui/material'
import Layout from '../Layout'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import ContentTable from '../../component/ContentTable';
import SearchIcon from '@mui/icons-material/Search';
import AudioTable from '../../component/AudioTable'
export default function Dashboard(){
    return (
        <Layout>

            <Stack flexDirection={'column'} alignItems='centen' justifyContent='center' gap='2rem' 
            sx={{ 
             mt:{lg:'10rem', sm:'3rem', md:'2rem'},
             ml:{lg:'5rem', md:'15rem', sm:'1rem'},
             mb:{lg:'2rem', md:'1rem',sm:'1rem'},
             }}>
                <Stack alignItems='center' justifyContent="center"><Typography variant='h4' sx={{color:'#5c0931'}}><b>CONTENT LIST</b></Typography></Stack>
                            <Stack direction={'column'} alignItems='center' justifyContent='center'>
                <Stack flexDirection='row' justifyContent='space-between'  sx={{gap:{lg:'30rem', md:'20rem',sm:'20rem'}}} >
                    <TextField
                        color="error"
                        label="Search by name"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    {/* <Button onClick={handleOpen} sx={{width:'150px',height:'50px'}}>Add New</Button> */}
                    <Button
                        href='/content/uploadFiles'
                        style={{ background: '#5c0931', color: '#FFFFFF', width: '150px', height: '50px' }}
                    >Add New</Button></Stack></Stack>
            <AudioTable/>
            
            </Stack>
        </Layout>
    )
}