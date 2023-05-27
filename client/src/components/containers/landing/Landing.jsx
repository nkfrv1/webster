import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimate, useScroll } from 'framer-motion'
import { Box, Typography, Button, IconButton, Stack } from '@mui/material'
import { Facebook, Instagram, Telegram, Pinterest, Twitter } from '@mui/icons-material';
import '../../../scss/landing.scss'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useNavigate } from 'react-router'

function StrokeContainer({animate}) {
  const refStroke = useRef(null)
  const invStroke = useInView(refStroke, { once: true });
  useEffect(() => {
    invStroke ?
      animate("#layer2-2 path", {style: "animation: stroke 4s linear"}, {duration: 1})
      : ""
  }, [invStroke])
  return (
    <Box className="stroke-container" ref={refStroke}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2027.2 664.9">
        <defs>
        </defs>
        <g id="layer2" data-name="layer2">
          <g id="layer2-2" data-name="layer2">
            <path className="cls-1" stroke='white' d="M7.29,37.71C61.73,18.4,125.53-3.46,180.42,26.61c53.15,29.12,50.35,90.12,52.71,142.73,1.22,27.11,5,53.39,15.72,78.51,11,25.81,27.24,49,45.71,70,36.3,41.27,81.35,74.49,130,99.87,109,56.93,232.85,73.68,354.3,78.21,66.9,2.5,134,2.25,200.88.69,65.65-1.53,131.77-3.45,197.15-9.76,44.07-4.25,93.94-13.22,126.06-46.51,31.6-32.74,33.43-79.79,12.76-118.87-23-43.58-66.31-68.91-114.67-73.54-56.15-5.37-114.87,14.42-163.29,41.7-41.94,23.63-85,60.27-97.36,108.85-13.46,53,20.26,97.87,57.21,132,77.43,71.5,182,103.5,284.12,119.24a1297.33,1297.33,0,0,0,173.13,15c63.21,1.18,126.6-4.68,187-24.25,107.43-34.81,199.63-102.53,302-148.45A591.51,591.51,0,0,1,2023,462.84c7.41-2.12,4.26-13.71-3.19-11.57C1915.22,481.2,1825.21,544,1728.54,591.58c-50.43,24.85-103,44.93-158.74,54.06-61.45,10.08-124.27,8.25-186.12,3.5-102.52-7.87-208.81-23.69-300.56-72.86-44.38-23.8-89.68-56.93-117.14-99.94-14.05-22-20.56-47.54-14.41-73.29,5.64-23.63,19.91-44.22,36.74-61.34,37.76-38.41,90.48-63.56,142.44-76s111.39-9,151.28,30.53c31.75,31.46,48.73,82.09,22.93,122.35-25.11,39.19-76.52,50.5-119.66,55.4-60.78,6.9-122.67,8.3-183.78,10.07-64.5,1.87-129.09,2.3-193.61.76-119.65-2.85-242.27-14.74-352.32-65.2-49-22.46-94.89-52.09-133.37-90-40.26-39.65-71.4-87-76.12-144.5-3.85-46.87,3.24-100.24-26.55-140.39C190.14,5.11,136.92-4.68,90.67,1.87,60.86,6.09,32.36,16.11,4.1,26.14-3.12,28.7,0,40.3,7.29,37.71Z" />
          </g>
        </g>
      </svg>
    </Box>
  )
}

function Landing() {
  const refText1 = useRef(null);
  const refText2 = useRef(null);
  const refText3 = useRef(null);
  const refToTop = useRef(null);
  const refDashed = useRef(null);
  const refPresetsContainer = useRef(null)
  const invToTop = useInView(refToTop, { once: false });
  const invText = useInView(refText1, { once: true });
  const invText2 = useInView(refText2, { once: true });
  const invText3 = useInView(refText3, { once: true });
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
      ['.text-s4', {  opacity: 1 }, {duration: 2 }],
      ['.text-s4', { transform: "translate(-100%, 120px)" }, {delay: 0, duration: 0.7 }],
    ]
    invText3 ? animate(sequence) : ''
  }, [invText3])

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
      ['.social-rectangle', { width: '30%', height: '60%', opacity: 1 }, { duration: 1, delay: 1, direction: 'reverse' }],
      ['.social-rectangle', { width: '80%', height: '40%' }, { duration: 1, delay: 0.5, direction: 'reverse' }],
      ['.social-rectangle', { width: '20%', height: '80%' }, { duration: 1, delay: 0.7, direction: 'reverse' }],
      ['.social-rectangle', { width: '40%', height: '70%' }, { duration: 1, delay: 1, direction: 'reverse' }],
      ['.social-rectangle', { width: '30%', height: '80%' }, { duration: 1, delay: 0.9, direction: 'reverse' }],
      ['.social-rectangle', { width: '50%', height: '50%' }, { duration: 1, delay: 1, direction: 'reverse' }]
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

          <Box ref={refDashed} className='social-media-stack'>
            <Facebook color="primary" className='svg-class fac' />
            <Instagram color="primary" className='svg-class ins' />
            <Telegram color="primary" className='svg-class tel' />
            <Pinterest color="primary" className='svg-class pin' />
            <Twitter color="primary" className='svg-class twi' />
            {/* <Stack ref={refIcons} className='social-media-stack' direction='row' >
          </Stack> */}
          </Box>
          <Box className="social-rectangle"></Box>
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
      <Box className="landing section-fours" >
        <StrokeContainer animate={animate} />
        <Box className="shine-text" ref={refText3}>
          <p className="text-s4">Just draw!</p>
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