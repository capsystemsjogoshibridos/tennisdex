import React from 'react';
import { POWER_CARDS } from '../constants';
import { PowerCardData, CardRarity, ShotLevel } from '../types';

const RARITY_DETAILS: Record<CardRarity, { shotLevel: ShotLevel; title: string }> = {
    'Comum': { shotLevel: 'beginner', title: 'Comuns' },
    'Incomum': { shotLevel: 'intermediate', title: 'Incomuns' },
    'Rara': { shotLevel: 'advanced', title: 'Raras' },
    'Lendária': { shotLevel: 'expert', title: 'Lendárias' },
};

const LEVEL_COLORS: Record<ShotLevel, { bg: string, border: string, text: string, shadow: string }> = {
    beginner: { bg: 'bg-green-900/50', border: 'border-green-500', text: 'text-green-300', shadow: 'hover:shadow-green-500/20' },
    intermediate: { bg: 'bg-yellow-900/50', border: 'border-yellow-500', text: 'text-yellow-300', shadow: 'hover:shadow-yellow-500/20' },
    advanced: { bg: 'bg-orange-900/50', border: 'border-orange-500', text: 'text-orange-300', shadow: 'hover:shadow-orange-500/20' },
    expert: { bg: 'bg-red-900/50', border: 'border-red-500', text: 'text-red-300', shadow: 'hover:shadow-red-500/20' },
};

const AlbumCard: React.FC<{ card: PowerCardData }> = ({ card }) => {
    const colors = LEVEL_COLORS[card.level];
    return (
        <div className={`flex flex-col h-full p-4 rounded-lg border-2 text-left transition-all duration-300 transform ${colors.bg} ${colors.border} ${colors.shadow} hover:shadow-2xl hover:-translate-y-1`}>
            <div className="flex justify-between items-baseline">
                <h4 className={`font-bold text-lg ${colors.text}`}>{card.name}</h4>
                <span className="text-xs font-mono text-slate-400">#{String(card.number).padStart(2, '0')}</span>
            </div>
            <p className="text-sm text-slate-300 mt-2 flex-grow">{card.power}</p>
        </div>
    );
};

const RaritySection: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
    const details = RARITY_DETAILS[rarity];
    const cards = POWER_CARDS.filter(c => c.category === rarity);
    const colors = LEVEL_COLORS[details.shotLevel];

    return (
        <section>
            <h3 className={`text-2xl font-bold mb-4 ${colors.text}`}>{details.title} ({cards.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cards.map(card => (
                    <AlbumCard key={card.number} card={card} />
                ))}
            </div>
        </section>
    );
};


const Album: React.FC = () => {
    return (
        <div className="space-y-10">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Álbum de Power Cards</h2>
                <p className="text-slate-400 mt-2">Todas as cartas colecionáveis do Tennisdex.</p>
            </div>

            <RaritySection rarity="Comum" />
            <RaritySection rarity="Incomum" />
            <RaritySection rarity="Rara" />
            <RaritySection rarity="Lendária" />
        </div>
    );
};

export default Album;
