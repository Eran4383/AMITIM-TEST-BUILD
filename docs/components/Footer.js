import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-slate-500">
        <p>&copy; {currentYear} Amitim Activity Finder. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
};
