export default async function handler(req, res) {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    const { dateFrom, dateTo } = req.query;
    
    if (!dateFrom || !dateTo) {
        return res.status(400).json({ error: "Missing dates" });
    }

    const apiUrl = `https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    
    const response = await fetch(apiUrl, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();

    if (data.matches && data.matches.length > 0) {
        const matches = data.matches;
        
        // Priority Logic (Move logic to server for cleaner frontend)
        const barcaMatch = matches.find(m => 
            m.homeTeam?.id === 81 || m.awayTeam?.id === 81 ||
            m.homeTeam?.shortName === 'Barça' || m.awayTeam?.shortName === 'Barça'
        );
        
        const uclMatch = matches.find(m => m.competition?.code === 'CL');
        const pdMatch = matches.find(m => m.competition?.code === 'PD');
        const plMatch = matches.find(m => m.competition?.code === 'PL');
        
        const finalMatch = barcaMatch || uclMatch || pdMatch || plMatch || matches[0];
        return res.status(200).json({ match: finalMatch });
    }

    res.status(200).json({ match: null });
  } catch (error) {
    console.error("Football API Error:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
}
