import { CleanData } from "@/lib/cleanData";
import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get("https://www.oddsshark.com/nba/odds");
    const $ = cheerio.load(data);

    let events: any = [];
    const game_rows = $(
      "body > div.dialog-off-canvas-main-canvas > div.layout-container > main > div.layout-content > div > article > div > div.layout--max-width-1088px.layout.layout--onecol > div > div.block.block-oddsshark-data-blocks.block-odds-block > div > div > div:nth-child(2) > .odds--group__event-container"
    );

    game_rows.map((_, game) => {
      const home_team = $(game).find(".odds--group__event-participants > div:nth-child(2) > a > span").text().trim();
      const away_team = $(game).find(".odds--group__event-participants > div:nth-child(4) > a > span").text().trim();
      const kickoff = $(game).find(".odds--group__event-time").text().trim();

      //   Home team
      const home_spreads = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .first-row > .odds-spread > div:nth-child(1)")
        .attr("data-odds-spread");

      const home_spreads_odds = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .first-row > .odds-spread > div:nth-child(2)")
        .attr("data-odds-signed-spread");

      const home_moneyline = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .first-row > .odds-moneyline > div:nth-child(1)")
        .attr("data-odds-moneyline");

      const home_totals = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .first-row > .odds-total > div:nth-child(1)")
        .attr("data-odds-total");
      const home_totals_odds = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .first-row > .odds-total > div:nth-child(2)")
        .attr("data-odds-overprice");

      // Away team
      const away_spreads = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .second-row > .odds-spread > div:nth-child(1)")
        .attr("data-odds-spread");

      const away_spreads_odds = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .second-row > .odds-spread > div:nth-child(2)")
        .attr("data-odds-signed-spread");

      const away_moneyline = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .second-row > .odds-moneyline > div:nth-child(1)")
        .attr("data-odds-moneyline");

      const away_totals = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .second-row > .odds-total > div:nth-child(1)")
        .attr("data-odds-total");

      const away_total_odds = $(game)
        .find(".odds--group__event-books > div:nth-child(1) > .second-row > .odds-total > div:nth-child(2)")
        .attr("data-odds-underprice");

      const odds = {
        spreads: {
          full_game: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.fullgame ?? "-",
              spread: CleanData(home_spreads)?.fullgame ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.fullgame ?? "-",
              spread: CleanData(away_spreads)?.fullgame ?? "-",
            },
          },
          first_half: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.firsthalf ?? "-",
              spread: CleanData(home_spreads)?.firsthalf ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.firsthalf ?? "-",
              spread: CleanData(away_spreads)?.firsthalf ?? "-",
            },
          },
          second_half: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.secondhalf ?? "-",
              spread: CleanData(home_spreads)?.secondhalf ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.secondhalf ?? "-",
              spread: CleanData(away_spreads)?.secondhalf ?? "-",
            },
          },
          first_quarter: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.firstquarter ?? "-",
              spread: CleanData(home_spreads)?.firstquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.firstquarter ?? "-",
              spread: CleanData(away_spreads)?.firstquarter ?? "-",
            },
          },
          second_quarter: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.secondquarter ?? "-",
              spread: CleanData(home_spreads)?.secondquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.secondquarter ?? "-",
              spread: CleanData(away_spreads)?.secondquarter ?? "-",
            },
          },
          third_quarter: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.thirdquarter ?? "-",
              spread: CleanData(home_spreads)?.thirdquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.thirdquarter ?? "-",
              spread: CleanData(away_spreads)?.thirdquarter ?? "-",
            },
          },
          fourth_quarter: {
            home_team: {
              odds: CleanData(home_spreads_odds)?.fourthquarter ?? "-",
              spread: CleanData(home_spreads)?.fourthquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_spreads_odds)?.fourthquarter ?? "-",
              spread: CleanData(away_spreads)?.fourthquarter ?? "-",
            },
          },
        },
        totals: {
          full_game: {
            home_team: {
              odds: CleanData(home_totals_odds)?.fullgame ?? "-",
              points: CleanData(home_totals)?.fullgame ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.fullgame ?? "-",
              points: CleanData(away_totals)?.fullgame ?? "-",
            },
          },
          first_half: {
            home_team: {
              odds: CleanData(home_totals_odds)?.firsthalf ?? "-",
              points: CleanData(home_totals)?.firsthalf ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.firsthalf ?? "-",
              points: CleanData(away_totals)?.firsthalf ?? "-",
            },
          },
          second_half: {
            home_team: {
              odds: CleanData(home_totals_odds)?.secondhalf ?? "-",
              points: CleanData(home_totals)?.secondhalf ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.secondhalf ?? "-",
              points: CleanData(away_totals)?.secondhalf ?? "-",
            },
          },
          first_quarter: {
            home_team: {
              odds: CleanData(home_totals_odds)?.firstquarter ?? "-",
              points: CleanData(home_totals)?.firstquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.firstquarter ?? "-",
              points: CleanData(away_totals)?.firstquarter ?? "-",
            },
          },
          second_quarter: {
            home_team: {
              odds: CleanData(home_totals_odds)?.secondquarter ?? "-",
              points: CleanData(home_totals)?.secondquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.secondquarter ?? "-",
              points: CleanData(away_totals)?.secondquarter ?? "-",
            },
          },
          third_quarter: {
            home_team: {
              odds: CleanData(home_totals_odds)?.thirdquarter ?? "-",
              points: CleanData(home_totals)?.thirdquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.thirdquarter ?? "-",
              points: CleanData(away_totals)?.thirdquarter ?? "-",
            },
          },
          fourth_quarter: {
            home_team: {
              odds: CleanData(home_totals_odds)?.fourthquarter ?? "-",
              points: CleanData(home_totals)?.fourthquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_total_odds)?.fourthquarter ?? "-",
              points: CleanData(away_totals)?.fourthquarter ?? "-",
            },
          },
        },
        moneyline: {
          full_game: {
            home_team: { odds: CleanData(home_moneyline)?.fullgame ?? "-" },
            away_team: { odds: CleanData(away_moneyline)?.fullgame ?? "-" },
          },
          first_half: {
            home_team: { odds: CleanData(home_moneyline)?.firsthalf ?? "-" },
            away_team: { odds: CleanData(away_moneyline)?.firsthalf ?? "-" },
          },
          second_half: {
            home_team: { odds: CleanData(home_moneyline)?.secondhalf ?? "-" },
            away_team: { odds: CleanData(away_moneyline)?.secondhalf ?? "-" },
          },
          first_quarter: {
            home_team: {
              odds: CleanData(home_moneyline)?.firstquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_moneyline)?.firstquarter ?? "-",
            },
          },
          second_quarter: {
            home_team: {
              odds: CleanData(home_moneyline)?.secondquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_moneyline)?.secondquarter ?? "-",
            },
          },
          third_quarter: {
            home_team: {
              odds: CleanData(home_moneyline)?.thirdquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_moneyline)?.thirdquarter ?? "-",
            },
          },
          fourth_quarter: {
            home_team: {
              odds: CleanData(home_moneyline)?.fourthquarter ?? "-",
            },
            away_team: {
              odds: CleanData(away_moneyline)?.fourthquarter ?? "-",
            },
          },
        },
      };

      events.push({ home_team, away_team, kickoff, odds });
    });

    return Response.json({ events });
  } catch (error: any) {
    return Response.json({ msg: error.message, events: [] });
  }
}
