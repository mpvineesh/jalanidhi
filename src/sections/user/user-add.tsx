import { useState, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import userService from '../../services/user';



// ----------------------------------------------------------------------
interface RouteParams {
  id: string;
}

export function UserAddView() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [mode, setMode] = useState('add');
  const [userId, setUserId] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [meterNo, setMeterNo] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<Partial<RouteParams>>();
  
  async function handleSubmit(event: { preventDefault: () => void; }) {
    setIsLoading(true);
    event.preventDefault();
    // You should see email and password in console.
    // ..code to submit form to backend here...
    const data = {
      name,
      houseNo,
      meterNo,
      mobile
    }
    try {
      if(mode =='add') {
        await userService.createUser(data);
      }else {
        await userService.updateUser(userId, data);
      }
      // alert('Data created successfully!');
      setIsLoading(false);
      router.push('/user');
      // Optionally, fetch and update the displayed data
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating data:', error);
    }

  }

  const getParamValue = (paramName: string): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
};

  useEffect(() => {
    if (id) {
      setMode('edit')
      setUserId(id);
      userService.fetchUserById(id).then(data => {
        console.log('userddd', data)
        setName(data.name);
        setHouseNo(data.houseNo);
        setMeterNo(data.meterNo)
        setMobile(data.mobile)
      }).catch(err => {
        console.error('Error creating data:', err);
      });
    }
  }, [id])


  return (
    <DashboardContent>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2} ml={2}>
        <Typography variant="h4" flexGrow={1}>
          Add User
        </Typography>
        <Box alignItems="center" mt={5}>
          <Grid container spacing={3}>
            <form onSubmit={handleSubmit} >
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={name}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setName(evt.target.value)}
              />
              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                value={mobile}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setMobile(evt.target.value)}
              />
              <TextField
                fullWidth
                name="houseNo"
                value={houseNo}
                label="House Number"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setHouseNo(evt.target.value)}
              />
              <TextField
                fullWidth
                name="meterNo"
                value={meterNo}
                label="Meter Number"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setMeterNo(evt.target.value)}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                loading={isLoading}
              >
                {mode == 'add' ? 'Create' :' Update'}
              </LoadingButton>
            </form>
          </Grid>
        </Box>
      </Box>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
