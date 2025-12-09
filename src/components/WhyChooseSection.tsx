import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Settings, HeadphonesIcon, Target, Zap, Star, Users } from "lucide-react";

const features = [
  {
    icon: Settings,
    title: "Soluciones Personalizadas",
    description: "Cada proyecto es único. Diseño soluciones a medida que se adaptan perfectamente a tus necesidades.",
    size: "large",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte Continuo",
    description: "Acompañamiento permanente para asegurar el éxito de cada implementación.",
    size: "medium",
  },
  {
    icon: Target,
    title: "Estrategias Probadas",
    description: "Metodologías validadas en múltiples industrias.",
    size: "small",
  },
  {
    icon: Zap,
    title: "Implementación Ágil",
    description: "Resultados rápidos sin comprometer la calidad.",
    size: "small",
  },
];

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text font-space">
        {count}+
      </div>
      <div className="text-muted-foreground mt-2">{label}</div>
    </div>
  );
};

export const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="porque" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-4">
            ¿Por qué elegirme?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-4">
            Tu éxito es mi <span className="gradient-text">prioridad</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === "large";
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group gradient-border p-6 md:p-8 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`flex ${isLarge ? "flex-col h-full" : "flex-col"}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className={`font-semibold font-space mb-3 group-hover:text-primary transition-colors ${
                    isLarge ? "text-2xl" : "text-lg"
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`text-muted-foreground ${isLarge ? "text-lg" : ""}`}>
                    {feature.description}
                  </p>

                  {isLarge && (
                    <div className="mt-auto pt-8">
                      <div className="flex items-center gap-2 text-primary">
                        <Star className="w-5 h-5 fill-primary" />
                        <Star className="w-5 h-5 fill-primary" />
                        <Star className="w-5 h-5 fill-primary" />
                        <Star className="w-5 h-5 fill-primary" />
                        <Star className="w-5 h-5 fill-primary" />
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm">
                        Valoración promedio de clientes
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="gradient-border p-8 md:p-12 text-center mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-foreground mb-6 italic">
              "Trabajar con Horacio transformó completamente nuestra operación. 
              La automatización que implementó nos ahorra 40 horas semanales."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">MC</span>
              </div>
              <div className="text-left">
                <p className="font-medium">María Contreras</p>
                <p className="text-muted-foreground text-sm">CEO, TechStartup Chile</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <Counter target={50} label="Clientes satisfechos" />
          <Counter target={100} label="Proyectos completados" />
          <Counter target={500} label="Horas ahorradas/mes" />
          <Counter target={98} label="% de satisfacción" />
        </motion.div>
      </div>
    </section>
  );
};
