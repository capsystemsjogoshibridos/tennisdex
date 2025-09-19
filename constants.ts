
import { ShotCategory, PowerCardData, ShotLevel } from './types';

export const RARITY_THRESHOLDS: Record<ShotLevel, number> = {
  beginner: 9,
  intermediate: 6,
  advanced: 3,
  expert: 1,
};

export const SHOT_CATEGORIES: ShotCategory[] = [
  {
    title: '🟢 Boleiro',
    level: 'beginner',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    shots: [
      { name: 'Forehand', id: 'forehand' },
      { name: 'Backhand de duas mãos', id: 'backhand_two' },
      { name: 'Flat', id: 'flat' },
      { name: 'Voleio básico', id: 'volley_basic' },
      { name: 'Smash', id: 'smash' },
    ],
  },
  {
    title: '🟡 Ace Ventura',
    level: 'intermediate',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    shots: [
      { name: 'Topspin', id: 'topspin' },
      { name: 'Backhand de uma mão', id: 'backhand_one' },
      { name: 'Slice', id: 'slice' },
      { name: 'Half-volley', id: 'half_volley' },
      { name: 'Approach shot', id: 'approach' },
      { name: 'Moonball', id: 'moonball' },
      { name: 'Ace', id: 'ace' },
    ],
  },
  {
    title: '🟠 Rocket Racket',
    level: 'advanced',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    shots: [
      { name: 'Drop shot (deixadinha)', id: 'drop_shot' },
      { name: 'Passing shot', id: 'passing_shot' },
      { name: 'Lob ofensivo', id: 'lob_offensive' },
      { name: 'Drive volley', id: 'drive_volley' },
      { name: 'Swinging volley', id: 'swinging_volley' },
      { name: 'Drop volley', id: 'drop_volley' },
    ],
  },
  {
    title: '🔴 Rei da Quadra',
    level: 'expert',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    shots: [
      { name: 'Kick serve', id: 'kick_serve' },
      { name: 'Topspin serve', id: 'topspin_serve' },
      { name: 'Slice serve eficiente', id: 'slice_serve' },
      { name: 'Inside-out', id: 'inside_out' },
      { name: 'Inside-in', id: 'inside_in' },
      { name: 'Drop shot lob', id: 'drop_shot_lob' },
      { name: 'Tweeners', id: 'tweeners' },
      { name: 'Underhand serve', id: 'underhand_serve' },
    ],
  },
];

export const ALL_SHOTS = SHOT_CATEGORIES.flatMap(category => category.shots);

export const POWER_CARDS: PowerCardData[] = ALL_SHOTS.map(shot => {
    const category = SHOT_CATEGORIES.find(c => c.shots.some(s => s.id === shot.id));
    return {
        name: `${shot.name} Master`,
        description: `Domínio da técnica de ${shot.name}.`,
        shotId: shot.id,
        level: category?.level || 'beginner',
    };
});