export default async function handler(req, res) {
  try {
    const API_KEY = process.env.NEWS_API_KEY;

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Failed to fetch news",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("News API error:", error);

    return res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}