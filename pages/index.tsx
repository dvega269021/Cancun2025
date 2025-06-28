
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const messages = [
  "Gracias por quedarse cuándo era más fácil irse",
  "Ustedes eligieron quedarse, y eso vale oro.",
  "No eran mi familia, pero se volvieron parte de ella.",
  "En los momentos duros, ustedes han sido luz.",
  "Gracias por no seguir grupos, sino corazones.",
  "Lo fácil era alejarse, lo valiente fue quedarse.",
  "Y ahora viene algo que no sabían 😲"
];

const finalMessage = "El viaje a México ya está totalmente pagado. Es mi manera, aunque pequeña, de agradecerles por estar, por quedarse, por seguir siendo parte de mi vida. Ahora solo queda empacar las ganas y disfrutar. ❤️✈️";

const icons = ["💛", "💎", "🧑‍🧑", "✨", "❤️", "🛡️", "🎁"];

export default function Home() {
  const [revealed, setRevealed] = useState(Array(messages.length).fill(false));
  const [finalStage, setFinalStage] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const reveal = (index: number) => {
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);

    if (index === 0 && !audioStarted && !audio) {
      const newAudio = new Audio("/mexico.mp3");
      newAudio.loop = true;
      newAudio.play().catch((e) => console.log("Audio playback blocked:", e));
      setAudio(newAudio);
      setAudioStarted(true);
    }
  };

  const reset = () => {
    setRevealed(Array(messages.length).fill(false));
    setFinalStage(false);
    
    setAudioStarted(false);
  };

  useEffect(() => {
    if (finalStage) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [finalStage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col items-center justify-center p-4 text-center">
      {!finalStage && (
        <>
          <p className="mb-2 text-sm text-gray-700">🙂 Si presionas cada cajita, te llevarás una sonrisa</p>
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-rose-700">Con cariño para ustedes</h1>
        </>
      )}

      {!finalStage ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => reveal(idx)}
              className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer flex flex-col items-center justify-center transition-all duration-500"
            >
              <div className="text-5xl mb-3">{icons[idx]}</div>
              {revealed[idx] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg font-medium text-gray-800"
                >
                  {msg}
                </motion.p>
              )}
            </motion.div>
          ))}

          {/* Última cajita especial */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-100 rounded-2xl shadow-xl p-6 cursor-pointer flex flex-col items-center justify-center transition-all duration-500"
            onClick={() => setFinalStage(true)}
          >
            <div className="text-5xl mb-3">✈️</div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-green-700"
            >
              ¿Están listos? 💼
            </motion.p>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl text-xl text-green-800 flex flex-col items-center space-y-6"
          >
            <p>{finalMessage}</p>
            <button
              onClick={reset}
              className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
            >
              🔁 Regresar
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
