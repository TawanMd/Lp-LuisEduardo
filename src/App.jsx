import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Hero />
            <Services />
            <Portfolio />
            <Testimonials />
            <Contact />
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Luiz Eduardo. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default App;
