import React from 'react';
import { TiSocialLinkedin } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa"; 


const Footer: React.FC = () => {
    return (  
        <footer className=" flex justify-around flex-wrap gap-8 items-center text-center px-4 py-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <div>
                © {new Date().getFullYear()} Michael Wanje
            </div>
            
            <div className='flex gap-8 items-center justify-center flex-wrap'>
                <a href="https://www.linkedin.com/in/michaelwanje?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' title='LinkedIn' rel="noopener noreferrer" className='hover:text-blue-500'><TiSocialLinkedin size={30} /></a>
                <a href="https://x.com/Masabamichael07?t=jA-FWPGtCnQrgeJNC1j3oA&s=09" target='_blank' title='X' rel="noopener noreferrer" className='hover:text-blue-500'><FaXTwitter size={20} /></a>
                <a href="https://wa.me/254769819264" target='_blank' title='WhatsApp' rel="noopener noreferrer" className='hover:text-blue-500'><FaWhatsapp size={20} /></a>
                <a href="mailto:m.michael.wanje@gmail.com" target='_blank' title='Email' rel="noopener noreferrer" className='hover:text-blue-500'><MdOutlineEmail size={20} /></a>
                <p className='flex gap-2 items-center'><FaPhoneAlt size={18} /> +254 769 819 264</p>
            </div>

      </footer>
    );
}
 
export default Footer;