import Grid from '@mui/material/Unstable_Grid2';
import EntryTable from './EntryTable/EntryTable';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL, GET_ACCOUNTS, GET_JOURNAL_ENTRY } from '../../constants/endpoints';
import { Backdrop, Box, Button, Fade, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Modal } from '@mui/base';

import { style } from './style';

const JournalEntry = () => {

    const [journalEntries, setJournalEntries] = useState([])
    const [accounts, setAccounts] = useState([])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${BASE_URL}/${GET_JOURNAL_ENTRY}`);
            const data = response.data;
            setJournalEntries(data)
        })();

        (async () => {
            const response = await axios.get(`${BASE_URL}/${GET_ACCOUNTS}`)
            const data = response.data;
            setAccounts(data)
            console.log(data)
        })();
    }, [])


    return (
        <Grid container sx={{ mt: 2 }}>
            <Grid xs={12} minHeight={500} maxHeight={500}>
                <EntryTable data={journalEntries} />
            </Grid>
            <Grid xs={12}>
                <Button fullWidth sx={{ mt: 3 }} variant="contained" onClick={handleOpen}>Create Journal Entry</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Grid container>
                                <Grid xs={12}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Create Journal Entry
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                                        <InputLabel id="debit">Debit</InputLabel>
                                        <Select
                                            labelId="debit"
                                            id="debit"
                                            label="Debit"
                                        >
                                            {
                                                accounts.map(({ account_id, account_name }) => (
                                                    <MenuItem key={account_id} value={account_name}>{account_name.toUpperCase()}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid xs={6}>
                                    <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                                        <InputLabel id="entry-type">Entry Type</InputLabel>
                                        <Select
                                            labelId="entry-type"
                                            id="entry-type"
                                            label="Entry Type"
                                        >
                                            <MenuItem value={'normal'}>Normal</MenuItem>
                                            <MenuItem value={'adjustment'}>Adjustment</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid xs={6}>
                                    <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                                        <InputLabel id="debit">Credit</InputLabel>
                                        <Select
                                            labelId="debit"
                                            id="debit"
                                            label="Debit"
                                        >
                                            {
                                                accounts.map(({ account_id, account_name }) => (
                                                    <MenuItem key={account_id} value={account_name}>{account_name.toUpperCase()}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid xs={6}>
                                    <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                                        <InputLabel id="entry-type-1">Entry Type</InputLabel>
                                        <Select
                                            labelId="entry-type-1"
                                            id="entry-type-1"
                                            label="Entry Type"
                                        >
                                            <MenuItem value={'normal'}>Normal</MenuItem>
                                            <MenuItem value={'adjustment'}>Adjustment</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid xs={12}>
                                    <TextField
                                        id="filled-textarea"
                                        label="Description"
                                        placeholder="Enter Transaction Description"
                                        multiline
                                        variant="filled"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField fullWidth id="amount" label="Amount" variant="standard" />
                                </Grid>

                                <Button fullWidth sx={{ mt: 3 }} variant="contained" onClick={handleOpen}>Create</Button>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </Grid>
    )
}

export default JournalEntry