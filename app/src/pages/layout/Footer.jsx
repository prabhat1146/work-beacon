import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-4">
          <a href="#" className="mx-2 text-gray-400 hover:text-white">Facebook</a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">Twitter</a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">LinkedIn</a>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">Instagram</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
