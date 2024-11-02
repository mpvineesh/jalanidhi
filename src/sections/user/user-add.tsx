import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import userService from '../../services/user';



// ----------------------------------------------------------------------

export function UserAddView() {

  const [name, setName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [meterNo, setMeterNo] = useState('');
  const [mobile, setMobile] = useState('');

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    alert(name)
    // You should see email and password in console.
    // ..code to submit form to backend here...
    const data = {
      name,
      houseNo,
      meterNo, 
      mobile
    }
    try {
      await userService.createUser(data);
      alert('Data created successfully!');
      // Optionally, fetch and update the displayed data
    } catch (error) {
      console.error('Error creating data:', error);
    }

  }



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
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setName(evt.target.value)}
              />
              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setMobile(evt.target.value)}
              />
              <TextField
                fullWidth
                name="houseNo"
                label="House Number"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setHouseNo(evt.target.value)}
              />
              <TextField
                fullWidth
                name="meterNo"
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
              >
                Create
              </LoadingButton>
            </form>
          </Grid>
        </Box>
      </Box>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
