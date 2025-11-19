import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact-content">
                    <h2>Vamos trabalhar juntos?</h2>
                    <p>Entre em contato para um orçamento sem compromisso.</p>
                    <div className="contact-buttons">
                        <a href="#" className="btn-whatsapp">
                            Chamar no WhatsApp
                        </a>
                        <a href="mailto:contato@exemplo.com" className="btn-email">
                            Enviar E-mail
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
