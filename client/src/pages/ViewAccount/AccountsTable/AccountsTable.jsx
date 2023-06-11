/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const AccountsTable = ({ data }) => {

    function createData(
        name,
        type,
        date
    ) {
        return { name, type, date };
    }

    const generateRows = () => {
        let rows = data.map((i) => {
            return (
                createData(i.account_name, i.account_type, i.createdAt.slice(0, 10))
            )
        })
        console.log(rows)
        return rows
    }


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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AccountsTable