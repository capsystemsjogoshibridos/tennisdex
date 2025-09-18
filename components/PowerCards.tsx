
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../App';
import { POWER_CARDS } from '../constants';
import { AppContextType, Player, PowerCardData, ShotLevel } from '../types';

const LEVEL_COLORS: Record<ShotLevel, { bg: string, border: string, text: string }> = {
    beginner: { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-400' },
    intermediate: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-400' },
    advanced: { bg: 'bg-orange-500/10', border: 'border-orange-500', text: 'text-orange-400' },
    expert: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400' },
};

const PowerCard: React.FC<{ card: PowerCardData, isSelected: boolean, onSelect: () => void }> = ({ card, isSelected, onSelect }) => {
    const colors = LEVEL_COLORS[card.level];
    const selectionClass = isSelected ? 'ring-4 ring-offset-4 ring-offset-slate-900 ring-indigo-500 scale-105' : 'scale-100';

    return (
        <button
            onClick={onSelect}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 transform ${colors.bg} ${colors.border} ${selectionClass} hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1`}
        >
            <h4 className={`font-bold text-lg ${colors.text}`}>{card.name}</h4>
            <p className="text-sm text-slate-400">{card.description}</p>
        </button>
    );
};

const PlayerCardSelection: React.FC<{ 
    player: Player, 
    earnedCards: PowerCardData[],
    selectedCard: PowerCardData | null,
    onSelectCard: (card: PowerCardData) => void,
    playerColor: string,
}> = ({ player, earnedCards, selectedCard, onSelectCard, playerColor }) => (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-full">
        <h3 className={`text-2xl font-bold mb-4 text-center ${playerColor}`}>{player.name}</h3>
        {earnedCards.length > 0 ? (
            <div className="space-y-3">
                {earnedCards.map(card => (
                    <PowerCard
                        key={card.shotId}
                        card={card}
                        isSelected={selectedCard?.shotId === card.shotId}
                        onSelect={() => onSelectCard(card)}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center text-slate-500 py-10">
                Nenhuma Power Card ganha. Marque pontos no Tenistômetro!
            </div>
        )}
    </div>
);


const PowerCards: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { player1, player2, selectedCard1, setSelectedCard1, selectedCard2, setSelectedCard2, setPage } = context;

    const earnedCardsP1 = useMemo(() => {
        return POWER_CARDS.filter(card => player1.scores[card.shotId] > 0);
    }, [player1.scores]);

    const earnedCardsP2 = useMemo(() => {
        return POWER_CARDS.filter(card => player2.scores[card.shotId] > 0);
    }, [player2.scores]);
    
    const canDuel = selectedCard1 && selectedCard2;

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Power Cards</h2>
                <p className="text-slate-400 mt-2">Selecione uma carta para cada jogador para levar ao Duelo!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PlayerCardSelection 
                    player={player1} 
                    earnedCards={earnedCardsP1}
                    selectedCard={selectedCard1}
                    onSelectCard={setSelectedCard1}
                    playerColor="text-cyan-400"
                />
                <PlayerCardSelection
                    player={player2}
                    earnedCards={earnedCardsP2}
                    selectedCard={selectedCard2}
                    onSelectCard={setSelectedCard2}
                    playerColor="text-pink-400"
                />
            </div>
            
            <div className="text-center mt-8">
                <button 
                    onClick={() => setPage('duelo')}
                    disabled={!canDuel}
                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg text-xl shadow-lg transition-all transform hover:scale-105 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed disabled:scale-100"
                >
                    Ir para Duelo ⚔️
                </button>
            </div>
        </div>
    );
};

export default PowerCards;
