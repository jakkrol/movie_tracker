import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    return (
    <div className="px-3">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <motion.li className="nav-item active" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link className="nav-link fs-4" to="/main"><strong>Home</strong></Link>
                </motion.li>
                <motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link className="nav-link fs-4" to="/watchlist">Watchlist</Link>
                </motion.li>

                <motion.li className="nav-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link className="nav-link fs-4" to="/profile">Profil</Link>
                </motion.li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default Header;
