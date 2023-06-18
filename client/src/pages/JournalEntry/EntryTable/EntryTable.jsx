/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

const EntryTable = ({ data }) => {


  function createData(
    date,
    debitAccount,
    debitAmount,
    creditAccount,
    creditAmount,
    description,
    entryType
  ) {
    return {
      date,
      debitAccount,
      debitAmount,
      creditAccount,
      creditAmount,
      description,
      entryType
    };
  }

  const generateRows = () => {
    let rows = data.map((i) => {
      return (
        createData(i.date, i.debit.Account.account_name, i.debit.amount, i.credit.Account.account_name, i.credit.amount, i.credit.description, i.credit.entry_type)
      )
    })
    return rows
  }


  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650, maxheight: 600, overflowY: 'scroll', overflowX: 'hidden' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center" colSpan={2}>
              Debit
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Credit
            </TableCell>
            <TableCell colSpan={4}></TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Date</TableCell>

            <TableCell>Account</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>

            <TableCell>Account</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>

            <TableCell align="left">Entry Type</TableCell>
            <TableCell align="left">Description</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {generateRows().map((row, index) => (
            <TableRow
              hover
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date.slice(0, 10)}
              </TableCell>
              <TableCell>{row.debitAccount.toUpperCase()}</TableCell>
              <TableCell component="th" scope="row">
                <Typography color={row.debitAmount > 0 ? 'green' : 'red'}>
                  {row.debitAmount > 0 ? row.debitAmount : `(${+row.debitAmount * -1})`}
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>{row.creditAccount.toUpperCase()}</TableCell>
              <TableCell component="th" scope="row">
                <Typography color={row.creditAmount > 0 ? 'green' : 'red'}>
                  {row.creditAmount > 0 ? row.creditAmount : `(${+row.creditAmount * -1})`}
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell align='left'>{row.entryType}</TableCell>
              <TableCell align='left'>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default EntryTable