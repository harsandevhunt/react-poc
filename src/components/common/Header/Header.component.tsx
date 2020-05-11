import React from 'react';
import { Link } from '@reach/router';

const Header = ()=>{
    return (
        <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                <Link to="/components">Components</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Header;