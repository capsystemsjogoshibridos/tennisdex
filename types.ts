
export type Page = 'tenistometro' | 'powercards' | 'duelo' | 't_simples';

export type ShotLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

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
    name: string;
    description: string;
    shotId: string;
    level: ShotLevel;
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
}