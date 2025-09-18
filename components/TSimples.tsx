
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { SHOT_CATEGORIES } from '../constants';

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    const formatTime = (timeInSeconds: number) => {
        const h = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="flex flex-col items-center bg-slate-800 p-4 rounded-lg shadow-lg">
            <div className="text-5xl font-mono tracking-widest text-cyan-400 mb-3">{formatTime(seconds)}</div>
            <button
                onClick={() => setIsActive(!isActive)}
                className={`px-6 py-2 rounded-md font-semibold text-white transition-transform transform hover:scale-105 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
                {isActive ? 'Parar' : 'Iniciar'}
            </button>
        </div>
    );
};

const ScoreCounter: React.FC<{ score: number, onIncrement: () => void, onDecrement: () => void, textColor: string }> = ({ score, onIncrement, onDecrement, textColor }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <button onClick={onDecrement} className="w-8 h-8 rounded-full bg-slate-600 hover:bg-red-500 text-white font-bold text-lg transition flex items-center justify-center">-</button>
            <span className={`text-xl font-bold w-10 text-center ${textColor}`}>{score}</span>
            <button onClick={onIncrement} className="w-8 h-8 rounded-full bg-slate-600 hover:bg-green-500 text-white font-bold text-lg transition flex items-center justify-center">+</button>
        </div>
    );
};

const TSimples: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    
    const { player1, setPlayer1, player2, setPlayer2 } = context;

    const handleNameChange = (player: 'player1' | 'player2', name: string) => {
        if (player === 'player1') {
            setPlayer1(p => ({ ...p, name }));
        } else {
            setPlayer2(p => ({ ...p, name }));
        }
    };

    const handleScoreChange = (player: 'player1' | 'player2', categoryLevel: string, delta: number) => {
        const setPlayer = player === 'player1' ? setPlayer1 : setPlayer2;
        setPlayer(p => {
            const currentScore = p.scores[categoryLevel] || 0;
            const newScore = Math.max(0, currentScore + delta);
            return {
                ...p,
                scores: {
                    ...p.scores,
                    [categoryLevel]: newScore,
                },
            };
        });
    };

    return (
        <div className="space-y-6">
            <Timer />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800 p-6 rounded-lg shadow-lg">
                <div>
                    <label htmlFor="player1_simple" className="block text-lg font-semibold text-cyan-400 mb-2">Jogador 1</label>
                    <input
                        type="text"
                        id="player1_simple"
                        value={player1.name}
                        onChange={(e) => handleNameChange('player1', e.target.value)}
                        className="w-full bg-slate-700 border-2 border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="player2_simple" className="block text-lg font-semibold text-pink-400 mb-2">Jogador 2</label>
                    <input
                        type="text"
                        id="player2_simple"
                        value={player2.name}
                        onChange={(e) => handleNameChange('player2', e.target.value)}
                        className="w-full bg-slate-700 border-2 border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {SHOT_CATEGORIES.map(category => (
                    <div key={category.level} className="bg-slate-800 rounded-lg shadow-lg p-4">
                        <h3 className={`text-xl font-bold mb-3 ${category.textColor}`}>{category.title}</h3>
                        <div className="grid grid-cols-2 items-start gap-4 p-2 bg-slate-700/50 rounded-lg">
                            <div className="flex flex-col items-center space-y-2">
                                <h4 className="text-lg font-semibold text-cyan-400">{player1.name}</h4>
                                <ScoreCounter 
                                    score={player1.scores[category.level] || 0} 
                                    onIncrement={() => handleScoreChange('player1', category.level, 1)}
                                    onDecrement={() => handleScoreChange('player1', category.level, -1)}
                                    textColor="text-cyan-400"
                                />
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <h4 className="text-lg font-semibold text-pink-400">{player2.name}</h4>
                                <ScoreCounter
                                    score={player2.scores[category.level] || 0}
                                    onIncrement={() => handleScoreChange('player2', category.level, 1)}
                                    onDecrement={() => handleScoreChange('player2', category.level, -1)}
                                    textColor="text-pink-400"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TSimples;