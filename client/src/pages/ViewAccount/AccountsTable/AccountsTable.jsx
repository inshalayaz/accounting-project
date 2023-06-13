/* eslint-disable react/prop-types */
import { Backdrop, Box, Fade, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react";
import { style } from "../../style";
import axios from "axios";
import { BASE_URL, GET_T_ACCOUNTS } from "../../../constants/endpoints";
import { HEADERS } from '../../../constants/headers'

const AccountsTable = ({ data }) => {


    const [accountDetails, setAccountDetails] = useState()

    function createData(
        name,
        type,
        date,
        accountId
    ) {
        return { name, type, date, accountId };
    }

    const generateRows = () => {
        let rows = data.map((i) => {
            return (
                createData(i.account_name, i.account_type, i.createdAt.slice(0, 10), i.account_id)
            )
        })
        return rows
    }


    const [open, setOpen] = useState(false);
    const handleOpen = (accountId) => async () => {

        let response = await axios.post(`${BASE_URL}/${GET_T_ACCOUNTS}`, { accountId }, HEADERS)
        response = response.data
        console.log(response[0].Account.account_name)
        setAccountDetails(response)

        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow hover>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Account Type</TableCell>
                        <TableCell>Creation Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {generateRows().map((row) => (
                        <TableRow
                            hover
                            key={row.name}
                            onClick={handleOpen(row.accountId)}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name.toUpperCase()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.type.toUpperCase()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


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
                        <Typography align="center">{accountDetails && accountDetails[0].Account.account_name.toUpperCase()}</Typography>
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow hover>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Debit</TableCell>
                                        <TableCell>Credit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {accountDetails?.map((row, index) => (
                                        <TableRow
                                            hover
                                            key={index}
                                            onClick={handleOpen(row.accountId)}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.transaction_date.slice(0, 10)}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {row.transaction_type === 'Debit' ? (row.amount > 0 ? row.amount : `(${+row.amount * -1})`) : '-'}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {row.transaction_type === 'Credit' ? (row.amount > 0 ? row.amount : `(${+row.amount * -1})`) : '-'}

                                            </TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </Box>
                </Fade>
            </Modal>

        </TableContainer>
    )
}

export default AccountsTable