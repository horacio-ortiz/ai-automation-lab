import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Servicios", href: "#servicios" },
  { name: "Sobre Horacio", href: "#sobre" },
  { name: "¿Por qué elegirme?", href: "#porque" },
  { name: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    
    if (newClicks >= 5) {
      setShowEasterEgg(true);
      setLogoClicks(0);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.button
            onClick={handleLogoClick}
            className="text-2xl font-space font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            HOFlow
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => scrollToSection("#contacto")}
            className="hidden md:block btn-gradient px-6 py-2.5 rounded-full font-medium text-primary-foreground cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Habla con un experto
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("#contacto")}
                  className="btn-gradient px-6 py-3 rounded-full font-medium text-primary-foreground mt-2"
                >
                  Habla con un experto
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Easter Egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-8xl"
            >
              🤖✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA Button */}
      <motion.button
        onClick={() => scrollToSection("#contacto")}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 100 }}
        className="fixed bottom-6 right-6 z-40 btn-gradient px-4 py-3 rounded-full font-medium text-primary-foreground shadow-lg md:hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contactar
      </motion.button>
    </>
  );
};
