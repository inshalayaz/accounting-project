import { Card, CardContent, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import {
    Link
} from "react-router-dom";

import menuItems from '../../constants/menuItems'
import './index.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Paper sx={{ width: 320 }}>

                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Financial Accounting
                        </Typography>
                    </CardContent>
                </Card>

                <MenuList>
                    {
                        menuItems.map(({ id, name, route }) => (
                            <Link to={route} key={id} className='custom-link'>
                                <MenuItem>
                                    <ListItemText inset>{name}</ListItemText>
                                </MenuItem>
                            </Link>
                        ))
                    }
                </MenuList>
            </Paper>
        </div>
    )
}

export default Sidebar