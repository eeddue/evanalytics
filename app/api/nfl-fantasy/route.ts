import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://www.pff.com/news/fantasy-football-2024-rankings-post-nfl-free-agency-top-200"
    );
    const $ = cheerio.load(data);

    let players: any = [];
    const tableRows = $(".g-table-wrapper > table > tbody > tr");

    tableRows.map((index: number, row: any) => {
      if (index > 0 && index < 21) {
        let tableD: any = {};
        const cells = $(row).find("td");

        // Output the content of each table data
        cells.each((cellIndex, cellElement) => {
          if (cellIndex == 1) {
            tableD.position = $(cellElement).text();
          }

          if (cellIndex == 2) {
            tableD.name = $(cellElement).text();
          }

          if (cellIndex == 3) {
            tableD.team = $(cellElement).text();
          }

          if (cellIndex == 4) {
            tableD.position_rank = $(cellElement).text();
          }
        });

        players.push(tableD);
      }
    });

    return Response.json({ players });
  } catch (error: any) {
    return Response.json({ msg: error.message, players: [] });
  }
}
