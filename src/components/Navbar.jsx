import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <div className="logo">
                    <span className="logo-text">Luiz Eduardo</span>
                    <span className="logo-dot">.</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#services">Serviços</a></li>
                    <li><a href="#portfolio">Portfólio</a></li>
                    <li><a href="#testimonials">Depoimentos</a></li>
                    <li><a href="#contact" className="btn-primary">Contato</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
