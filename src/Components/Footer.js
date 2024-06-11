import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Simple Post Website. All rights reserved.</p>
            <p>
                <Link to='about'>About</Link>
            </p>
        </footer>
    );
}

export default Footer;
