import Grid from '@mui/material/Unstable_Grid2/Grid2'
import './App.css'
import { Container } from '@mui/material'
import Sidebar from './components/sidebar/Sidebar'

import {
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from './pages/Dashboard/Dashboard';
import ViewAccounts from './pages/ViewAccount/ViewAccounts';
import CreateAccount from './pages/createAccount/CreateAccount';
import JournalEntry from './pages/JournalEntry/JournalEntry';
import TrialBalance from './pages/TrialBalance/TrialBalance';
import BalanceSheet from './pages/BalanceSheet/BalanceSheet';
import OwnerEquity from './pages/OwnerEquity/OwnerEquity';

function App() {

  return (
   
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Sidebar />
          </Grid>

          <Grid xs={9}>

            <Routes>
              <Route path='/view-accounts' element={<ViewAccounts />} />
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/journal-entries' element={<JournalEntry />} />
              <Route path='/trial-balance' element={<TrialBalance />} />
              <Route path='/balance-sheet' element={<BalanceSheet />} />
              <Route path='/owner-equity' element={<OwnerEquity />} />
              <Route path='/' element={<Dashboard />} />
            </Routes>

          </Grid>

        </Grid>
        </Container>
  )
}

export default App
