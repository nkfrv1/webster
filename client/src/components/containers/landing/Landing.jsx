import React, { useRef, useEffect } from 'react'
import { motion, useInView, useAnimate } from 'framer-motion'

import { Box, Typography, Button, IconButton, Stack } from '@mui/material'
import { Facebook, Instagram, Telegram, Pinterest, Twitter } from '@mui/icons-material';
import '../../../scss/landing.scss'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useNavigate } from 'react-router'

function Landing() {
  const refText1 = useRef(null);
  const refIcons = useRef(null);
  const refText2 = useRef(null);
  const refToTop = useRef(null);
  const refDashed = useRef(null);
  const refPresetsContainer = useRef(null)
  const invToTop = useInView(refToTop, { once: false });
  const invText = useInView(refText1, { once: true });
  const invText2 = useInView(refText2, { once: true });
  const invicons = useInView(refIcons, { once: true });
  const invDashed = useInView(refDashed, { once: true })
  const [scope, animate] = useAnimate()
  const navigate = useNavigate()
  useEffect(() => {
    const duration = 0.24;
    const sequence = [
      ['.fac', { scale: invDashed ? 1 : 0, opacity: invDashed ? 1 : 0 }, { duration }],
      ['.ins', { scale: invDashed ? 1 : 0, opacity: invDashed ? 1 : 0 }, { duration, delay: 0.02 }],
      ['.tel', { scale: invDashed ? 1 : 0, opacity: invDashed ? 1 : 0 }, { duration, delay: 0.01 }],
      ['.pin', { scale: invDashed ? 1 : 0, opacity: invDashed ? 1 : 0 }, { duration, delay: 0.005 }],
      ['.twi', { scale: invDashed ? 1 : 0, opacity: invDashed ? 1 : 0 }, { duration, delay: 0.001 }],

    ]

    animate(".landing-button", { transform: 'translateY(0)', opacity: 1 }, { duration: 1.3 })
    animate(sequence);
  }, [invDashed])
  useEffect(() => {
    invToTop === false ? animate(".toTop", { opacity: 1, transform: 'translateY(0)' }, { duration: 0.5 }) : animate(".toTop", { opacity: 0, transform: 'translateY(400px)' }, { duration: 1 })
  }, [invToTop])
  useEffect(() => {
    const sequence = [
      ['.text-s3', { transform: "translateY(0)", opacity: invText2 ? 1 : 0 }, { duration: 0.7 }],
      ['.presets-container', { transform: "translateX(0)" }, { duration: 0.6 }],
      ['.presets-slider img', { opacity: 1 }, { duration: 0.6 }],
      ['.btn-test-it-wr', { opacity: invText2 ? 1 : 0 }, { duration: 0.7 }],
    ]
    invText2 ? animate(sequence) : ''
  }, [invText2])
  useEffect(() => {
    const sequence = [
      ['.social-rectangle', { width: '30%', height: '60%' }, { duration: 4 }],
      ['.social-rectangle', { width: '80%', height: '20%' }, { duration: 4 }],
      ['.social-rectangle', { width: '20%', height: '80%' }, { duration: 4 }],
      ['.social-rectangle', { width: '80%', height: '20%' }, { duration: 4 }],
      ['.social-rectangle', { width: '30%', height: '60%' }, { duration: 4 }],
      ['.social-rectangle', { width: '50%', height: '50%' }, { duration: 4 }]
    ];
    animate(sequence, { repeat: Infinity, repeatType: 'reverse' });
  }, [invDashed])
  return (
    <Box className="landing-wr" ref={scope} >
      <Box className="landing section-first" ref={refToTop} id="top-element">
        <Box className="landing-title-container">
          <Typography className="landing-title">
            New way <br /> in editing photos
          </Typography>
        </Box>
        <Button className="landing-button" variant="contained" onClick={() => { navigate('/editor') }}>
          <p>GET STARTED</p>
        </Button>
        <Box className="landing-tint" />
      </Box>
      <Box className="landing section-second">
        <Box className="text-container">
          <p ref={refText1} style={{
            transform: invText ? "none" : "translateX(-600px)",
            opacity: invText ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}>Crop your images to social media sizes!</p>
        </Box>
        <Box className="social-section">

          <Box ref={refDashed} className="social-rectangle">
            <Facebook color="primary" className='svg-class fac' />
            <Instagram color="primary" className='svg-class ins' />
            <Telegram color="primary" className='svg-class tel' />
            <Pinterest color="primary" className='svg-class pin' />
            <Twitter color="primary" className='svg-class twi' />
            {/* <Stack ref={refIcons} className='social-media-stack' direction='row' >
          </Stack> */}
          </Box>
        </Box>
        <Box className="landing-tint-2" />
      </Box>
      <Box className="landing section-third">
        <p ref={refText2} className="text-s3">Apply different filters!</p>
        <Box ref={refPresetsContainer} className="presets-container">
          <Box className="presets-slider">
            <img src={'kira_carousel.png'} id="carousel-img-1" />
            <img src={'kira_carousel.png'} id="carousel-img-2" />
          </Box>
        </Box>
        <Box className="btn-test-it-wr" >
          <Button ref={refText2} className="btn-test-it" onClick={() => { navigate('/editor') }}>Test it yourself</Button>
        </Box>

      </Box>
      <Box className="toTop" >
        <a href='#top-element'>
          <IconButton >
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
        </a>
      </Box>
    </Box>
  )
}

export default Landing