import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LoginSharp, LogoutSharp } from '@mui/icons-material';
import './App.scss'
import './scss/editor.scss'
import ImageEditor from './components/containers/redactor/ImageEditor';
const drawerWidth = 180;
function App() {

  return (
    <Box sx={{height: '100%'}}>
      <AppBar className="appbar-wr"  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{dipslay: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" noWrap component="div">
            Webster the creator
          </Typography>
          <Box className="appbar-nav-btn">
            Login
            <IconButton>
              <LoginSharp />
            </IconButton>
            Sign Up
            <IconButton >
              <LogoutSharp  />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, m: '64px 0 64px 179px', height: '100%' }}>
        <ImageEditor />
      </Box>
    </Box>
  )
}

export default App
