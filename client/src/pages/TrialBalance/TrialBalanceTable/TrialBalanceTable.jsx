/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"


const TrialBalanceTable = ({ trialBalanceData }) => {
    function createData(
        account_name,
        balance,
        account_type,
        is_debit
    ) {
        return {
            account_name,
            balance,
            account_type,
            is_debit
        };
    }

    const generateRows = () => {
        let entries = trialBalanceData?.trialBalanceEntries
        let rows = entries?.map((i) => {
            return (
                createData(i.account_name, i.balance, i.account_type, i.is_debit)
            )
        })
        return rows
    }


    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow hover>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Debit Balance</TableCell>
                        <TableCell>Credit Balance</TableCell>
                        <TableCell>account_type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {generateRows()?.map((row) => (
                        <TableRow
                            hover
                            key={row.account_name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.account_name?.toUpperCase()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                <Typography color={row.balance > 0 ? 'green' : 'red'}>
                                    {row.is_debit ? (row.balance > 0 ? row.balance : `(${+row.balance * -1})`) : '-'}
                                </Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Typography color={row.balance > 0 ? 'green' : 'red'}>
                                    {!row.is_debit ? (row.balance > 0 ? row.balance : `(${+row.balance * -1})`) : '-'}
                                </Typography>
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.account_type}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="center" colSpan={2}>
                            <Typography color={trialBalanceData?.transactions.debit > 0 ? 'green' : 'red'}>
                                <b>Debit: {trialBalanceData?.transactions.debit > 0 ? trialBalanceData?.transactions.debit : `(${trialBalanceData?.transactions.debit})`}</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            <Typography color={trialBalanceData?.transactions.credit > 0 ? 'green' : 'red'}>
                                <b>Credit: {trialBalanceData?.transactions.credit > 0 ? trialBalanceData?.transactions.credit : `(${trialBalanceData?.transactions.credit})`}</b>
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TrialBalanceTable