import React from 'react'
import { Box, Typography, Button, IconButton, Stack } from '@mui/material'
import { Facebook, Instagram, Telegram, Pinterest, Twitter } from '@mui/icons-material';
import '../../../scss/landing.scss'

import { useNavigate } from 'react-router'
function Landing() {
  const navigate = useNavigate()
  return (
    <Box className="landing-wr">
      <Box className="landing-section-first">
        <Box className="landing-title-container">
          <Typography className="landing-title">
            New way <br /> in editing photos
          </Typography>
        </Box>
        <Button className="landing-button" variant="contained" onClick={()=>{navigate('/editor')} }>
          <p>GET STARTED</p>
        </Button>
        <Box className="landing-tint" />
      </Box>
      <Box className="landing-section-second">
        <p>Crop your images to social media sizes!</p>
        <Stack className='social-media-stack' direction='row' sx={{position: 'relative', zIndex: 3,}}>
          <IconButton disabled >
            <Facebook color="primary" />
          </IconButton>
          <IconButton disabled >
            <Instagram color="primary" />
          </IconButton>
          <IconButton disabled >
            <Telegram color="primary" />
          </IconButton>
          <IconButton disabled >
            <Pinterest color="primary" />
          </IconButton>
          <IconButton disabled >
            <Twitter color="primary" />
          </IconButton>
        </Stack>
        <Box className="landing-tint-2" />
      </Box>
    </Box>
  )
}

export default Landing