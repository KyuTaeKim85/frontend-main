import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Header from './Header'; // Import Header component
import CustomerManagement from '../pages/minwon-management/CustomerManagement';
import '../App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

function Main() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemButton component={Link} to="/api/minwon-management/customer">
              <ListItemText primary="고객관리" />
          </ListItemButton>
          <ListItemButton component={Link} to="/">
              <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        searchKeyword={searchKeyword}
        handleValueChange={handleValueChange}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
            <Route path="/api/minwon-management/customer" element={<CustomerManagement searchKeyword={searchKeyword} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Main;

