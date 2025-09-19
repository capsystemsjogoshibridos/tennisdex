
import React, { useState, createContext, useMemo } from 'react';
import { Page, Player, AppContextType, PowerCardData, ShotLevel } from './types';
import { ALL_SHOTS, SHOT_CATEGORIES, POWER_CARDS, RARITY_THRESHOLDS } from './constants';
import Header from './components/Header';
import Tenistometro from './components/Tenistometro';
import PowerCards from './components/PowerCards';
import Duelo from './components/Duelo';
import TSimples from './components/TSimples';

const scoresFromShots = ALL_SHOTS.reduce((acc, shot) => {
    acc[shot.id] = 0;
    return acc;
}, {} as Record<string, number>);

const initialScores = SHOT_CATEGORIES.reduce((acc, category) => {
    acc[category.level] = 0;
    return acc;
}, scoresFromShots);


const initialPlayer: Player = {
    name: '',
    scores: initialScores,
    awardedCards: [],
};

export const AppContext = createContext<AppContextType | null>(null);

const CARDS_BY_LEVEL = POWER_CARDS.reduce((acc, card) => {
    const level = card.level;
    if (!acc[level]) {
        acc[level] = [];
    }
    acc[level].push(card);
    return acc;
}, {} as Record<ShotLevel, PowerCardData[]>);

const getRandomCard = (level: ShotLevel): PowerCardData | null => {
    const cardsOfLevel = CARDS_BY_LEVEL[level];
    if (!cardsOfLevel || cardsOfLevel.length === 0) return null;
    return cardsOfLevel[Math.floor(Math.random() * cardsOfLevel.length)];
};


const App: React.FC = () => {
    const [page, setPage] = useState<Page>('tenistometro');
    const [player1, setPlayer1] = useState<Player>({ ...initialPlayer, name: 'Jogador 1' });
    const [player2, setPlayer2] = useState<Player>({ ...initialPlayer, name: 'Jogador 2' });
    const [selectedCard1, setSelectedCard1] = useState<PowerCardData | null>(null);
    const [selectedCard2, setSelectedCard2] = useState<PowerCardData | null>(null);

    const updatePlayerScore = (
        playerId: 1 | 2, 
        scoreInfo: { shotId?: string; level?: ShotLevel }, 
        delta: number
    ) => {
        const setPlayer = playerId === 1 ? setPlayer1 : setPlayer2;

        setPlayer(prevPlayer => {
            const changedLevel: ShotLevel | undefined = scoreInfo.level 
                ? scoreInfo.level 
                : SHOT_CATEGORIES.find(c => c.shots.some(s => s.id === scoreInfo.shotId))?.level;
            
            if (!changedLevel) return prevPlayer;

            let oldCategoryTotal: number;
            if (scoreInfo.shotId) { 
                const category = SHOT_CATEGORIES.find(c => c.level === changedLevel)!;
                oldCategoryTotal = category.shots.reduce((sum, shot) => sum + (prevPlayer.scores[shot.id] || 0), 0);
            } else { 
                oldCategoryTotal = prevPlayer.scores[changedLevel] || 0;
            }

            const newPlayer = {
                ...prevPlayer,
                scores: { ...prevPlayer.scores },
                awardedCards: [...prevPlayer.awardedCards]
            };
            
            let newCategoryTotal: number;
            if (scoreInfo.shotId) {
                const currentScore = newPlayer.scores[scoreInfo.shotId] || 0;
                newPlayer.scores[scoreInfo.shotId] = Math.max(0, currentScore + delta);
                const category = SHOT_CATEGORIES.find(c => c.level === changedLevel)!;
                newCategoryTotal = category.shots.reduce((sum, shot) => sum + (newPlayer.scores[shot.id] || 0), 0);
            } else { 
                const currentScore = newPlayer.scores[changedLevel] || 0;
                newPlayer.scores[changedLevel] = Math.max(0, currentScore + delta);
                newCategoryTotal = newPlayer.scores[changedLevel];
            }

            if (delta > 0) {
                const threshold = RARITY_THRESHOLDS[changedLevel];
                const oldMilestone = Math.floor(oldCategoryTotal / threshold);
                const newMilestone = Math.floor(newCategoryTotal / threshold);

                if (newMilestone > oldMilestone) {
                    const cardsToAward = newMilestone - oldMilestone;
                    for (let i = 0; i < cardsToAward; i++) {
                        const newCard = getRandomCard(changedLevel);
                        if (newCard) {
                            const cardInstance = { ...newCard, instanceId: Math.random().toString(36).substring(2, 11) };
                            newPlayer.awardedCards.push(cardInstance);
                        }
                    }
                }
            }
            
            return newPlayer;
        });
    };

    const contextValue = useMemo(() => ({
        page,
        setPage,
        player1,
        setPlayer1,
        player2,
        setPlayer2,
        selectedCard1,
        setSelectedCard1,
        selectedCard2,
        setSelectedCard2,
        updatePlayerScore,
    }), [page, player1, player2, selectedCard1, selectedCard2]);

    const renderPage = () => {
        switch (page) {
            case 'tenistometro':
                return <Tenistometro />;
            case 't_simples':
                return <TSimples />;
            case 'powercards':
                return <PowerCards />;
            case 'duelo':
                return <Duelo />;
            default:
                return <Tenistometro />;
        }
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <Header />
                    <main className="mt-6">
                        {renderPage()}
                    </main>
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default App;