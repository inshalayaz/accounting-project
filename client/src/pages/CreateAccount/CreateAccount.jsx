import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import accountTypes from '../../constants/accountTypes';
import { useState } from 'react';
import axios from 'axios'
import { ACCOUNTS, BASE_URL } from '../../constants/endpoints';

import { ToastContainer } from 'react-toastify';
import { showSuccessToast } from '../../utils/utils';

export default function CreateAccount() {

  const [accountType, setAccountType] = useState('')
  const [accountName, setAccountName] = useState('')

  const handleChange = setState => e => {
    setState(e.target.value)
  }

  const createAccount = async () => {

    try {
      const response = await axios.post(`${BASE_URL}${ACCOUNTS}`, { accountName, accountType }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      showSuccessToast(response.data.message)
      
    } catch (error) {
      alert('failed creating account')
    }

  }


  return (
    <Grid container sx={{ mt: 2 }}>

      <Grid xs={12} sx={{ mb: 2 }}>
        <Typography variant='h5' sx={{ textAlign: 'center' }}> Create Account </Typography>
      </Grid>

      <Grid xs={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="select-account-type">Select Account Type</InputLabel>
          <Select
            labelId="select-account-type"
            id="select-account-type"
            label="Select Account Type"
            onChange={handleChange(setAccountType)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              accountTypes.map(({ id, name, type }) => (
                <MenuItem key={id} value={type}>{name}</MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <TextField sx={{ ml: 2 }} size="small" fullWidth id="outlined-basic" label="Account Name" variant="outlined" onChange={handleChange(setAccountName)} />
      </Grid>
      <Grid xs={12}>
        <Button fullWidth sx={{ mt: 3 }} variant="contained" disabled={!accountType || !accountName} onClick={createAccount} >Create Account</Button>
      </Grid>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Grid>
  )
}
