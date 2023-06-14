import { Button, Grid } from "@mui/material"
import axios from 'axios'
import { BASE_URL, CLOSE_GENERAL_ENTRIES } from "../../constants/endpoints"
import { HEADERS } from '../../constants/headers'

import { ToastContainer } from 'react-toastify';
import { showSuccessToast } from '../../utils/utils';

const CloseAccounts = () => {

    const closeAccounts = async () => {
        try {
            await axios.post(`${BASE_URL}/${CLOSE_GENERAL_ENTRIES}`, {}, HEADERS)
            showSuccessToast('Accounts Successsfully closed')
        } catch (error) {
            alert('error closing accounts')
        }
    }

    return (
        <Grid container>
            <Grid xs={12} sx={{ position: 'relative', top: '300px' }}>
                <Button fullWidth sx={{ mt: 3 }} variant="contained" onClick={closeAccounts} >Close Account</Button>
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

export default CloseAccounts