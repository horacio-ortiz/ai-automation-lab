import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Workflow, Mic, FileText } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Automatización con IA",
    description: "Transforma procesos manuales en flujos automatizados inteligentes que aprenden y mejoran continuamente.",
  },
  {
    icon: Workflow,
    title: "Workflows con n8n",
    description: "Diseño e implementación de flujos de trabajo complejos que conectan todas tus herramientas.",
  },
  {
    icon: Mic,
    title: "Agentes Conversacionales",
    description: "Chatbots y asistentes de voz potenciados por IA para atención al cliente 24/7.",
  },
  {
    icon: FileText,
    title: "Contenido Automatizado",
    description: "Generación inteligente de contenido para marketing, documentación y comunicaciones.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="gradient-border p-6 md:p-8 h-full transition-all duration-500 hover:translate-y-[-8px] cursor-pointer">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl" />
        
        <div className="relative z-10">
          <motion.div
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 5 }}
          >
            <Icon className="w-7 h-7 text-primary" />
          </motion.div>

          <h3 className="text-xl font-semibold font-space mb-3 group-hover:text-primary transition-colors">
            {service.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Animated line at bottom */}
          <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-4">
            Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-4">
            Soluciones que <span className="gradient-text">transforman</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Implemento tecnologías de vanguardia para automatizar procesos y potenciar
            el crecimiento de tu negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
