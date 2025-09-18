
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
  [shotId: string]: number;
};

export interface Player {
  name: string;
  scores: PlayerScores;
}

export interface PowerCardData {
    name: string;
    description: string;
    shotId: string;
    level: ShotLevel;
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
}