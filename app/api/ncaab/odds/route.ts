import axios from "axios";
import cheerio from "cheerio";

export async function GET() {
  try {
    const { data } = await axios.get("https://evanalytics.com/mlb/odds");
    const $ = cheerio.load(data);

    let events: any = [];
    let eventDates: any = [];
    const tableRows = $(".eva-odds-table > tbody > [data-category='Game Line']");
    const dateRows = $(".eva-odds-table > tbody > .eva-odds-date > td");

    dateRows.map((index, el) => eventDates.push({ date: $(el).text().trim(), events: [] }));

    eventDates.map((ev: any, index: number) => {});

    return Response.json({ events, eventDates });
  } catch (error: any) {
    return Response.json({ msg: error.message, events: [] });
  }
}
