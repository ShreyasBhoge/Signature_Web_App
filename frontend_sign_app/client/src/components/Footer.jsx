import React from "react";
import {
  Mail,
  Phone,
  Instagram,
  Github,
  Globe,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-tr from-blue-50 via-white to-blue-100 border-t border-blue-200 text-sm text-gray-700"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* 📞 Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-800">📞 Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-blue-600 transition">
              <Mail size={16} /> support@signpro.com
            </li>
            <li className="flex items-center gap-2 hover:text-blue-600 transition">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2 hover:text-blue-600 transition">
              <Globe size={16} />
              <a
                href="https://www.signpro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                www.signpro.com
              </a>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-800">🌐 Connect with us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-pink-500 transition">
              <Instagram size={16} />
              <a
                href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=ws6hnk7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 transition">
              <Send size={16} />
              <a
                href="https://t.me/Shreyas_011"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Telegram
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-gray-800 transition">
              <Github size={16} />
              <a
                href="https://github.com/signpro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* 📝 About Section */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="text-lg font-bold mb-4 text-gray-800">📝 About SignPro</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            SignPro makes document signing seamless and secure with real-time tracking,
            audit logging, and tokenized access. Whether you're remote or in-office,
            it brings the power of simplicity to your workflow. 🚀
          </p>
        </div>
      </div>

      <div className="text-center py-5 text-xs text-gray-500 border-t border-blue-200 px-4">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-700">SignPro</span>. All rights reserved by SHREYAS.
      </div>
    </footer>
  );
};

export default Footer;
