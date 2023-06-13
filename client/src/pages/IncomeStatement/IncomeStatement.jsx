import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL, GET_INCOME_STATEMENT  } from '../../constants/endpoints';
import IncomeStatementTable from './IncomeStatementTable/IncomeStatementTable';

const IncomeStatement = () => {
  
    const [incomeStatement, setIncomeStatement] = useState()

    useEffect(() => {
      (async () => {
        let response = await axios.get(`${BASE_URL}/${GET_INCOME_STATEMENT}`)
        response = response.data
        setIncomeStatement(response)
      })()
    }, [])
  
    return (
      <Grid container sx={{ mt: 3 }}>
        <Grid xs={12}>
          <Typography variant='h5' align='center'> Owner Equity </Typography>
        </Grid>
        <Grid xs={12}>
          <IncomeStatementTable data={incomeStatement} />
        </Grid>
        
        <Grid xs={3} sx={{mt: 3, mb: 3}}>
          <Typography variant='body2' color='green' ><b>Revenue: {incomeStatement?.revenue}</b></Typography>
        </Grid>
        <Grid xs={3} sx={{mt: 3, mb: 3}}>
          <Typography variant='body2' color='red'><b>Expenses: {incomeStatement?.expenses}</b></Typography>
        </Grid>
        <Grid xs={3} sx={{mt: 3, mb: 3}}>
          <Typography variant='body2' color={incomeStatement?.netIncome > 0 ? 'green' : 'red'} ><b>Net Income: {incomeStatement?.netIncome}</b></Typography>
        </Grid>
      </Grid>
    )
}

export default IncomeStatement