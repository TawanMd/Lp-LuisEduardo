import React from 'react';

const Portfolio = () => {
    // Placeholder data
    const items = [1, 2, 3, 4, 5, 6];

    return (
        <section id="portfolio" className="portfolio">
            <div className="container">
                <div className="section-header">
                    <h2>Portfólio</h2>
                    <p>Confira alguns dos nossos trabalhos recentes.</p>
                </div>
                <div className="portfolio-grid">
                    {items.map((item) => (
                        <div key={item} className="portfolio-item">
                            <div className="portfolio-placeholder">Trabalho {item}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
