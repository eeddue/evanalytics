export type EventProps = {
  time: string;
  home_team: string;
  away_team: string;
  spreads: {
    home: {
      spread: string;
      odds: string;
    };
    away: {
      spread: string;
      odds: string;
    };
  };
  totals: {
    over: {
      points: string;
      odds: string;
    };
    under: {
      points: string;
      odds: string;
    };
  };
  money_line: {
    home: string;
    away: string;
  };
  win_probability: {
    home: string;
    away: string;
  };
};
