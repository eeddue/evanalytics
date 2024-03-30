import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get("https://theathletic.com/college-basketball/standings");
    const $ = cheerio.load(data);

    let events: any = [];
    const tableRows = $("table > .table-body > .table-body-row");

    tableRows.map((index: number, row: any) => {
      let event: any = {};
      const cells = $(row).find("td");

      // Output the content of each table data
      cells.each((cellIndex, cellElement) => {
        if (cellIndex == 0) {
          event.team = $(cellElement).find(".fsRoow").text().trim();
        }

        if (cellIndex == 1) {
          event.conference = $(cellElement).find("div").text().trim();
        }

        if (cellIndex == 3) {
          const stats = $(cellElement).find("div").text().trim();
          event.wins = stats.split("-")[0];
          event.losses = stats.split("-")[1];
        }

        if (cellIndex == 4) {
          event.streak = $(cellElement).find("div").text().trim();
        }

        if (cellIndex == 6) {
          event.home = $(cellElement).find("div").text().trim();
        }

        if (cellIndex == 7) {
          event.away = $(cellElement).find("div").text().trim();
        }
      });

      events.push(event);
    });

    return Response.json({ events });
  } catch (error: any) {
    return Response.json({ msg: error.message, events: [] });
  }
}
