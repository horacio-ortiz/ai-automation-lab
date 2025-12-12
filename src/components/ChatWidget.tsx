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
      const styleId = 'n8n-chat-custom-styles';
      let style = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
      }
      
      // Siempre actualizar el contenido del estilo (incluso si ya existe)

      style.textContent = `
        /* =======================================================
           ESTILO DEFINITIVO - BURBUJAS REDONDAS ESTILO IMESSAGE
           ======================================================= */

        /* Fondo general del chat */
        .n8n-chat-container {
          background: #0d0f17 !important;
        }

        /* ===============================
           HEADER
           =============================== */
        .n8n-chat-header {
          background: linear-gradient(135deg, #7a5cff 0%, #6bd0ff 100%) !important;
          color: white !important;
          border-radius: 14px 14px 0 0 !important;
          padding: 1.2rem !important;
          font-weight: 600 !important;
        }

        /* ===============================
           MENSAJE DEL AGENTE
           =============================== */
        .n8n-chat-message--bot .n8n-chat-message__bubble {
          background: #1a1d27 !important;
          color: #ffffff !important;
          border-radius: 22px !important;
          padding: 14px 18px !important;
          border: none !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25) !important;
          max-width: 80% !important;
        }

        .n8n-chat-message--bot .n8n-chat-message__bubble * {
          color: #ffffff !important;
        }

        /* ===============================
           MENSAJE DEL USUARIO
           =============================== */
        .n8n-chat-message--user .n8n-chat-message__bubble {
          background: linear-gradient(135deg, #7a5cff 0%, #6bd0ff 100%) !important;
          color: white !important;
          border-radius: 22px !important;
          padding: 14px 18px !important;
          border: none !important;
          max-width: 80% !important;
        }

        /* Eliminar el "doble fondo interno" */
        .n8n-chat-message--user .n8n-chat-message__bubble * {
          background: transparent !important;
          color: white !important;
        }

        /* ===============================
           INPUT
           =============================== */
        .n8n-chat-input {
          background: white !important;
          color: #000 !important;
          border-radius: 14px !important;
          border: 1px solid rgba(122,92,255,0.4) !important;
        }

        .n8n-chat-input::placeholder {
          color: #777 !important;
        }

        /* ===============================
           BOTÓN DE ENVIAR
           =============================== */
        .n8n-chat-send-button {
          background: linear-gradient(135deg, #7a5cff 0%, #6bd0ff 100%) !important;
          color: white !important;
          border-radius: 10px !important;
          transition: 0.2s ease !important;
        }

        .n8n-chat-send-button:hover {
          transform: scale(1.07) !important;
          box-shadow: 0 0 12px rgba(122,92,255,0.6) !important;
        }

        /* ===============================
           SCROLLBAR (opcional)
           =============================== */
        .n8n-chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .n8n-chat-messages::-webkit-scrollbar-thumb {
          background: #7a5cff;
          border-radius: 4px;
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
