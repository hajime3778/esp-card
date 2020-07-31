export const CardType = {
  back: require('@/assets/back.jpg'),
  circle: require('@/assets/circle.jpg'),
  cross: require('@/assets/cross.jpg'),
  square: require('@/assets/square.jpg'),
  star: require('@/assets/star.jpg'),
  wave: require('@/assets/wave.jpg')
} as const;

export type Card = {
  position: number;
  image: string;
}

// カードの枚数
export const NUMBER_OF_CARDS = 5;

/**
 * 初期状態のカードを作成します
 * @param  {number} numberOfCards 作成するカードの枚数
 * @returns Card
 */
export function createInitialCards(numberOfCards: number): Card[] {

  const cards: Card[] = [];
  for (let index = 0; index < numberOfCards; index++) {
    cards.push({ position: index, image: CardType.back })
  }

  return cards
}

const answerChoicesPaths: string[] = [
  CardType.circle,
  CardType.cross,
  CardType.square,
  CardType.star,
  CardType.wave
]

/**
 * 回答のカードを作成します
 * @param  {number} numberOfCards 作成するカードの枚数
 * @returns Card
 */
export function createAnswerCards(numberOfCards: number): Card[] {

  const cards: Card[] = [];

  for (let index = 0; index < numberOfCards; index++) {
    // ランダムに数字を生成
    const randomNumber = Math.floor(Math.random() * Math.floor(answerChoicesPaths.length))
    cards.push({
      position: index,
      image: answerChoicesPaths[randomNumber]
    })
  }

  return cards
}


/**
 * カードの選択肢を作成します
 * @param  {number} numberOfCards 作成するカードの枚数
 * @returns Card
 */
export function createAnswerChoices(): Card[] {

  const cards: Card[] = [];

  for (let index = 0; index < answerChoicesPaths.length; index++) {
    cards.push({
      position: index,
      image: answerChoicesPaths[index]
    })
  }

  return cards
}