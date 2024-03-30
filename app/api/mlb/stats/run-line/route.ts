import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get("https://www.cbssports.com/mlb/standings/");
    const $ = cheerio.load(data);

    let events: any = [];
    const tableRows = $(".TableBase-bodyTr");

    tableRows.map((index: number, row: any) => {
      if ($(row).find("th").length > 0) return;

      let event: any = {};
      const cells = $(row).find("td");

      event.season = "2023";

      // Output the content of each table data
      cells.each((cellIndex, cellElement) => {
        if (cellIndex == 0) {
          event.team = $(cellElement).find(".TeamName").text().trim();
        }

        if (cellIndex == 1) {
          event.wins = parseInt($(cellElement).text().trim());
        }

        if (cellIndex == 2) {
          event.losses = parseInt($(cellElement).text().trim());
        }
        if (cellIndex == 8) {
          event.home = $(cellElement).text().trim();
        }

        if (cellIndex == 9) {
          event.away = $(cellElement).text().trim();
        }

        if (cellIndex == 14) {
          event.streak = $(cellElement).text().trim();
        }
      });

      events.push(event);
    });

    events = events
      .map((ev: any) => {
        if (ev?.streak.split("-").length < 2) {
          return ev;
        }
      })
      .filter((e: any) => e?.streak);

    return Response.json({ events });
  } catch (error: any) {
    return Response.json({ msg: error.message, events: [] });
  }
}
