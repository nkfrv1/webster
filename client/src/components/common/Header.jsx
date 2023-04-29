import React from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { LoginSharp, LogoutSharp } from '@mui/icons-material';
function Header() {
  return (
    <AppBar
      className="appbar-wr"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ dipslay: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Webster the creator
        </Typography>
        <Box className="appbar-nav-btn">
          Login
          <IconButton>
            <LoginSharp />
          </IconButton>
          Sign Up
          <IconButton>
            <LogoutSharp />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header