import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-r from-blue-700 via-purple-800 to-pink-900 py-12 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Teaching Section */}
          <div className="text-center md:text-start">
            <h2 className="text-2xl font-bold mb-4">Teaching</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Coding Bootcamps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Online Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Mentorship Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Study Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Motivation Section */}
          <div className="text-center md:text-start">
            <h2 className="text-2xl font-bold mb-4">Motivation</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Inspirational Quotes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Career Guidance
                </a>
              </li>
            </ul>
          </div>

          {/* Devotional Section */}
          <div className="text-center md:text-start">
            <h2 className="text-2xl font-bold mb-4">Devotional</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Daily Prayers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Inspirational Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-white transition duration-300"
                >
                  Devotional Songs
                </a>
              </li>
            </ul>
          </div>

          {/* More Details Section */}
          <div className="text-center md:text-start">
            <h2 className="text-2xl font-bold mb-4">More Details</h2>
            <ul className="space-y-2">
              {["About Me", "Contact", "Blog", "Privacy Policy"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      <div className="bg-gray-900 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400">
          <div className="text-2xl font-bold text-white">
            Dev<span className="text-blue-500">Inspire</span>
          </div>
          <div className="text-sm mt-4 md:mt-0">
            &copy; 2025 Created by Shweta Bharti &#128525;. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="#"
              className="hover:text-blue-500 transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition duration-300"
              aria-label="YouTube"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
