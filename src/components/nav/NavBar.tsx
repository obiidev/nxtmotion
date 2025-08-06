'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const listItems = [
  { title: 'Ontdek Ons Aanbod', link: '/#Ontdek-Ons-Aanbod' },
  { title: 'Verborgen opties', link: '/#Opties' },
  { title: 'Wie zijn wij?', link: '/#Overons' },
  { title: 'Diagnose', link: '/#Diagnose' },
  { title: 'Catalogus', link: '/catalogus' },
];

export default function NavBar(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false); // Close mobile menu when clicking a link
      }
    }
  };
  
  // Add scroll event listener inside useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-black/40 backdrop-blur-sm'
    }`}>
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 py-3 md:p-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300"
      >
        <div className="flex items-center">
          <a href="/#" className="flex items-center">
            <img alt="" src="/nxtmotion-text.png" className="h-8 w-auto" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {listItems.map((item) => (
            <a
              key={item.title}
              href={item.link}
              onClick={handleAnchorClick}
              className="text-sm/6 font-semibold text-white"
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex">
          <a 
            href="/#Contact" 
            onClick={handleAnchorClick}
            className="flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold hover:opacity-95 transition-all"
          >
            <span className="bg-black w-full h-full px-4 py-1.5 rounded-[4px] text-sm transition-colors duration-300 hover:bg-transparent">
              Contact
            </span>
          </a>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <a 
            href="#Contact" 
            onClick={handleAnchorClick}
            className="flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold text-sm hover:opacity-95 transition-all"
          >
            <span className="bg-black w-full h-full px-3 py-1 rounded-[4px] text-xs transition-colors duration-300 hover:bg-transparent">
              Contact
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img alt="" src="/nxtmotion-text.png" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-300/10">
              <div className="space-y-2 py-6">
                {listItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    onClick={handleAnchorClick}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-700"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
