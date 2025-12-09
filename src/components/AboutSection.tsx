import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "2015", event: "Inicio en desarrollo de software" },
  { year: "2018", event: "Especialización en IA y Machine Learning" },
  { year: "2020", event: "Fundación de Intelia" },
  { year: "2023", event: "Líder en automatización empresarial" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with geometric mask */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Geometric frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl rotate-3" />
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-2xl -rotate-3" />
              
              {/* Image placeholder with gradient */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary-foreground font-space">HO</span>
                    </div>
                    <p className="text-foreground font-medium">Horacio Ortiz</p>
                    <p className="text-muted-foreground text-sm">Consultor IA & Automatización</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-4">
              Sobre mí
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-6">
              Ingeniero con visión <span className="gradient-text">estratégica</span>
            </h2>

            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Soy Horacio Ortiz, Ingeniero en Ejecución Informática con un enfoque 
                multidisciplinario que combina tecnología, estrategia y visión empresarial.
              </p>
              <p>
                Como socio de <strong className="text-foreground">Intelia</strong>, una agencia 
                de automatización inteligente en Santiago de Chile, lidero proyectos que 
                transforman la manera en que las empresas operan.
              </p>
              <p>
                Mi especialización en inteligencia artificial y automatización me permite 
                diseñar soluciones que no solo resuelven problemas actuales, sino que 
                preparan a las organizaciones para el futuro.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
              
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 pl-8 relative"
                  >
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                    <span className="text-primary font-bold font-space">{item.year}</span>
                    <span className="text-muted-foreground">{item.event}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 p-6 gradient-border"
            >
              <p className="text-lg italic text-foreground">
                "Mi misión es llevar la inteligencia artificial a cada rincón empresarial"
              </p>
              <footer className="mt-2 text-muted-foreground text-sm">
                — Horacio Ortiz
              </footer>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
