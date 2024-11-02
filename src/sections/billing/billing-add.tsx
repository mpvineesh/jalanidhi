import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import billingService from '../../services/billing';
import userService from '../../services/user';

import { User } from '../../types/user';

// ----------------------------------------------------------------------

export function BillingAddView() {

  const [month, setMonth] = useState('');
  const [reading, setReading] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<User[]>([]); 
  const [mobile, setMobile] = useState('');

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    // You should see email and password in console.
    // ..code to submit form to backend here...
    const data = {
      userId:user,
      value:reading,
      month
    }
    try {
      await billingService.createBilling(data);
      alert('Data created successfully!');
      // Optionally, fetch and update the displayed data
    } catch (error) {
      console.error('Error creating data:', error);
    }

  }


  useEffect(() => {
    // Fetch users on component mount
    const loadUsers = async () => {
      try {
        const userList = await userService.fetchUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, []);

  return (
    <DashboardContent>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2} ml={2}>
        <Typography variant="h4" flexGrow={1}>
          Add Billing
        </Typography>
        <Box alignItems="center" mt={5}>
          <Grid container spacing={3}>
            <form onSubmit={handleSubmit} >
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label="Customer"
                  onChange={(evt) => setUser(evt.target.value)}
                >
                 {users.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                        {u.name} 
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  label="Month"
                  onChange={(evt) => setMonth(evt.target.value)}
                >
                  <MenuItem value='January'>January</MenuItem>
                  <MenuItem value='February'>February</MenuItem>
                  <MenuItem value='March'>March</MenuItem>
                  <MenuItem value='April'>April</MenuItem>
                  <MenuItem value='May'>May</MenuItem>
                  <MenuItem value='June'>June</MenuItem>
                  <MenuItem value='July'>July</MenuItem>
                  <MenuItem value='August'>August</MenuItem>
                  <MenuItem value='September'>September</MenuItem>
                  <MenuItem value='October'>October</MenuItem>
                  <MenuItem value='November'>November</MenuItem>
                  <MenuItem value='December'>December</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                name="reading"
                label="Reading"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={(evt) => setReading(evt.target.value)}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </form>
          </Grid>
        </Box>
      </Box>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
