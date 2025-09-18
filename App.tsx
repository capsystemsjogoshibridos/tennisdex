
import React, { useState, createContext, useMemo } from 'react';
import { Page, Player, AppContextType, PowerCardData } from './types';
import { ALL_SHOTS, SHOT_CATEGORIES } from './constants';
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
};

export const AppContext = createContext<AppContextType | null>(null);

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('tenistometro');
    const [player1, setPlayer1] = useState<Player>({ ...initialPlayer, name: 'Jogador 1' });
    const [player2, setPlayer2] = useState<Player>({ ...initialPlayer, name: 'Jogador 2' });
    const [selectedCard1, setSelectedCard1] = useState<PowerCardData | null>(null);
    const [selectedCard2, setSelectedCard2] = useState<PowerCardData | null>(null);

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