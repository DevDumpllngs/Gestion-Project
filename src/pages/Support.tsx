// src/components/Support.tsx
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const Support = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([
    { sender: "bot", text: "¡Hola! Soy el asistente virtual. ¿Cómo puedo ayudarte hoy con la gestión de tus gastos?" }
  ]);
  const [typing, setTyping] = useState(false);

  const handleButtonClick = (response: string, answer: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: response }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: answer }]);
      setTyping(false);
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 1500);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-center items-center p-6 w-full h-screen bg-gray-100">
      <motion.div
        className="w-[900px] h-[650px] bg-white rounded-xl shadow-2xl p-6 flex flex-col overflow-hidden border border-gray-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Contenedor del chat */}
          <div className="w-2/3 p-6 border-r border-gray-300 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <FaRobot className="text-4xl text-blue-600" />
              <h3 className="font-bold text-2xl text-gray-700">Asistente Virtual</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 p-2" ref={chatRef}>
              {messages.map((msg, index) => (
                <motion.div 
                  key={index} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                  >
                    {msg.sender === "user" ? <FaUserCircle className="inline mr-2" /> : <FaRobot className="inline mr-2" />}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div 
                  className="text-gray-500 italic p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  Escribiendo...
                </motion.div>
              )}
            </div>
          </div>

          {/* Contenedor de las preguntas */}
          <div className="w-1/3 p-6 flex flex-col items-start">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Preguntas frecuentes</h3>
            {[
              { question: "Tengo problemas para agregar un gasto", answer: "Para agregar un gasto, ve a 'Dashboard' y haz clic en 'Agregar Gasto'. Completa los detalles y confirma." },
              { question: "Quiero ver mis reportes de gastos", answer: "Dirígete a 'Transactions' y haz clic en 'Exportar' para descargar tu reporte de gastos en Excel." },
              { question: "Tengo dudas sobre mis pagos", answer: "Puedes revisar tus pagos en la sección de 'Transactions'. Si hay algún error, contacta con soporte." },
              { question: "Quiero agregar una nueva tarjeta o cuenta", answer: "Ve a la sección 'Cards' y selecciona 'Agregar tarjeta'. Completa los datos y guarda la información." },
              { question: "¿Cómo elimino un gasto?", answer: "Para eliminar un gasto, ve a 'Transactions', busca el gasto y haz clic en el botón de eliminar." },
              { question: "¿Dónde puedo ver las tarjetas agregadas?", answer: "En la sección 'Cards' puedes ver y gestionar todas tus tarjetas." },
              { question: "¿Puedo editar un gasto después de agregarlo?", answer: "Actualmente no es posible editar un gasto, pero puedes eliminarlo y agregar uno nuevo con la información correcta." }
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleButtonClick(item.question, item.answer)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-3 shadow-md"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.question}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Texto y Redes Sociales */}
      <div className="mt-6 text-center">
        <p className="text-gray-700 text-lg mb-3">Si tienes dudas más específicas, contáctame en:</p>
        <div className="flex justify-center space-x-6">
          <FaGithub className="text-3xl text-gray-600 hover:text-black cursor-pointer transition-all duration-300" />
          <FaInstagram className="text-3xl text-gray-600 hover:text-pink-500 cursor-pointer transition-all duration-300" />
          <FaLinkedin className="text-3xl text-gray-600 hover:text-blue-700 cursor-pointer transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Support;
