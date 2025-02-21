import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState , React } from "react";


const Footer = () => {

  const [mail, setMail] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const sendMail = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${BASE_URL}/api/sendMail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({mail}),
      });

      const data = await response.json();
      alert(data.message);
    }
    catch{
      alert("Error in sending mail");
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        
        {/* About Us */}
        <div className="text-center md:text-left md:w-1/4">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Hi there, 
            My name is Pranjal Mishra. I have this website just for learning purpose.
          </p>
        </div>

        {/* Newsletter */}
        <div className="text-center md:text-left md:w-1/4">
          <h1 className="text-3xl font-bold mb-4">Newsletter</h1>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe to our newsletter for updates.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
            onClick={sendMail}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="text-center md:text-left md:w-1/4">
          <h1 className="text-3xl font-bold mb-4">Feed</h1>
          <ul className="text-gray-300 text-sm">
            <li className="mb-2 hover:text-white transition duration-200">
              <a href="#">Latest Posts</a>
            </li>
            <li className="mb-2 hover:text-white transition duration-200">
              <a href="#">Popular Posts</a>
            </li>
            <li className="mb-2 hover:text-white transition duration-200">
              <a href="#">Trending Topics</a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="text-center md:text-left md:w-1/4">
          <h1 className="text-3xl font-bold mb-4">Follow Us</h1>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Facebook size={36} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Twitter size={36} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Instagram size={36} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              <Linkedin size={36} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-gray-400 text-sm">
        © 2025 Magnews. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
