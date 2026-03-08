import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const vegetables = ['🥕', '🍅', '🥦', '🍎', '🥬', '🍌', '🧅', '🥑'];

const SplashScreen = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => navigate('/login'), 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center grocery-gradient"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Basket */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <motion.div
              className="text-8xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
            >
              🧺
            </motion.div>

            {/* Dropping vegetables */}
            {vegetables.map((veg, i) => (
              <motion.span
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: '30%',
                }}
                initial={{ y: -120, opacity: 0, rotate: -30 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.5 + i * 0.2,
                  duration: 0.5,
                  type: 'spring',
                  bounce: 0.4,
                }}
              >
                {veg}
              </motion.span>
            ))}
          </div>

          <motion.h1
            className="text-3xl font-extrabold text-primary-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Smart Grocery Partner
          </motion.h1>

          <motion.p
            className="text-primary-foreground/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Shop smarter, together 🛒
          </motion.p>

          <motion.div
            className="mt-8 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-primary-foreground/60"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
