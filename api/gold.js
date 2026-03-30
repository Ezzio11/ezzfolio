export default async function handler(req, res) {
  const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json'
  };

  try {
    // 1. Get USD/EGP rate (Using Public ER-API with fallback)
    let egpRate = 50.0;
    try {
      const rateRes = await fetch('https://open.er-api.com/v6/latest/USD', { headers: HEADERS });
      if (!rateRes.ok) throw new Error("Primary API down");
      const rateData = await rateRes.json();
      egpRate = rateData.rates.EGP;
    } catch (e) {
      console.warn("ER-API failed, using fallback source:", e.message);
      try {
        const backupRes = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`, { headers: HEADERS });
        const backupData = await backupRes.json();
        egpRate = backupData.usd.egp;
      } catch (backupError) {
        console.error("Backup Currency API failed:", backupError.message);
        // egpRate remains at the default fallback value 50.0
      }
    }

    // 2. Get Gold Price in USD per ounce
    let goldPriceUsdOunce = null;
    
    // Try Binance first (extremely fast and usually reliable)
    try {
      const binanceRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT', { headers: HEADERS });
      if (binanceRes.ok) {
        const binanceData = await binanceRes.json();
        if (binanceData.price) {
          goldPriceUsdOunce = parseFloat(binanceData.price);
        }
      }
    } catch {
      console.warn("Binance API fetch failed, trying CoinGecko fallback...");
    }

    // Fallback: CoinGecko (PAX Gold)
    if (!goldPriceUsdOunce) {
      try {
        const cgRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd', { headers: HEADERS });
        if (cgRes.ok) {
          const cgData = await cgRes.json();
          if (cgData['pax-gold'] && cgData['pax-gold'].usd) {
            goldPriceUsdOunce = cgData['pax-gold'].usd;
          }
        }
      } catch (e) {
        console.error("CoinGecko fallback failed:", e.message);
      }
    }

    if (!goldPriceUsdOunce) {
        throw new Error("Unable to retrieve gold price from any source");
    }

    // 3. Convert to 21K EGP per gram
    // 1 Troy Ounce = 31.1034768 Grams
    const goldPriceUsdGram = goldPriceUsdOunce / 31.1034768;
    const goldPrice24kEgp = goldPriceUsdGram * egpRate;
    const price21k = goldPrice24kEgp * (21 / 24);
    
    res.status(200).json({ price21k, rate: egpRate });

  } catch (error) {
    console.error("Gold/Finance API Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch financial data",
      message: error.message 
    });
  }
}
