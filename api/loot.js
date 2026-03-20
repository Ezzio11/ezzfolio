export default async function handler(req, res) {
  try {
    const { platform } = req.query;
    const baseUrl = 'https://www.gamerpower.com/api/giveaways?sort-by=popularity';
    const apiUrl = platform === 'all' ? baseUrl : `${baseUrl}&platform=${platform}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.length > 0) {
        return res.status(200).json({ loot: data[0] });
    }

    res.status(200).json({ loot: null });
  } catch (error) {
    console.error("Loot API Error:", error);
    res.status(500).json({ error: "Failed to fetch loot" });
  }
}
