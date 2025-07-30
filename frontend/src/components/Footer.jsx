import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto shadow-sm">
      <div className="container text-center">
        <span className="fw-bold">LifeVibe</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
