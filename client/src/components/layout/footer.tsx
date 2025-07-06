export function Footer() {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Atique Ahmad</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Building the future with intelligent software solutions and data-driven insights. 
              Let's innovate together in the world of AI and technology.
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 Atique Ahmad. All rights reserved. Built with passion for innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
