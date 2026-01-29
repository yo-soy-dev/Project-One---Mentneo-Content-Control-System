import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-700 to-sky-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 1️⃣ Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Mentneo CMS</h2>
          <p className="text-sky-200 text-sm">
            Streamlining content, one post at a time. Centralized, scalable, and easy-to-manage.
          </p>
          <div className="flex items-center space-x-3 text-sky-200 text-sm">
            <EnvelopeIcon className="w-5 h-5" />
            <span>devanshtiwari817@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3 text-sky-200 text-sm">
            <PhoneIcon className="w-5 h-5" />
            <span>+91 6386 331981</span>
          </div>
        </div>

        {/* 2️⃣ Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sky-200 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Content Guidelines</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Help Docs</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Support</a>
            </li>
          </ul>
        </div>

        {/* 3️⃣ Social / Version */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-2 text-white">
              <a href="https://x.com/soy_yo_dev40?t=ScXHQU4i0wCgiPWgRLYJjQ&s=09" 
               target="_blank" 
                rel="noopener noreferrer"
              className="hover:text-sky-300 transition">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/yo-soy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-300 transition"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/yo-soy-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-300 transition"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
          <span className="text-xs text-sky-200 italic mt-4 md:mt-0">
            © {new Date().getFullYear()} Mentneo CMS v1.0.3
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-600 mt-6 text-center py-3 text-xs text-sky-200">
        Made with ❤️ for Mentneo Internal Product | SOY-YO-DEV
      </div>
    </footer>
  );
}
