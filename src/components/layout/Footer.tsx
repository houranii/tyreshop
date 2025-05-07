import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h2 className="text-xl font-bold mb-4">TyreWarehouse</h2>
            <p className="text-primary-100 mb-4">
              Premium tyre retailer offering high-quality tyres for all vehicle types with professional fitting services at convenient locations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Tyres
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-100 hover:text-white transition-colors duration-200">Tyre Installation</li>
              <li className="text-primary-100 hover:text-white transition-colors duration-200">Tyre Balancing</li>
              <li className="text-primary-100 hover:text-white transition-colors duration-200">Wheel Alignment</li>
              <li className="text-primary-100 hover:text-white transition-colors duration-200">Tyre Pressure Monitoring</li>
              <li className="text-primary-100 hover:text-white transition-colors duration-200">Tyre Rotation</li>
              <li className="text-primary-100 hover:text-white transition-colors duration-200">Flat Tyre Repair</li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary-100 flex-shrink-0 mt-1" />
                <span className="text-primary-100">
                  123 Main Street, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary-100" />
                <a href="tel:+12125551234" className="text-primary-100 hover:text-white transition-colors duration-200">
                  (212) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary-100" />
                <a href="mailto:info@tyrewarehouse.com" className="text-primary-100 hover:text-white transition-colors duration-200">
                  info@tyrewarehouse.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-100 text-sm">
              &copy; {new Date().getFullYear()} TyreWarehouse. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
              <Link to="/privacy" className="text-primary-100 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-100 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-primary-100 hover:text-white transition-colors duration-200">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;