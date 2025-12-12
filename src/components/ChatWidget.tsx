import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    n8nChat?: {
      createChat: (config: { webhookUrl: string }) => void;
    };
  }
}

interface ChatWidgetProps {
  webhookUrl?: string;
}

const ChatWidget = ({ webhookUrl }: ChatWidgetProps) => {
  const scriptLoaded = useRef(false);
  const stylesInjected = useRef(false);

  useEffect(() => {
    // Inyectar estilos personalizados del chat
    const injectCustomStyles = () => {
      const styleId = 'n8n-chat-custom-styles';
      let style = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
      }

      // Colores del tema
      const bgDark = 'hsl(0, 0%, 6%)';
      const bgCard = 'hsl(0, 0%, 8%)';
      const bgMuted = 'hsl(0, 0%, 15%)';
      const textPrimary = 'hsl(0, 0%, 98%)';
      const textMuted = 'hsl(0, 0%, 65%)';
      const borderColor = 'hsl(0, 0%, 20%)';
      const borderLight = 'hsla(0, 0%, 100%, 0.1)';
      const primaryPurple = 'hsl(262, 83%, 66%)';
      const secondaryBlue = 'hsl(217, 91%, 60%)';
      const gradient = `linear-gradient(135deg, ${primaryPurple} 0%, ${secondaryBlue} 100%)`;
      const radius = '0.75rem';

      style.textContent = `
        /* SOLO estilizar el contenedor del chat cuando está ABIERTO, NO el botón flotante */
        /* Contenedor del chat abierto - Fondo oscuro con efecto glass */
        [class*="n8n-chat"][style*="display: block"],
        [class*="n8n-chat"][style*="display: flex"],
        [id*="n8n-chat"][style*="display: block"],
        [id*="n8n-chat"][style*="display: flex"],
        [class*="chat-widget"][style*="display: block"],
        [class*="chat-widget"][style*="display: flex"],
        [id*="chat-widget"][style*="display: block"],
        [id*="chat-widget"][style*="display: flex"],
        [class*="chat-container"][style*="display: block"],
        [class*="chat-container"][style*="display: flex"] {
          background: ${bgCard} !important;
          border: 1px solid ${borderLight} !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-radius: ${radius} !important;
          box-shadow: 0 8px 32px hsla(0, 0%, 0%, 0.4) !important;
          color: ${textPrimary} !important;
        }

        /* Header del chat - Gradiente púrpura-azul */
        [class*="chat-header"]:not(button),
        [class*="header"]:not(button),
        header[class*="chat"]:not(button) {
          background: ${gradient} !important;
          color: ${textPrimary} !important;
          border-radius: ${radius} ${radius} 0 0 !important;
          padding: 1rem !important;
        }

        /* Área de mensajes - Fondo oscuro */
        [class*="chat-messages"]:not(button),
        [class*="messages-container"]:not(button),
        [class*="message-list"]:not(button),
        [class*="messages"]:not(button) {
          background: ${bgDark} !important;
          color: ${textPrimary} !important;
        }

        /* Mensajes del bot - Fondo oscuro con texto claro */
        [class*="bot-message"]:not(button),
        [class*="message-bot"]:not(button),
        [class*="assistant-message"]:not(button),
        [class*="message"]:not([class*="user"]):not(button) {
          background: ${bgMuted} !important;
          color: ${textPrimary} !important;
          border-radius: ${radius} !important;
          border: 1px solid ${borderColor} !important;
        }

        /* Asegurar que el texto dentro de los mensajes del bot sea visible */
        [class*="bot-message"] *:not(button),
        [class*="message-bot"] *:not(button),
        [class*="assistant-message"] *:not(button),
        [class*="message"]:not([class*="user"]) *:not(button) {
          color: ${textPrimary} !important;
        }

        /* Si el mensaje tiene fondo blanco (estilo por defecto de n8n), forzar texto oscuro */
        [class*="message"]:not([class*="user"]):not(button)[style*="background"],
        [class*="message"]:not([class*="user"]):not(button) {
          background: ${bgMuted} !important;
          color: ${textPrimary} !important;
        }

        [class*="message"]:not([class*="user"]) *:not(button) {
          color: ${textPrimary} !important;
        }

        /* Forzar texto oscuro en cualquier mensaje con fondo blanco */
        div[class*="message"]:not([class*="user"]):not(button),
        div[class*="message"]:not([class*="user"]):not(button) * {
          color: ${textPrimary} !important;
        }

        /* Mensajes del usuario */
        [class*="user-message"]:not(button),
        [class*="message-user"]:not(button),
        [class*="message"][class*="user"]:not(button) {
          background: ${gradient} !important;
          color: ${textPrimary} !important;
          border-radius: ${radius} !important;
        }

        /* Asegurar que el texto dentro de los mensajes del usuario sea visible */
        [class*="user-message"] *:not(button),
        [class*="message-user"] *:not(button),
        [class*="message"][class*="user"] *:not(button) {
          color: ${textPrimary} !important;
        }

        /* Input field - Fondo oscuro con borde */
        [class*="chat-input"]:not(button),
        input[type="text"][class*="chat"]:not(button),
        textarea[class*="chat"]:not(button) {
          background: ${bgMuted} !important;
          color: ${textPrimary} !important;
          border: 1px solid ${borderColor} !important;
          border-radius: ${radius} !important;
        }

        [class*="chat-input"]:focus:not(button),
        input[type="text"][class*="chat"]:focus:not(button),
        textarea[class*="chat"]:focus:not(button) {
          outline: none !important;
          border-color: ${primaryPurple} !important;
          box-shadow: 0 0 0 2px hsla(262, 83%, 66%, 0.2) !important;
        }

        /* Botón de envío dentro del chat - Gradiente */
        [class*="send-button"]:not([class*="toggle"]):not([class*="floating"]),
        button[type="submit"][class*="chat"]:not([class*="toggle"]):not([class*="floating"]) {
          background: ${gradient} !important;
          color: ${textPrimary} !important;
          border: none !important;
          border-radius: 0.5rem !important;
          transition: all 0.3s ease !important;
        }

        [class*="send-button"]:hover:not([class*="toggle"]):not([class*="floating"]),
        button[type="submit"][class*="chat"]:hover:not([class*="toggle"]):not([class*="floating"]) {
          transform: scale(1.05) !important;
          box-shadow: 0 0 20px hsla(262, 83%, 66%, 0.5) !important;
        }

        /* Scrollbar personalizado */
        [class*="chat-messages"]::-webkit-scrollbar,
        [class*="messages"]::-webkit-scrollbar {
          width: 8px !important;
        }

        [class*="chat-messages"]::-webkit-scrollbar-track,
        [class*="messages"]::-webkit-scrollbar-track {
          background: ${bgDark} !important;
        }

        [class*="chat-messages"]::-webkit-scrollbar-thumb,
        [class*="messages"]::-webkit-scrollbar-thumb {
          background: ${gradient} !important;
          border-radius: 4px !important;
        }

        /* Placeholder del input */
        [class*="chat-input"]::placeholder,
        input[type="text"][class*="chat"]::placeholder,
        textarea[class*="chat"]::placeholder {
          color: ${textMuted} !important;
        }

        /* Tipografía - Inter font (solo dentro del contenedor del chat) */
        [class*="n8n-chat"] *:not(button),
        [class*="chat-widget"] *:not(button),
        [id*="chat-widget"] *:not(button) {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        }

        /* Títulos y encabezados - Space Grotesk */
        [class*="chat-header"] h1:not(button),
        [class*="chat-header"] h2:not(button),
        [class*="chat-header"] h3:not(button) {
          font-family: 'Space Grotesk', sans-serif !important;
          font-weight: 600 !important;
        }

        /* Asegurar que todos los textos sean visibles (solo dentro del chat) */
        [class*="chat"] p:not(button),
        [class*="chat"] span:not(button),
        [class*="chat"] div:not(button),
        [class*="chat"] label:not(button) {
          color: ${textPrimary} !important;
        }

        /* Forzar texto visible en TODOS los mensajes del bot */
        [class*="message"]:not([class*="user"]):not(button),
        [class*="message"]:not([class*="user"]):not(button) p,
        [class*="message"]:not([class*="user"]):not(button) span,
        [class*="message"]:not([class*="user"]):not(button) div,
        [class*="message"]:not([class*="user"]):not(button) * {
          color: ${textPrimary} !important;
        }

        /* Override cualquier estilo inline que pueda estar ocultando el texto */
        [class*="message"]:not([class*="user"])[style*="color"],
        [class*="message"]:not([class*="user"]) *[style*="color"] {
          color: ${textPrimary} !important;
        }

        /* Links dentro del chat */
        [class*="chat"] a:not(button) {
          color: ${primaryPurple} !important;
        }

        [class*="chat"] a:hover:not(button) {
          color: ${secondaryBlue} !important;
        }
      `;
    };

    // Solo cargar el script una vez
    if (scriptLoaded.current) return;

    let observer: MutationObserver | null = null;
    let styleInterval: NodeJS.Timeout | null = null;

    const loadScript = async () => {
      try {
        // Inyectar estilos personalizados primero
        injectCustomStyles();

        // Cargar el módulo de chat dinámicamente
        const module = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        window.n8nChat = module;

        // Inicializar el chat con la URL del webhook
        const finalWebhookUrl = webhookUrl || import.meta.env.VITE_N8N_WEBHOOK_URL || 'YOUR_PRODUCTION_WEBHOOK_URL';

        if (window.n8nChat?.createChat) {
          window.n8nChat.createChat({
            webhookUrl: finalWebhookUrl
          });

          // Aplicar estilos después de que el chat se renderice
          setTimeout(() => {
            injectCustomStyles();
          }, 500);

          // Usar MutationObserver para detectar cuando el chat se carga
          observer = new MutationObserver(() => {
            if (document.querySelector('[class*="chat"], [id*="chat"], iframe[src*="chat"]')) {
              injectCustomStyles();
            }
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          // Aplicar estilos periódicamente para asegurar que se mantengan
          styleInterval = setInterval(() => {
            if (document.querySelector('[class*="chat"], [id*="chat"], iframe[src*="chat"]')) {
              injectCustomStyles();
            }
          }, 2000);
        }

        scriptLoaded.current = true;
      } catch (error) {
        console.error('Error loading n8n chat:', error);
      }
    };

    loadScript();

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (styleInterval) {
        clearInterval(styleInterval);
      }
    };
  }, [webhookUrl]);

  return null; // Este componente no renderiza nada visualmente
};

export default ChatWidget;
