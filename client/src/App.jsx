import Grid from '@mui/material/Unstable_Grid2/Grid2'
import './App.css'
import { Container } from '@mui/material'
import Sidebar from './components/sidebar/Sidebar'

import {
  Route,
  Routes,
} from "react-router-dom";

import ViewAccounts from './pages/viewAccount/ViewAccounts'
import CreateAccount from './pages/createAccount/CreateAccount';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  return (
   
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Sidebar />
          </Grid>

          <Grid xs={9}>

            <Routes>
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/view-accounts' element={<ViewAccounts />} />
              <Route path='/' element={<Dashboard />} />
            </Routes>

          </Grid>

        </Grid>
        </Container>
  )
}

export default App
