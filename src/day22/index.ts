type Players = {
  player1: number[];
  player2: number[];
};

const dealCards = (input: string[]): Players => {
  const player1 = input.slice(1, input.indexOf('')).map(Number);
  const player2 = input.slice(input.indexOf('') + 2).map(Number);

  return {
    player1,
    player2,
  };
};

const playRounds = ({ player1, player2 }: Players): number[] => {
  while (player1.length !== 0 && player2.length !== 0) {
    const p1Card = player1.shift();
    const p2Card = player2.shift();

    if (!p1Card || !p2Card) break;

    // Only one deck of cards, so they can't be equal
    if (p1Card > p2Card) {
      player1 = [...player1, p1Card, p2Card];
    } else {
      player2 = [...player2, p2Card, p1Card];
    }
  }

  return player1.length === 0 ? player2 : player1;
};

const playRecursiveRounds = ({
  player1,
  player2,
}: Players): { winner: number[]; player: number } => {
  const previousRounds: string[] = [];

  while (player1.length !== 0 && player2.length !== 0) {
    if (previousRounds.includes(JSON.stringify({ player1, player2 }))) {
      return { winner: player1, player: 1 };
    }

    previousRounds.push(JSON.stringify({ player1, player2 }));

    const p1Card = player1.shift();
    const p2Card = player2.shift();

    if (!p1Card || !p2Card) break;

    if (player1.length >= p1Card && player2.length >= p2Card) {
      const { player } = playRecursiveRounds({
        player1: player1.slice(0, p1Card),
        player2: player2.slice(0, p2Card),
      });

      if (player === 1) {
        player1 = [...player1, p1Card, p2Card];
      } else {
        player2 = [...player2, p2Card, p1Card];
      }

      continue;
    }

    if (p1Card > p2Card) {
      player1 = [...player1, p1Card, p2Card];
    } else {
      player2 = [...player2, p2Card, p1Card];
    }
  }

  const winner = player1.length === 0 ? player2 : player1;
  const player = player1.length === 0 ? 2 : 1;
  return { winner, player };
};

const calculateScore = (hand: number[]) => {
  let i = 0;
  return hand.reduceRight((a, c) => a + c * ++i, 0);
};

const part1 = (input: string[]) => {
  const winner = playRounds(dealCards(input));

  return calculateScore(winner);
};

const part2 = (input: string[]) => {
  const { winner } = playRecursiveRounds(dealCards(input));

  return calculateScore(winner);
};

export default {
  part1,
  part2,
};
