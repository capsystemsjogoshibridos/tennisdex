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

export const POWER_CARDS: PowerCardData[] = [
    // CATEGORIA: COMUM
    { number: 1, name: 'Saque Livre', power: 'Pode sacar de qualquer lado da quadra', category: 'Comum', level: 'beginner' },
    { number: 2, name: 'Saque Duplo', power: 'Pode sacar duas vezes seguidas no primeiro saque', category: 'Comum', level: 'beginner' },
    { number: 3, name: 'Linha Livre', power: 'Pode sacar em qualquer lugar', category: 'Comum', level: 'beginner' },
    { number: 4, name: 'Invasor da Rede', power: 'Pode receber o saque na rede', category: 'Comum', level: 'beginner' },
    { number: 5, name: 'Sprint Inicial', power: 'Pode correr pela quadra antes do saque do adversário', category: 'Comum', level: 'beginner' },
    { number: 6, name: 'Sem Voleio', power: 'Adversário não pode ir à rede', category: 'Comum', level: 'beginner' },
    { number: 7, name: 'Sem Slice', power: 'Adversário não pode usar slice', category: 'Comum', level: 'beginner' },
    { number: 8, name: 'Confusão', power: 'Adversário tem que sacar na posição contrária (destro/canhoto)', category: 'Comum', level: 'beginner' },
    { number: 9, name: 'Raquete Leve', power: 'O adversário deve jogar a raquete para o alto cada vez que fizer o ponto, senão o perde', category: 'Comum', level: 'beginner' },
    { number: 10, name: 'Bola Verde', power: 'O game será jogado com a bola de treino verde', category: 'Comum', level: 'beginner' },

    // CATEGORIA: INCOMUM
    { number: 11, name: 'Backhand Forçado', power: 'O adversário deverá jogar apenas usando backhand', category: 'Incomum', level: 'intermediate' },
    { number: 12, name: 'Zona Restrita', power: 'Adversário não pode jogar a bola dentro da área de saque', category: 'Incomum', level: 'intermediate' },
    { number: 13, name: 'Mão oposta', power: 'Se o adversário for destro, tem que jogar como canhoto e vice versa', category: 'Incomum', level: 'intermediate' },
    { number: 14, name: 'Grip Total', power: 'Exceto nos saques, o adversário deve jogar sempre com as duas mãos segurando a raquete', category: 'Incomum', level: 'intermediate' },
    { number: 15, name: 'Ponto Duplo', power: 'Cada ponto feito valerá como dois. Exemplo: o primeiro ponto já vai para 30 em vez de 15', category: 'Incomum', level: 'intermediate' },
    { number: 16, name: 'Bonus Break', power: 'O game vencido valerá como dois pontos no set.', category: 'Incomum', level: 'intermediate' },
    { number: 17, name: 'Contra Golpe Relâmpago', power: 'É permitido rebater os saques sem que ela encoste na quadra', category: 'Incomum', level: 'intermediate' },
    { number: 18, name: 'Rede Tranquila', power: 'Se a bola adversária entrar, encostar no seu campo, mas antes tiver tocado na rede, ele perde o ponto', category: 'Incomum', level: 'intermediate' },
    { number: 19, name: 'Bola Vermelha', power: 'O game será jogado com a bola de treino vermelha', category: 'Incomum', level: 'intermediate' },
    { number: 20, name: 'Bola Laranja', power: 'O game será jogado com a bola de treino laranja', category: 'Incomum', level: 'intermediate' },
    { number: 21, name: 'Rede Maldita', power: 'Se a bola adversária entrar, encostar no seu campo, mas antes tiver tocado na rede, ele perde o game', category: 'Incomum', level: 'intermediate' },
    { number: 22, name: 'Dupla Falta Mortal', power: 'Se o adversário cometer dupla falta, ele perde o game', category: 'Incomum', level: 'intermediate' },
    { number: 23, name: 'De Costas', power: 'O adversário ficará de costas em todos os saques do game', category: 'Incomum', level: 'intermediate' },
    { number: 24, name: 'Parede Humana', power: 'Em dupla, ambos jogadores tem que ficar na linha do meio da quadra, sem poder ir para trás ou para frente', category: 'Incomum', level: 'intermediate' },
    { number: 25, name: 'Um Ponto, Dois Jogadores', power: 'Em dupla, caso o adversário erre o primeiro saque, o outro jogador executa o segundo', category: 'Incomum', level: 'intermediate' },
    { number: 26, name: 'Espelho, Espelho Meu', power: 'Em dupla, os jogadores adversários tem que fazer o mesmo movimento entre si', category: 'Incomum', level: 'intermediate' },
    { number: 27, name: 'Jogador Instantâneo', power: 'Na dupla ou em simples, entra um jogador extra para ajudar no ponto', category: 'Incomum', level: 'intermediate' },

    // CATEGORIA: RARA
    { number: 28, name: 'Proteção de Break Point', power: 'Em Break Point, se inicia já com um ponto de vantagem', category: 'Rara', level: 'advanced' },
    { number: 29, name: 'Troca de Raquetes', power: 'Ambos jogadores trocam de raquete entre si', category: 'Rara', level: 'advanced' },
    { number: 30, name: '3 Toques', power: 'O jogador pode raquetear a bola até 3 vezes antes de devolver', category: 'Rara', level: 'advanced' },
    { number: 31, name: 'Bola Fantasma', power: 'O jogador pode repetir um ponto perdido', category: 'Rara', level: 'advanced' },
    { number: 32, name: 'Parede Invisível', power: 'A parte externa das linhas da quadra adversária contam como área de ponto', category: 'Rara', level: 'advanced' },
    { number: 33, name: 'Rally Reduzido', power: 'Após a 5ª raquetada, o jogador precisa fazer o ponto, senão é dado como perdido', category: 'Rara', level: 'advanced' },
    { number: 34, name: 'Saque Invisível', power: 'O jogador pode fingir que vai sacar antes de efetuar o movimento válido', category: 'Rara', level: 'advanced' },
    { number: 35, name: 'Bola Aleatória', power: 'O jogador escolhe qual bola de treino será usada no game', category: 'Rara', level: 'advanced' },
    { number: 36, name: 'Ace Fatal', power: 'Se o jogador fizer um ace, o game está ganho', category: 'Rara', level: 'advanced' },
    { number: 37, name: 'Winner Final', power: 'Se o jogador fizer um ponto de winner, o game está ganho', category: 'Rara', level: 'advanced' },
    { number: 38, name: 'Multiball', power: 'Durante o rally, o jogador pode adicionar uma bola extra na disputa', category: 'Rara', level: 'advanced' },
    { number: 39, name: 'Multiball Crazy', power: 'Durante o rally, o jogador pode adicionar mais de uma bola na disputa', category: 'Rara', level: 'advanced' },
    { number: 40, name: 'Multiball Color', power: 'Durante o rally, o jogador pode adicionar uma das bolas de treino na disputa', category: 'Rara', level: 'advanced' },
    { number: 41, name: 'Encordoados', power: 'Em dupla, cada jogador adversário segura uma ponta da corda. Se algum deles soltar, perdem o ponto', category: 'Rara', level: 'advanced' },
    { number: 42, name: 'Desfalque', power: 'Em dupla, o adversário fica sem um jogador naquele ponto', category: 'Rara', level: 'advanced' },
    
    // CATEGORIA: LENDÁRIA
    { number: 43, name: 'Ponto de Ouro', power: 'Se vencer um ponto anunciado antes do saque, o game está ganho', category: 'Lendária', level: 'expert' },
    { number: 44, name: 'Imortal', power: 'O jogador diz com qual golpe fará o primeiro ponto da partida. Se conseguir, o game está ganho', category: 'Lendária', level: 'expert' },
    { number: 45, name: 'Ponto Decisivo', power: 'Se o adversário perder o primeiro saque, perde o game', category: 'Lendária', level: 'expert' },
    { number: 46, name: 'Jogador Temporário', power: 'Em dupla ou simples, você pode chamar alguém de fora para fazer parte do seu time no game', category: 'Lendária', level: 'expert' },
    { number: 47, name: 'Forever Alone', power: 'Em dupla, o adversário fica todo o game sozinho', category: 'Lendária', level: 'expert' },
];