import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get("https://www.teamrankings.com/ncf/standings/");
    const $ = cheerio.load(data);

    let events: any = [];
    const tableRows = $("tr");

    tableRows.map((index: number, row: any) => {
      if ($(row).find("th").length > 0) return;

      let event: any = {};
      const cells = $(row).find("td");

      event.season = "2023";

      // Output the content of each table data
      cells.each((cellIndex, cellElement) => {
        if (cellIndex == 0) {
          event.team = $(cellElement).find("a").text().trim();
        }

        if (cellIndex == 1) {
          event.rank = parseInt($(cellElement).text().trim());
        }

        if (cellIndex == 2) {
          const stats = $(cellElement).text().trim();
          event.wins = stats.split("-")[0];
          event.losses = stats.split("-")[1];
        }

        if (cellIndex == 6) {
          event.home = $(cellElement).text().trim();
        }

        if (cellIndex == 7) {
          event.away = $(cellElement).text().trim();
        }

        if (cellIndex == 8) {
          event.streak = $(cellElement).text().trim();
        }
      });

      events.push(event);
    });

    events = events.sort((a: any, b: any) => a.rank - b.rank);

    return Response.json({ events });
  } catch (error: any) {
    return Response.json({ msg: error.message, events: [] });
  }
}
