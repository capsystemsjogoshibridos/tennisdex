export type Page = 'tenistometro' | 'powercards' | 'duelo' | 't_simples' | 'relatorio' | 'album';

export type ShotLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type CardRarity = 'Comum' | 'Incomum' | 'Rara' | 'Lendária';

export interface Shot {
  name: string;
  id: string;
}

export interface ShotCategory {
  title: string;
  level: ShotLevel;
  color: string;
  textColor: string;
  shots: Shot[];
}

export type PlayerScores = {
  [key: string]: number; // Can be shotId or level
};

export interface Player {
  name: string;
  scores: PlayerScores;
  awardedCards: PowerCardData[];
}

export interface PowerCardData {
    number: number;
    name: string;
    power: string;
    category: CardRarity;
    level: ShotLevel; // Maps rarity to scoring level
    image?: string; // For future image uploads
    instanceId?: string;
}

export interface AppContextType {
    page: Page;
    setPage: (page: Page) => void;
    player1: Player;
    setPlayer1: React.Dispatch<React.SetStateAction<Player>>;
    player2: Player;
    setPlayer2: React.Dispatch<React.SetStateAction<Player>>;
    selectedCard1: PowerCardData | null;
    setSelectedCard1: React.Dispatch<React.SetStateAction<PowerCardData | null>>;
    selectedCard2: PowerCardData | null;
    setSelectedCard2: React.Dispatch<React.SetStateAction<PowerCardData | null>>;
    updatePlayerScore: (playerId: 1 | 2, scoreInfo: { shotId?: string; level?: ShotLevel }, delta: number) => void;
    resetGame: () => void;
    shareReport: () => void;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}