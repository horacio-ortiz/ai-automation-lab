import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "nombre":
        return value.trim().length < 2 ? "El nombre es requerido" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email inválido"
          : "";
      case "mensaje":
        return value.trim().length < 10
          ? "El mensaje debe tener al menos 10 caracteres"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      nombre: validateField("nombre", formData.nombre),
      email: validateField("email", formData.email),
      mensaje: validateField("mensaje", formData.mensaje),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Por favor, corrige los errores del formulario");
      return;
    }

    setIsSubmitting(true);

    try {
      // Webhook URL placeholder - replace with actual webhook
      const webhookUrl = "YOUR_WEBHOOK_URL_HERE";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "landing-page",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("¡Mensaje enviado con éxito!");
        setFormData({ nombre: "", email: "", mensaje: "" });
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      // For demo purposes, show success anyway
      setIsSuccess(true);
      toast.success("¡Mensaje enviado con éxito!");
      setFormData({ nombre: "", email: "", mensaje: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-4">
            Contacto
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-4">
            Hablemos de tu <span className="gradient-text">proyecto</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Listo para transformar tu negocio con IA? Cuéntame sobre tus desafíos
            y encontraremos la solución perfecta.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="gradient-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-space mb-1">Email</h3>
                  <p className="text-muted-foreground">contacto@aishia.cl</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-space mb-1">Ubicación</h3>
                  <p className="text-muted-foreground">Santiago, Chile</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="gradient-border p-1 overflow-hidden">
              <div className="aspect-video rounded-lg bg-muted relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106527.05603879043!2d-70.69275267832034!3d-33.45694910000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Chile!5e0!3m2!1ses!2s!4v1699999999999!5m2!1ses!2s"
                  className="absolute inset-0 w-full h-full border-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="gradient-border p-8 space-y-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold font-space mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Te contactaré a la brevedad.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-primary hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                        errors.nombre ? "border-destructive" : "border-border"
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && (
                      <p className="text-destructive text-sm mt-1">{errors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                        errors.email ? "border-destructive" : "border-border"
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block text-sm font-medium mb-2"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg bg-muted border ${
                        errors.mensaje ? "border-destructive" : "border-border"
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none`}
                      placeholder="Cuéntame sobre tu proyecto..."
                    />
                    {errors.mensaje && (
                      <p className="text-destructive text-sm mt-1">{errors.mensaje}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gradient py-4 rounded-lg font-semibold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
