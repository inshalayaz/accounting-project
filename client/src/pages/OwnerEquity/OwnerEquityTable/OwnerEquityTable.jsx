/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"


const OwnerEquityTable = ({ data }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={2}>
                            <Typography variant="h6">Deposits</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow hover>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.ownerTransactions.deposits.map((row, index) => (
                        <TableRow
                            hover
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.account_name?.toUpperCase()}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Typography color={row.amount > 0 ? 'green' : 'red'}>
                                    {row.amount > 0 ? row.amount : `(${row.amount})`}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={2}>
                            <Typography variant="h6">Withdrawals</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow hover>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.ownerTransactions.withdrawals.map((row, index) => (
                        <TableRow
                            hover
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.account_name?.toUpperCase()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                <Typography color={row.amount > 0 ? 'green' : 'red'}>
                                    {row.amount > 0 ? row.amount : `(${row.amount})`}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OwnerEquityTable