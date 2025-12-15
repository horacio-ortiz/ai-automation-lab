import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    n8nChat?: {
      createChat: (config: {
        webhookUrl: string;
        webhookConfig?: {
          method?: string;
          headers?: Record<string, string>;
        };
        target?: string;
        mode?: string;
        chatInputKey?: string;
        chatSessionKey?: string;
        loadPreviousSession?: boolean;
        metadata?: Record<string, unknown>;
        showWelcomeScreen?: boolean;
        defaultLanguage?: string;
        initialMessages?: string[];
        i18n?: {
          [key: string]: {
            title?: string;
            subtitle?: string;
            footer?: string;
            getStarted?: string;
            inputPlaceholder?: string;
          };
        };
        enableStreaming?: boolean;
      }) => void;
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
      const styleId = "n8n-chat-custom-styles";
      let style = document.getElementById(styleId) as HTMLStyleElement;

      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
      }

      // Siempre actualizar el contenido del estilo (solo dentro del widget de chat)
      style.textContent = `
        /* =======================================================
           TEMA ESTILO CHATFLOW – OSCURO MODERNO SOLO PARA EL WIDGET
           ======================================================= */

        /* Contenedor principal del widget (card) */
        [class*="n8n-chat"][style*="display"],
        [id*="n8n-chat"][style*="display"],
        [class*="chat-widget"][style*="display"],
        [id*="chat-widget"][style*="display"] {
          background: #050816 !important;
          color: #f9fafb !important;
          border-radius: 20px !important;
          border: 1px solid rgba(148, 163, 184, 0.35) !important;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.85) !important;
          overflow: hidden !important;
        }

        /* Header del chat */
        [class*="n8n-chat"] [class*="chat-header"],
        [id*="n8n-chat"] [class*="chat-header"],
        [class*="n8n-chat"] header[class*="chat"],
        [id*="n8n-chat"] header[class*="chat"] {
          background: radial-gradient(circle at top left,rgb(238, 22, 249) 0%, #7c3aed 30%, #4f46e5 55%, #06b6d4 100%) !important;
          color: #f9fafb !important;
          padding: 1.4rem 1.6rem !important;
          border-radius: 20px 20px 0 0 !important;
          border-bottom: 1px solid rgba(15, 23, 42, 0.8) !important;
          text-shadow: 0 1px 3px rgba(15, 23, 42, 0.85) !important;
        }

        [class*="n8n-chat"] [class*="chat-header"] * {
          color: inherit !important;
        }

        /* Área de mensajes */
        [class*="n8n-chat"] [class*="chat-messages"],
        [class*="n8n-chat"] [class*="messages-container"],
        [class*="n8n-chat"] [class*="message-list"] {
          background: #020617 !important;
          color: #e5e7eb !important;
        }

        /* Mensajes del agente (burbujas oscuras) */
        [class*="n8n-chat"] [class*="message"]:not([class*="user"]) {
          background:rgb(38, 53, 83) !important;
          color: #e5e7eb !important;
          border-radius: 18px !important;
          padding: 12px 16px !important;
          margin: 8px 0 !important;
          max-width: 98% !important;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.6) !important;
        }

        [class*="n8n-chat"] [class*="message"]:not([class*="user"]) * {
          color: #e5e7eb !important;
          background: transparent !important;
        }

        /* Mensajes del usuario (burbujas de color) */
        [class*="n8n-chat"] [class*="message"][class*="user"] {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #a855f7 100%) !important;
          color: #f9fafb !important;
          border-radius: 18px !important;
          padding: 12px 18px !important;
          margin: 8px 0 !important;
          max-width: 80% !important;
          margin-left: auto !important;
          border: none !important;
          box-shadow: 0 14px 40px rgba(79, 70, 229, 0.65) !important;
        }

        [class*="n8n-chat"] [class*="message"][class*="user"] * {
          color: #f9fafb !important;
          background: transparent !important;
        }

        /* Input del chat */
        [class*="n8n-chat"] input[type="text"],
        [class*="n8n-chat"] textarea,
        [class*="n8n-chat"] .n8n-chat-input {
          background: #020617 !important;
          color: #f9fafb !important;
          border-radius: 9999px !important;
          border: 1px solid rgba(148, 163, 184, 0.6) !important;
          padding: 0.8rem 1.1rem !important;
        }

        [class*="n8n-chat"] input[type="text"]::placeholder,
        [class*="n8n-chat"] textarea::placeholder,
        [class*="n8n-chat"] .n8n-chat-input::placeholder {
          color: #64748b !important;
        }

        [class*="n8n-chat"] input[type="text"]:focus,
        [class*="n8n-chat"] textarea:focus,
        [class*="n8n-chat"] .n8n-chat-input:focus {
          outline: none !important;
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 1px rgba(79, 70, 229, 0.7) !important;
          background: #020617 !important;
        }

        /* Botón de enviar */
        [class*="n8n-chat"] button[class*="send"],
        [class*="n8n-chat"] button[type="submit"] {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #a855f7 100%) !important;
          color: #f9fafb !important;
          border-radius: 9999px !important;
          border: none !important;
          padding: 0.6rem 1rem !important;
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.7) !important;
          transition: transform 0.15s ease, box-shadow 0.15s ease !important;
        }

        [class*="n8n-chat"] button[class*="send"]:hover,
        [class*="n8n-chat"] button[type="submit"]:hover {
          transform: translateY(-1px) scale(1.03) !important;
          box-shadow: 0 14px 32px rgba(79, 70, 229, 0.8) !important;
        }

        /* Scrollbar del área de mensajes */
        [class*="n8n-chat"] .n8n-chat-messages::-webkit-scrollbar {
          width: 6px !important;
        }

        [class*="n8n-chat"] .n8n-chat-messages::-webkit-scrollbar-thumb {
          background: #4f46e5 !important;
          border-radius: 4px !important;
        }
      `;
    };

    let observer: MutationObserver | null = null;
    let styleInterval: NodeJS.Timeout | null = null;

    // Siempre inyectar estilos actualizados (incluso si el script ya está cargado)
    injectCustomStyles();

    // Solo cargar el script una vez
    if (scriptLoaded.current) {
      // Si el script ya está cargado, solo actualizar estilos periódicamente
      styleInterval = setInterval(() => {
        if (document.querySelector('[class*="chat"], [id*="chat"], iframe[src*="chat"]')) {
          injectCustomStyles();
        }
      }, 1000);
      
      return () => {
        if (styleInterval) {
          clearInterval(styleInterval);
        }
      };
    }

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
            webhookUrl: finalWebhookUrl,
            showWelcomeScreen: false,
            initialMessages: [
              '¡Hola! 👋',
              'Mi nombre es Daril. ¿Cómo puedo ayudarte hoy?'
            ],
            i18n: {
              en: {
                title: '¡Hola! 👋',
                subtitle: 'Inicia un chat. Estamos aquí para ayudarte 24/7.',
                footer: '',
                getStarted: 'Nueva Conversación',
                inputPlaceholder: 'Escribe tu pregunta..',
              },
            },
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
