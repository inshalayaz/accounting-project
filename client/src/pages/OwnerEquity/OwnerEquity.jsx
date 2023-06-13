import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL, GET_OWNER_EQUITY  } from '../../constants/endpoints';
import OwnerEquityTable from './OwnerEquityTable/OwnerEquityTable';

const OwnerEquity = () => {
  
    const [ownerEquity, setOwnerEquity] = useState()

    useEffect(() => {
      (async () => {
        let response = await axios.get(`${BASE_URL}/${GET_OWNER_EQUITY}`)
        response = response.data
        setOwnerEquity(response)
      })()
    }, [])
  
    return (
      <Grid container sx={{ mt: 3 }}>
        <Grid xs={12}>
          <Typography variant='h5' align='center'> Owner Equity </Typography>
        </Grid>
        <Grid xs={12}>
          <OwnerEquityTable data={ownerEquity} />
        </Grid>
        
        <Grid xs={3} sx={{mt: 3, mb: 3}}>
          <Typography variant='body2'><b>Net Income: {ownerEquity?.netIncome}</b></Typography>
        </Grid>
        <Grid xs={3} sx={{mt: 3, mb: 3}}>
          <Typography variant='body2'><b>Owner Equity: {ownerEquity?.ownerEquity}</b></Typography>
        </Grid>
        <Grid xs={3} sx={{mt: 3, mb: 3}}>
          <Typography variant='body2'><b>New Owner Equity: {ownerEquity?.newOwnerEquity}</b></Typography>
        </Grid>
      </Grid>
    )
}

export default OwnerEquity