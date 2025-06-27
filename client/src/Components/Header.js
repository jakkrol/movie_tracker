import React from "react";
import { Link } from 'react-router-dom';

function Header() {
    return (
    <div className="px-3">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/main">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Watchlist</a>
                </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default Header;