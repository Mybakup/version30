import React from 'react';
import { MessageCircle, Instagram, Facebook, Newspaper } from 'lucide-react';

const socialLinks = [
  {
    icon: Newspaper,
    label: 'Blog',
    href: 'https://blog.mybakup.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/mybakup_fr',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://facebook.com/mybakup.fr',
  },
  {
    icon: MessageCircle,
    label: 'Tchat',
    href: 'https://chat.mybakup.com',
  }
];

export default function SocialLinks() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="grid grid-cols-4 gap-2">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-6 h-6 text-mybakup-coral" />
              <span className="text-xs font-medium text-gray-600">{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}