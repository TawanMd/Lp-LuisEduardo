import React from 'react';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1>Soluções Criativas & Digitais</h1>
                    <p>Transformando ideias em realidade com artes profissionais, windbanners e soluções digitais completas.</p>
                    <div className="hero-buttons">
                        <a href="#contact" className="btn-primary">Fazer Orçamento</a>
                        <a href="#portfolio" className="btn-secondary">Ver Trabalhos</a>
                    </div>
                </div>
                <div className="hero-image">
                    {/* Placeholder for Luiz's photo */}
                    <div className="image-placeholder">
                        <span>Foto do Luiz</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
