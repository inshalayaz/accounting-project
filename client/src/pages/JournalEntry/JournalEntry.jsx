import Grid from '@mui/material/Unstable_Grid2';
import EntryTable from './EntryTable/EntryTable';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BASE_URL, GET_ACCOUNTS, GET_JOURNAL_ENTRY, JOURNAL_ENTRY } from '../../constants/endpoints';
import { Backdrop, Box, Button, Fade, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Modal } from '@mui/base';

import { style } from './style';
import { HEADERS } from '../../constants/headers';
import { ToastContainer } from 'react-toastify';
import { showSuccessToast } from '../../utils/utils';

const JournalEntry = () => {

    const [journalEntries, setJournalEntries] = useState([])
    const [accounts, setAccounts] = useState([])
    const [debitEntry, setDebitEntry] = useState()
    const [creditEntry, setCreditEntry] = useState()
    const [creditEntryType, setCreditEntryType] = useState()
    const [debitEntryType, setDebitEntryType] = useState()
    const [description, setDescription] = useState()
    const [amount, setAmount] = useState()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getEntries = async () => {
        const response = await axios.get(`${BASE_URL}/${GET_JOURNAL_ENTRY}`);
        const data = response.data;
        setJournalEntries(data)
    }

    const createEntry = async () => {
        const entry = {
            description,
            debit: [],
            credit: []
        }

        let debitEntryObj = {
            entry_type: debitEntryType,
            transaction_type: 'Debit',
            amount,
            account_id: debitEntry
        }

        let creditEntryObj = {
            entry_type: creditEntryType,
            transaction_type: 'Credit',
            amount,
            account_id: creditEntry
        }

        entry.debit.push(debitEntryObj)
        entry.credit.push(creditEntryObj)

        try {
            await axios.post(`${BASE_URL}/${JOURNAL_ENTRY}`, entry, HEADERS)
            
            getEntries()
    
            handleClose()
    
            showSuccessToast('Journal Entry Created')
        } catch (error) {
            alert(error.message)
        }


    }

    useEffect(() => {

        getEntries();

        (async () => {
            const response = await axios.get(`${BASE_URL}/${GET_ACCOUNTS}`)
            const data = response.data;
            setAccounts(data)
        })();
    }, [])


    return (
        <Grid container sx={{ mt: 3 }}>
        <Grid xs={12}>
            <Typography variant='h5' textAlign='center' marginBottom={4}>Journal Journal</Typography>
        </Grid>
            <Grid xs={12} minHeight={500} maxHeight={550} overflow='scroll'>
                <EntryTable data={journalEntries} />
            </Grid>
            <Grid xs={12}>
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
                                            onChange={(e) => setDebitEntry(e.target.value)}
                                        >
                                            {
                                                accounts.map(({ account_id, account_name }) => (
                                                    <MenuItem key={account_id} value={account_id}>{account_name.toUpperCase()}</MenuItem>
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
                                            onChange={(e) => setDebitEntryType(e.target.value)}
                                        >
                                            <MenuItem value={'normal'}>Normal</MenuItem>
                                            <MenuItem value={'adjustment'}>Adjustment</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid xs={6}>
                                    <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                                        <InputLabel id="credit">Credit</InputLabel>
                                        <Select
                                            labelId="credit"
                                            id="credit"
                                            label="Credit"
                                            onChange={(e) => setCreditEntry(e.target.value)}
                                        >
                                            {
                                                accounts.map(({ account_id, account_name }) => (
                                                    <MenuItem key={account_id} value={account_id}>{account_name.toUpperCase()}</MenuItem>
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
                                            onChange={(e) => setCreditEntryType(e.target.value)}
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
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField fullWidth id="amount" label="Amount" variant="standard" onChange={(e) => setAmount(e.target.value)} />
                                </Grid>

                                <Button fullWidth sx={{ mt: 3 }} variant="contained" onClick={createEntry} disabled={!debitEntry || !creditEntry || !creditEntryType || !debitEntryType || !amount || !description} >Create</Button>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
                <Button fullWidth sx={{ mt: 3 }} variant="contained" onClick={handleOpen}>Create Journal Entry</Button>
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

export default JournalEntry