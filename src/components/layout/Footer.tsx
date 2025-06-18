import React from 'react';

const Footer: React.FC = () => {
  console.log("Rendering Footer (minimal)");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-gray-500">
          &copy; {currentYear} FoodApp. All rights reserved.
        </p>
        {/* Add other minimal links if needed, e.g., privacy policy, terms */}
      </div>
    </footer>
  );
};

export default Footer;