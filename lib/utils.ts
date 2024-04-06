import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function convertAmericanToDecimal(odds: number) {
  if (odds > 0) {
    return odds / 100 + 1;
  } else if (odds < 0) {
    return 100 / Math.abs(odds) + 1;
  } else {
    return 1;
  }
}

export const calculateWinProbility = (home_odds: any, away_odds: any) => {
  const home_prob = 1 / convertAmericanToDecimal(parseInt(home_odds));
  const away_prob = 1 / convertAmericanToDecimal(parseInt(away_odds));

  const totalProb = home_prob + away_prob;
  const home = (home_prob / totalProb) * 100;
  const away = (away_prob / totalProb) * 100;

  if (!home_odds || home_odds === "-") return { home: "-", away: "-" };

  return {
    home: `${home.toFixed(2)}%`,
    away: `${away.toFixed(2)}%`,
  };
};
