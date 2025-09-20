import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

const MotionLink = motion(Link);

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
                    <li className="nav-item">
                        <MotionLink
                        to="/main"
                        className="nav-link fs-4"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: "inline-block",
                            transformOrigin: "center",
                            willChange: "transform"
                        }}
                        >
                        <strong>Home</strong>
                        </MotionLink>
                    </li>

                    <li className="nav-item">
                        <MotionLink
                            to="/watchlist"
                            className="nav-link fs-4"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                            display: "inline-block",       
                            transformOrigin: "center",
                            willChange: "transform"
                            }}>
                            Watchlist
                        </MotionLink>
                    </li>

                    <li className="nav-item">
                    <MotionLink
                        to="/profile"
                        className="nav-link fs-4"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                        display: "inline-block",       
                        transformOrigin: "center",
                        willChange: "transform"
                        }}>
                        Profile
                    </MotionLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default Header;
