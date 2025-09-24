import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, Player, PowerCardData } from '../types';
import CardModal from './CardModal';

const PlayerCardSelection: React.FC<{
    player: Player;
    earnedCards: PowerCardData[];
    selectedCard: PowerCardData | null;
    onCardView: (card: PowerCardData) => void;
    playerColor: string;
}> = ({ player, earnedCards, selectedCard, onCardView, playerColor }) => (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-full">
        <h3 className={`text-2xl font-bold mb-4 text-center ${playerColor}`}>{player.name}</h3>
        {earnedCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
                {earnedCards.map((card, index) => {
                    const isSelected = selectedCard?.instanceId === card.instanceId;
                    return (
                        <button
                            key={card.instanceId || `${card.number}-${index}`}
                            onClick={() => onCardView(card)}
                            className={`relative rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none aspect-[3/4] bg-slate-900 ${isSelected ? 'ring-4 ring-offset-2 ring-offset-slate-800 ring-indigo-500' : ''}`}
                            aria-label={`Ver carta ${card.name}`}
                        >
                            {card.image ? (
                                <img src={card.image} alt={card.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-center p-2">
                                    <span className="text-slate-400">{card.name}</span>
                                </div>
                            )}
                        </button>
                    );
                })}
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
    const [modalCard, setModalCard] = useState<PowerCardData | null>(null);
    const [selectingPlayer, setSelectingPlayer] = useState<1 | 2 | null>(null);


    const handleViewCard = (card: PowerCardData, player: 1 | 2) => {
        setModalCard(card);
        setSelectingPlayer(player);
    };

    const handleSelectCardInModal = (card: PowerCardData) => {
        if (selectingPlayer === 1) {
            setSelectedCard1(card);
        } else if (selectingPlayer === 2) {
            setSelectedCard2(card);
        }
        setModalCard(null);
        setSelectingPlayer(null);
    };

    const handleCloseModal = () => {
        setModalCard(null);
        setSelectingPlayer(null);
    };
    
    const earnedCardsP1 = player1.awardedCards;
    const earnedCardsP2 = player2.awardedCards;
    
    const canDuel = selectedCard1 && selectedCard2;

    return (
        <>
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
                        onCardView={(card) => handleViewCard(card, 1)}
                        playerColor="text-cyan-400"
                    />
                    <PlayerCardSelection
                        player={player2}
                        earnedCards={earnedCardsP2}
                        selectedCard={selectedCard2}
                        onCardView={(card) => handleViewCard(card, 2)}
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

            {modalCard && selectingPlayer && (
                 <CardModal
                    card={modalCard}
                    onClose={handleCloseModal}
                    onSelect={handleSelectCardInModal}
                    isSelected={
                        selectingPlayer === 1
                            ? selectedCard1?.instanceId === modalCard.instanceId
                            : selectedCard2?.instanceId === modalCard.instanceId
                    }
                    showDetails={false}
                />
            )}
        </>
    );
};

export default PowerCards;