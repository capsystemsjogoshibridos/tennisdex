
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { SHOT_CATEGORIES } from '../constants';
import { AppContextType } from '../types';

const Timer: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { seconds, isActive, setIsActive, setSeconds } = context;

    const handleReset = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const formatTime = (timeInSeconds: number) => {
        const h = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="flex flex-col items-center bg-slate-800 p-4 rounded-lg shadow-lg">
            <div className="text-5xl font-mono tracking-widest text-cyan-400 mb-3">{formatTime(seconds)}</div>
            <div className="flex space-x-4">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`px-6 py-2 rounded-md font-semibold text-white transition-transform transform hover:scale-105 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isActive ? 'Parar' : 'Iniciar'}
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-2 rounded-md font-semibold text-white bg-slate-600 hover:bg-slate-700 transition-transform transform hover:scale-105"
                >
                    Reiniciar
                </button>
            </div>
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

const Tenistometro: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    
    const { player1, setPlayer1, player2, setPlayer2, updatePlayerScore } = context;

    const handleNameChange = (player: 'player1' | 'player2', name: string) => {
        if (player === 'player1') {
            setPlayer1(p => ({ ...p, name }));
        } else {
            setPlayer2(p => ({ ...p, name }));
        }
    };

    return (
        <div className="space-y-6">
            <Timer />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800 p-6 rounded-lg shadow-lg">
                <div>
                    <label htmlFor="player1" className="block text-lg font-semibold text-cyan-400 mb-2">Jogador 1</label>
                    <input
                        type="text"
                        id="player1"
                        value={player1.name}
                        onChange={(e) => handleNameChange('player1', e.target.value)}
                        className="w-full bg-slate-700 border-2 border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="player2" className="block text-lg font-semibold text-pink-400 mb-2">Jogador 2</label>
                    <input
                        type="text"
                        id="player2"
                        value={player2.name}
                        onChange={(e) => handleNameChange('player2', e.target.value)}
                        className="w-full bg-slate-700 border-2 border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {SHOT_CATEGORIES.map(category => (
                    <div key={category.title} className="bg-slate-800 rounded-lg shadow-lg p-4">
                        <h3 className={`text-xl font-bold mb-3 ${category.textColor}`}>{category.title}</h3>
                        
                        <div className="grid grid-cols-3 items-center gap-2 px-2 mb-2">
                            <h4 className="text-lg font-semibold text-cyan-400 text-center">{player1.name}</h4>
                            <span className="text-center font-semibold text-slate-400">Golpe</span>
                            <h4 className="text-lg font-semibold text-pink-400 text-center">{player2.name}</h4>
                        </div>
                        
                        <div className="space-y-2">
                            {category.shots.map(shot => (
                                <div key={shot.id} className="grid grid-cols-3 items-center gap-2 p-2 bg-slate-700/50 rounded">
                                    <ScoreCounter 
                                        score={player1.scores[shot.id] || 0} 
                                        onIncrement={() => updatePlayerScore(1, { shotId: shot.id }, 1)}
                                        onDecrement={() => updatePlayerScore(1, { shotId: shot.id }, -1)}
                                        textColor="text-cyan-400"
                                    />
                                    <span className="text-center font-medium text-slate-300">{shot.name}</span>
                                    <ScoreCounter
                                        score={player2.scores[shot.id] || 0}
                                        onIncrement={() => updatePlayerScore(2, { shotId: shot.id }, 1)}
                                        onDecrement={() => updatePlayerScore(2, { shotId: shot.id }, -1)}
                                        textColor="text-pink-400"
                                     />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tenistometro;