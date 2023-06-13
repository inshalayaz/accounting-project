import Grid from '@mui/material/Unstable_Grid2';
import AccountsTable from './AccountsTable/AccountsTable';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL, GET_ACCOUNTS } from '../../constants/endpoints';

export default function ViewAccounts() {

  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/${GET_ACCOUNTS}`);
      const data = response.data; // Extract the data property from the response
      setAccounts(data);
    })();
    return;
  }, []);
  

  return (
    <Grid container>
      <Grid xs={12}>
        <AccountsTable data={accounts} />
      </Grid>
    </Grid>
  )
}

