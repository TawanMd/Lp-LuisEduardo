import React from 'react';

const Testimonials = () => {
    return (
        <section id="testimonials" className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>O que dizem nossos clientes</h2>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p>"Excelente trabalho! Os windbanners ficaram ótimos na frente da minha loja."</p>
                        <div className="client-info">
                            <strong>João Silva</strong>
                            <span>Comerciante</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p>"A Landing Page aumentou muito minhas vendas. Recomendo demais!"</p>
                        <div className="client-info">
                            <strong>Maria Oliveira</strong>
                            <span>Empreendedora</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
