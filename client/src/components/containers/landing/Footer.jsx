
import { IconButton } from '@mui/material'
import React from 'react'
import '../../../scss/footer.scss'
import { EmailOutlined, GitHub, Telegram } from '@mui/icons-material'
function Footer() {
    return (
        <footer className="footer-wr">
            <div className="sections">

                <div className="section">
                    <p>Social media</p>
                    <div className="item">
                        <p>Telegram</p>
                        <IconButton onClick={() => {window.location.href = "https://t.me/DiveDesignBot"}}>
                            <Telegram />
                        </IconButton>
                    </div>
                </div>
                <div className="section">
                    <p>Contact Us</p>
                    <div className="item">
                        <p>Email</p>
                        <IconButton href='mailto:divesupport.gmail.com'>
                            <EmailOutlined />
                        </IconButton>
                    </div>
                </div>
            </div>
            <p style={{ color: 'white' }}>all rights reserved Dive 2023 ©; </p>
        </footer>
    )
}

export default Footer