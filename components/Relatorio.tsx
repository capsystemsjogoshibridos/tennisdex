import React, { useContext } from 'react';
import { AppContext } from '../App';
import { SHOT_CATEGORIES } from '../constants';
import { Player, PowerCardData, ShotLevel } from '../types';

const LEVEL_COLORS: Record<ShotLevel, { bg: string, border: string, text: string }> = {
    beginner: { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-400' },
    intermediate: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-400' },
    advanced: { bg: 'bg-orange-500/10', border: 'border-orange-500', text: 'text-orange-400' },
    expert: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400' },
};

const ReportCard: React.FC<{ card: PowerCardData }> = ({ card }) => {
    const colors = LEVEL_COLORS[card.level];
    return (
        <div className={`p-3 rounded-lg border ${colors.bg} ${colors.border} flex items-center gap-4`}>
            {card.image && <img src={card.image} alt={card.name} className="w-12 h-12 object-cover rounded-md" />}
            <div className="flex-grow">
                <h4 className={`font-bold ${colors.text}`}>#{card.number} - {card.name}</h4>
                <p className="text-sm text-slate-400">{card.power}</p>
            </div>
        </div>
    );
};

const PlayerReport: React.FC<{ player: Player; playerColor: string }> = ({ player, playerColor }) => {
    const executedShots = SHOT_CATEGORIES.flatMap(cat => cat.shots).filter(shot => (player.scores[shot.id] || 0) > 0);
    const executedSimpleScores = SHOT_CATEGORIES.filter(cat => (player.scores[cat.level] || 0) > 0);

    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-full space-y-6">
            <h3 className={`text-2xl font-bold text-center ${playerColor}`}>{player.name}</h3>
            
            <div>
                <h4 className="text-xl font-semibold mb-3 border-b-2 border-slate-700 pb-2">Golpes Executados</h4>
                {executedShots.length > 0 || executedSimpleScores.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {executedShots.map(shot => (
                            <li key={shot.id}>
                                {shot.name}: <span className="font-bold text-white">{player.scores[shot.id]}</span>x
                            </li>
                        ))}
                         {executedSimpleScores.map(cat => (
                            <li key={cat.level}>
                                {cat.title.split(' ')[1]} (Total): <span className="font-bold text-white">{player.scores[cat.level]}</span>x
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500 text-center py-4">Nenhum golpe registrado.</p>
                )}
            </div>

            <div>
                <h4 className="text-xl font-semibold mb-3 border-b-2 border-slate-700 pb-2">Cartas Ganhas</h4>
                {player.awardedCards.length > 0 ? (
                    <div className="space-y-3">
                        {player.awardedCards.map(card => (
                            <ReportCard key={card.instanceId} card={card} />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-center py-4">Nenhuma carta ganha.</p>
                )}
            </div>
        </div>
    );
};


const Relatorio: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { player1, player2 } = context;

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Relatório da Partida</h2>
                <p className="text-slate-400 mt-2">Resumo de desempenho e recompensas.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PlayerReport player={player1} playerColor="text-cyan-400" />
                <PlayerReport player={player2} playerColor="text-pink-400" />
            </div>
        </div>
    );
};

export default Relatorio;