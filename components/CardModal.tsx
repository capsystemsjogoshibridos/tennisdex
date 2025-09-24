import React from 'react';
import { PowerCardData, ShotLevel } from '../types';

const LEVEL_COLORS: Record<ShotLevel, { bg: string, border: string, text: string }> = {
    beginner: { bg: 'bg-green-900/80', border: 'border-green-500', text: 'text-green-300' },
    intermediate: { bg: 'bg-yellow-900/80', border: 'border-yellow-500', text: 'text-yellow-300' },
    advanced: { bg: 'bg-orange-900/80', border: 'border-orange-500', text: 'text-orange-300' },
    expert: { bg: 'bg-red-900/80', border: 'border-red-500', text: 'text-red-300' },
};

interface CardModalProps {
    card: PowerCardData;
    onClose: () => void;
    onSelect?: (card: PowerCardData) => void;
    isSelected?: boolean;
    showDetails?: boolean;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose, onSelect, isSelected, showDetails = true }) => {
    if (!card) return null;

    const colors = LEVEL_COLORS[card.level];

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`relative rounded-xl border-4 max-w-md w-full text-left transform transition-all duration-300 ${colors.bg} ${colors.border} shadow-2xl shadow-indigo-500/30 animate-scale-in`}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 w-10 h-10 rounded-full bg-slate-800 text-white text-2xl font-bold flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                    aria-label="Fechar"
                >
                    &times;
                </button>
                {card.image && <img src={card.image} alt={card.name} className="w-full h-auto object-contain rounded-t-lg bg-black cursor-pointer" onClick={onClose} />}
                
                {(showDetails || onSelect) && (
                     <div className="p-6">
                        {showDetails && (
                            <>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className={`font-bold text-3xl ${colors.text}`}>{card.name}</h3>
                                    <span className="text-lg font-mono text-slate-400">#{String(card.number).padStart(2, '0')}</span>
                                </div>
                                <p className="text-lg text-slate-300 mt-2">{card.power}</p>
                                <p className={`text-md font-semibold mt-4 ${colors.text}`}>{card.category}</p>
                            </>
                        )}

                        {onSelect && (
                            <div className={showDetails ? "mt-6" : ""}>
                                <button
                                    onClick={() => onSelect(card)}
                                    className={`w-full px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${isSelected ? 'bg-slate-600 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                                    disabled={isSelected}
                                >
                                    {isSelected ? '✓ Selecionada' : 'Selecionar para Duelo'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardModal;