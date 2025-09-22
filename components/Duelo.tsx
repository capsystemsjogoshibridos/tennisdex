import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { AppContextType, PowerCardData, ShotLevel } from '../types';

type DuelState = 'ready' | 'dueling' | 'finished';

const LEVEL_COLORS: Record<ShotLevel, { bg: string, border: string, text: string }> = {
    beginner: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-300' },
    intermediate: { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-300' },
    advanced: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-300' },
    expert: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-300' },
};

const DuelCard: React.FC<{ card: PowerCardData, isWinner: boolean | null }> = ({ card, isWinner }) => {
    const colors = LEVEL_COLORS[card.level];
    
    let stateClasses = 'opacity-100 scale-100';
    if (isWinner === true) {
        stateClasses = 'opacity-100 scale-110 shadow-2xl shadow-yellow-400/50 ring-4 ring-yellow-400';
    } else if (isWinner === false) {
        stateClasses = 'opacity-50 scale-90 filter grayscale';
    }

    return (
        <div className={`p-6 rounded-xl border-2 w-full max-w-sm mx-auto transition-all duration-700 ease-out-cubic ${colors.bg} ${colors.border} ${stateClasses}`}>
            <h3 className={`font-bold text-2xl ${colors.text}`}>#{card.number} - {card.name}</h3>
            <p className="text-slate-300 mt-1">{card.power}</p>
        </div>
    );
};

const Duelo: React.FC = () => {
    const context = useContext(AppContext);
    const [duelState, setDuelState] = useState<DuelState>('ready');
    const [winner, setWinner] = useState<1 | 2 | null>(null);

    useEffect(() => {
        if (context?.selectedCard1 && context?.selectedCard2 && duelState === 'ready') {
            setDuelState('dueling');
            setTimeout(() => {
                const winningPlayer = Math.random() > 0.5 ? 1 : 2;
                setWinner(winningPlayer);
                setDuelState('finished');
            }, 3000); // 3-second duel animation
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context?.selectedCard1, context?.selectedCard2, duelState]);
    
    if (!context) return null;
    const { selectedCard1, selectedCard2, player1, player2, setPage } = context;

    if (!selectedCard1 || !selectedCard2) {
        return (
            <div className="text-center bg-slate-800 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-yellow-400">Nenhuma carta selecionada!</h2>
                <p className="mt-2 text-slate-400">Por favor, volte para a tela de Power Cards e selecione uma carta para cada jogador.</p>
                <button 
                    onClick={() => setPage('powercards')}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Voltar para Power Cards
                </button>
            </div>
        );
    }
    
    const duelMessages = [
        "Analisando jogadas...",
        "Calculando probabilidades...",
        "Avaliando a técnica...",
        "A magia está acontecendo!",
        "Revelando o campeão...",
    ];
    const [message, setMessage] = useState(duelMessages[0]);

    useEffect(() => {
        if (duelState === 'dueling') {
            const interval = setInterval(() => {
                setMessage(prev => duelMessages[(duelMessages.indexOf(prev) + 1) % duelMessages.length]);
            }, 600);
            return () => clearInterval(interval);
        }
    }, [duelState, duelMessages]);

    return (
        <div className="flex flex-col items-center space-y-6 min-h-[60vh]">
            <h2 className="text-4xl font-extrabold tracking-tight">DUELO MÁGICO</h2>
            
            <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAACBCAMAAAD2/ASNAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAGAUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x/PPgkAAACGdFJOUwAMFBslLjc9QElSVl5mam5xdXt/gIKHiY6Qk5SWl5iZmpugo6Wmq62ytbe6vsDFx8vO0dPV19na3N7g4uXn6Ors7/Dy9PX3+Pn6+/z9/v6aH5kAAAQ2SURBVHja7ZzZdqIwEIVREXFxwYIguKi4qLiL7//K1jYJSAgkkJPv5/UqV22S7jTSdCrpAQAAAAAAAAAAAAAAAAAAADiGb25u/nN2d/c9Z2dnf3C3t7f/Pby9vf0tPL29/S3k/f39b4B/9Xh3t/qY7/v8d/f15uPj28/3j/t9f/v5fX/v/n6ff2z3h+kE/n97/f/t/v3//cO01Xh02gMAAAAAAGD6qfFw3sE4kP9f8L8u/1//+1c+Pu7/XwEAAAAAADDdVHjY6QAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAACwQ1RgHQAAAAAAsENUYB0AAAAAALBDVGAdAAAAAAB2K/gC7N5F4vEwCQAAAABJRU5ErkJggg==" 
                alt="Fox Tennis Logo" 
                className="w-72 h-auto"
            />

            <div className="w-full flex flex-col md:flex-row justify-around items-center gap-8 relative">
                 <div className={`flex flex-col items-center space-y-2 transition-all duration-500 ${winner === 2 ? 'opacity-50' : 'opacity-100'}`}>
                    <h4 className="text-2xl font-bold text-cyan-400">{player1.name}</h4>
                    <DuelCard card={selectedCard1} isWinner={winner === null ? null : winner === 1} />
                </div>

                <div className="text-5xl font-black text-slate-600 my-4 md:my-0">VS</div>

                <div className={`flex flex-col items-center space-y-2 transition-all duration-500 ${winner === 1 ? 'opacity-50' : 'opacity-100'}`}>
                    <h4 className="text-2xl font-bold text-pink-400">{player2.name}</h4>
                    <DuelCard card={selectedCard2} isWinner={winner === null ? null : winner === 2} />
                </div>
                
                {duelState === 'dueling' && (
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center items-center z-10 animate-pulse">
                         <div className="text-3xl font-bold text-white">{message}</div>
                    </div>
                )}
            </div>

            {duelState === 'finished' && winner && (
                <div className="text-center animate-fade-in-up mt-8">
                     <h3 className="text-5xl font-bold text-yellow-400">VENCEDOR!</h3>
                     <p className="text-3xl mt-2">{winner === 1 ? player1.name : player2.name}</p>
                     <button
                        onClick={() => {
                            setPage('powercards');
                            // Optional: Reset selections
                            // context.setSelectedCard1(null);
                            // context.setSelectedCard2(null);
                        }}
                        className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    >
                        Jogar Novamente
                    </button>
                </div>
            )}
        </div>
    );
};

export default Duelo;
