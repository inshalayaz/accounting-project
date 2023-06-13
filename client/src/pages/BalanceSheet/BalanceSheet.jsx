import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BalanceSheetTable from './BalanceSheetTable/BalanceSheetTable';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL, GET_BALANCE_SHEET } from '../../constants/endpoints';

const BalanceSheet = () => {

  const [balanceSheetData, setBalanceSheetData] = useState()

  useEffect(() => {
    (async () => {
      let response = await axios.get(`${BASE_URL}/${GET_BALANCE_SHEET}`)
      response = response.data

      setBalanceSheetData(response)
    })()
  }, [])

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid xs={12}>
        <Typography variant='h5' align='center'> Balance Sheet </Typography>
      </Grid>
      <Grid xs={12}>
        <BalanceSheetTable data={balanceSheetData} />
      </Grid>
      
      <Grid xs={3} sx={{mt: 3, mb: 3}}>
        <Typography variant='body2'><b>Assets: {balanceSheetData.assets}</b></Typography>
      </Grid>
      <Grid xs={3} sx={{mt: 3, mb: 3}}>
        <Typography variant='body2'><b>Liabilities: {balanceSheetData.liabilities}</b></Typography>
      </Grid>
      <Grid xs={3} sx={{mt: 3, mb: 3}}>
        <Typography variant='body2'><b>Equity: {balanceSheetData.equity}</b></Typography>
      </Grid>
      <Grid xs={3} sx={{mt: 3, mb: 3}}>
        <Typography variant='body2' color={balanceSheetData.isBalanced ? 'green' : 'red'} ><b>{balanceSheetData.isBalanced ? 'Balanced' : 'Not Balanced'}</b></Typography>
      </Grid>
    </Grid>
  )
}

export default BalanceSheet