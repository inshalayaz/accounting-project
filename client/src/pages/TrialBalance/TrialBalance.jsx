import { Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, GET_TRIAL_BALANCE } from "../../constants/endpoints"
import TrialBalanceTable from "./TrialBalanceTable/TrialBalanceTable"

const TrialBalance = () => {

    const [trialBalance, setTrialBalance] = useState()


    useEffect(() => {
        (async () => {
            let response = await axios.get(`${BASE_URL}/${GET_TRIAL_BALANCE}`)
            response = response.data
            console.log(response.trialBalanceEntries)
            setTrialBalance(response)
        })()
    }, [])

    return (
        <Grid sx={{ mt: 3 }} container>
            <Grid xs={12}>
                <Typography variant="h5" align="center">Trial Balance</Typography>
            </Grid>
            <Grid xs={12} maxHeight={600} sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
                <TrialBalanceTable trialBalanceData={trialBalance} />
            </Grid>
        </Grid>
    )
}

export default TrialBalance