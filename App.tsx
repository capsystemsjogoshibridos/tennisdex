import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
import { Page, Player, AppContextType, PowerCardData, ShotLevel } from './types';
import { SHOT_CATEGORIES, POWER_CARDS, RARITY_THRESHOLDS } from './constants';
import Header from './components/Header';
import Tenistometro from './components/Tenistometro';
import PowerCards from './components/PowerCards';
import Duelo from './components/Duelo';
import TSimples from './components/TSimples';
import Relatorio from './components/Relatorio';
import Album from './components/Album';

// The jsPDF library is loaded from a script tag and available on the window object.
declare const window: any;

const initialScores = SHOT_CATEGORIES.reduce((acc, category) => {
    acc[category.level] = 0;
    category.shots.forEach(shot => {
        acc[shot.id] = 0;
    });
    return acc;
}, {} as Record<string, number>);


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
    const [player1, setPlayer1] = useState<Player>({ ...initialPlayer, name: 'Jogador 1', scores: {...initialScores} });
    const [player2, setPlayer2] = useState<Player>({ ...initialPlayer, name: 'Jogador 2', scores: {...initialScores} });
    const [selectedCard1, setSelectedCard1] = useState<PowerCardData | null>(null);
    const [selectedCard2, setSelectedCard2] = useState<PowerCardData | null>(null);

    // Lifted timer state
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Lifted timer logic
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

    const resetGame = useCallback(() => {
        if (window.confirm('Tem certeza que deseja reiniciar todos os dados? Esta ação não pode ser desfeita.')) {
            const freshInitialScores = SHOT_CATEGORIES.reduce((acc, category) => {
                acc[category.level] = 0;
                category.shots.forEach(shot => {
                    acc[shot.id] = 0;
                });
                return acc;
            }, {} as Record<string, number>);
    
            setPlayer1({ name: 'Jogador 1', scores: { ...freshInitialScores }, awardedCards: [] });
            setPlayer2({ name: 'Jogador 2', scores: { ...freshInitialScores }, awardedCards: [] });
            setSelectedCard1(null);
            setSelectedCard2(null);
            setSeconds(0);
            setIsActive(false);
            setPage('tenistometro');
        }
    }, []);

    const shareReport = useCallback(() => {
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
            alert('A biblioteca de PDF не foi carregada. Tente novamente.');
            return;
        }
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const now = new Date();
        const fileName = `Tennisdex_Relatorio_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.pdf`;
    
        const FONT_SIZE_TITLE = 16;
        const FONT_SIZE_SUBTITLE = 12;
        const FONT_SIZE_NORMAL = 10;
        const MARGIN = 10;
        const PAGE_WIDTH = doc.internal.pageSize.getWidth();
        let y = MARGIN;
    
        const formatTime = (timeInSeconds: number) => {
            const h = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
            const s = (timeInSeconds % 60).toString().padStart(2, '0');
            return `${h}:${m}:${s}`;
        };

        const addTitle = (text: string) => {
            y += 10;
            doc.setFontSize(FONT_SIZE_TITLE);
            doc.text(text, PAGE_WIDTH / 2, y, { align: 'center' });
            y += 10;
        };
        
        const addSubtitle = (text: string) => {
            doc.setFontSize(FONT_SIZE_SUBTITLE);
            doc.text(text, MARGIN, y);
            y += 7;
        };
        
        const addText = (text: string, indent = true) => {
            const x = indent ? MARGIN + 5 : MARGIN;
            doc.setFontSize(FONT_SIZE_NORMAL);
            const splitText = doc.splitTextToSize(text, PAGE_WIDTH - MARGIN * 2 - (indent ? 5 : 0));
            doc.text(splitText, x, y);
            y += (splitText.length * 4) + 2;
        };
    
        const addPlayerReport = (player: Player) => {
            addSubtitle(`Relatório para ${player.name}`);
            
            addText("Golpes Executados:", false);
            const executedShots = SHOT_CATEGORIES.flatMap(cat => cat.shots).filter(shot => (player.scores[shot.id] || 0) > 0);
            const executedSimpleScores = SHOT_CATEGORIES.filter(cat => (player.scores[cat.level] || 0) > 0);
    
            if (executedShots.length === 0 && executedSimpleScores.length === 0) {
                addText("- Nenhum golpe registrado.");
            } else {
                executedShots.forEach(shot => addText(`- ${shot.name}: ${player.scores[shot.id]}x`));
                executedSimpleScores.forEach(cat => addText(`- ${cat.title.split(' ')[1]} (Total): ${player.scores[cat.level]}x`));
            }
            y += 5;
    
            addText("Cartas Ganhas:", false);
            if (player.awardedCards.length === 0) {
                addText("- Nenhuma carta ganha.");
            } else {
                player.awardedCards.forEach(card => addText(`- #${card.number} ${card.name} (${card.category})`));
            }
            y += 10;
        };
    
        addTitle("Relatório da Partida - Tennisdex");
        addSubtitle(`Duração da Partida: ${formatTime(seconds)}`);
        y += 5;
        
        addPlayerReport(player1);
        if (y > doc.internal.pageSize.getHeight() - 40) doc.addPage();
        addPlayerReport(player2);
        
        doc.save(fileName);
    }, [player1, player2, seconds]);

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
        resetGame,
        shareReport,
        seconds,
        setSeconds,
        isActive,
        setIsActive,
    }), [page, player1, player2, selectedCard1, selectedCard2, resetGame, shareReport, seconds, isActive]);

    const renderPage = () => {
        switch (page) {
            case 'relatorio':
                return <Relatorio />;
            case 'album':
                return <Album />;
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