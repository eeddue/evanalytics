import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get("https://evanalytics.com/ncaaf/odds");
    const $ = cheerio.load(data);

    let events: any = [];
    const tableRows = $(".eva-odds-table > tbody > [data-category='Game Line']");

    tableRows.map((index: number, row: any) => {
      let event: any = {};
      const cells = $(row).find("td");

      // Output the content of each table data
      cells.each((cellIndex, cellElement) => {
        if (cellIndex == 0) {
          event.time = $(cellElement).find(".eva-odds-row-line").text().trim();
        }

        if (cellIndex == 1) {
          event.home_team = $(cellElement).find(".eva-odds-row-line-team:nth-child(1)").text().trim();
          event.away_team = $(cellElement).find(".eva-odds-row-line-team:nth-child(2)").text().trim();
        }

        if (cellIndex == 3) {
          event.spreads = {
            home: {
              spread: $(cellElement).find("div:nth-child(1) span:first-child").text().trim(),
              odds: $(cellElement).find("div:nth-child(1) span:last-child").text().trim(),
            },
            away: {
              spread: $(cellElement).find("div:nth-child(2) span:first-child").text().trim(),
              odds: $(cellElement).find("div:nth-child(2) span:last-child").text().trim(),
            },
          };
        }

        if (cellIndex == 4) {
          event.totals = {
            over: {
              points: $(cellElement).find("div:nth-child(1) span:nth-child(1)").text().trim(),
              odds: $(cellElement).find("div:nth-child(1) span:nth-child(2)").text().trim(),
            },
            under: {
              points: $(cellElement).find("div:nth-child(2) span:nth-child(1)").text().trim(),
              odds: $(cellElement).find("div:nth-child(2) span:nth-child(2)").text().trim(),
            },
          };
        }

        if (cellIndex == 5) {
          event.money_line = {
            home: $(cellElement).find("div:nth-child(1)").text().trim(),
            away: $(cellElement).find("div:nth-child(2)").text().trim(),
          };
        }

        if (cellIndex == 6) {
          event.win_probability = {
            home: $(cellElement).find("div:nth-child(1)").text().trim(),
            away: $(cellElement).find("div:nth-child(2)").text().trim(),
          };
        }
      });

      events.push(event);
    });

    return Response.json({ events });
  } catch (error: any) {
    return Response.json({ msg: error.message, events: [] });
  }
}