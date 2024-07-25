import React from "react";
import "./stylesheets/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <ul className="footer-links">
          <li><a href="/about" className="footer-link">Über das Projekt</a></li>
          <li><a href="/instructions" className="footer-link">Wie funktioniert es?</a></li>
        </ul>
      </nav>
    </footer>
  );
}

