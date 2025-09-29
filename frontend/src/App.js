import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import InvoiceUpload from './components/InvoiceUpload';
import './App.css';

// Home page component
function Home() {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-3">Welcome to Pezesha Technical Test</h2>
      <p className="lead">Explore Marvel characters or upload invoice data.</p>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Navigation bar - sticky to top */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container-fluid">
            {/* Brand/Logo */}
            <Link className="navbar-brand" to="/">
              Pezesha Technical Test
            </Link>
            
            {/* Mobile menu toggle button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            {/* Navigation links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/characters">
                    Marvel Characters
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/invoice-upload">
                    Invoice Upload
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main className="main-content">
          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/invoice-upload" element={<InvoiceUpload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;