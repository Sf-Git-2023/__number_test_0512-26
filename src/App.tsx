/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState, useCallback} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {RotateCcw, Target} from 'lucide-react';

export default function App() {
  const [targetNumber, setTargetNumber] = useState<number>(() => Math.floor(Math.random() * 100) + 1);
  const [userGuess, setUserGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('請輸入 1 到 100 之間的數字');
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // 重置遊戲
  const resetGame = useCallback(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setUserGuess('');
    setMessage('遊戲已重置，請再猜一次！');
    setAttempts(0);
    setIsGameOver(false);
  }, []);

  // 處理猜測提交
  const handleGuess = () => {
    const guess = parseInt(userGuess);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('請輸入有效的 1-100 數字！');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (guess === targetNumber) {
      setMessage(`恭喜！猜對了！正確答案是 ${targetNumber}。總共猜了 ${attempts + 1} 次。`);
      setIsGameOver(true);
    } else if (guess < targetNumber) {
      setMessage('太小了！再試一次。');
    } else {
      setMessage('太大了！再試一次。');
    }
    setUserGuess('');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div
        id="game-card"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-md w-full max-w-md shadow-2xl relative z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-blue-500 w-8 h-8" />
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">量子猜數字</h1>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-slate-400 text-sm italic">目前猜測次數:</p>
          <span className="font-mono text-blue-400 text-3xl font-bold">{attempts}</span>
        </div>

        <AnimatePresence mode="wait">
          {!isGameOver ? (
            <motion.div
              key="game-active"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="space-y-4"
            >
              <input
                id="guess-input"
                type="number"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="輸入數字 (1-100)"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <button
                id="submit-guess-button"
                onClick={handleGuess}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500/50"
              >
                提交猜測
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="game-over"
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              className="space-y-4"
            >
              <button
                id="play-again-button"
                onClick={resetGame}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-slate-100 font-bold py-3 rounded-xl hover:bg-slate-700 transition"
              >
                <RotateCcw className="w-5 h-5" />
                再玩一次
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          id="feedback-message"
          className="mt-6 text-center text-lg font-medium text-slate-300"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          key={message}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}
