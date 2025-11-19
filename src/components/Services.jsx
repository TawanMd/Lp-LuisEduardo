import React from 'react';

const Services = () => {
    const luizServices = [
        { title: 'Artes para Empresas', icon: '🎨', desc: 'Identidade visual e materiais gráficos.' },
        { title: 'Tapetes Personalizados', icon: '🧶', desc: 'Tapetes exclusivos para seu negócio.' },
        { title: 'WindBanners', icon: '🚩', desc: 'Divulgação de alto impacto visual.' },
        { title: 'Cartão Postal', icon: '📇', desc: 'Mídia impressa para networking.' },
        { title: 'Vídeos', icon: '🎥', desc: 'Edição e produção de vídeos.' },
    ];

    const digitalServices = [
        { title: 'Landing Pages', icon: '💻', desc: 'Páginas de alta conversão.' },
        { title: 'Sites Institucionais', icon: '🌐', desc: 'Presença digital profissional.' },
        { title: 'Sistemas Web', icon: '⚙️', desc: 'Soluções sob medida para gestão.' },
        { title: 'Automações', icon: '🤖', desc: 'Otimização de processos digitais.' },
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <h2>Nossos Serviços</h2>
                    <p>Uma gama completa de soluções físicas e digitais.</p>
                </div>

                <div className="service-category">
                    <h3>Soluções Visuais & Impressos</h3>
                    <div className="services-grid">
                        {luizServices.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className="service-icon">{service.icon}</div>
                                <h4>{service.title}</h4>
                                <p>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="service-category">
                    <h3>Soluções Digitais</h3>
                    <div className="services-grid">
                        {digitalServices.map((service, index) => (
                            <div key={index} className="service-card digital">
                                <div className="service-icon">{service.icon}</div>
                                <h4>{service.title}</h4>
                                <p>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
