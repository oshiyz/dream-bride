import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-200">Dream Bride</h3>
            <p className="text-slate-300">
              Your premier destination for elegant clothing rentals. Making your special occasions
              more memorable with our curated collection of beautiful outfits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-blue-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-slate-300 hover:text-blue-300 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-blue-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-blue-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-200">Contact Us</h3>
            <ul className="space-y-2 text-slate-300">
              <li>Email: info@dreambride.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Fashion Street, City, Country</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Dream Bride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 