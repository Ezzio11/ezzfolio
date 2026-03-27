export default async function handler(req, res) {
  try {
    // 1. Get USD/EGP rate (Using Public ER-API with fallback)
    let egpRate = 50.0;
    try {
      const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!rateRes.ok) throw new Error("Primary API down");
      const rateData = await rateRes.json();
      egpRate = rateData.rates.EGP;
    } catch (e) {
      console.warn("ER-API failed, using fallback source:", e.message);
      // Fallback: Fawaz Ahmed's Currency API (JSDelivr)
      const date = new Date().toISOString().split('T')[0];
      const backupRes = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`);
      const backupData = await backupRes.json();
      egpRate = backupData.usd.egp;
    }

    // 2. Get Gold Price in USD per ounce (Using Binance PAXG/USDT as proxy)
    // PAX Gold (PAXG) is 1:1 with one fine troy ounce of gold.
    // Extremely reliable, keyless, and free.
    const binanceRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT');
    const binanceData = await binanceRes.json();
    
    if (!binanceData.price) {
        throw new Error("Invalid Binance data");
    }

    const goldPriceUsdOunce = parseFloat(binanceData.price); 
    
    // 3. Convert to 21K EGP per gram
    // 1 Troy Ounce = 31.1034768 Grams
    const goldPriceUsdGram = goldPriceUsdOunce / 31.1034768;
    const goldPrice24kEgp = goldPriceUsdGram * egpRate;
    const price21k = goldPrice24kEgp * (21 / 24);
    
    res.status(200).json({ price21k, rate: egpRate });

  } catch (error) {
    console.error("Gold/Finance API Error:", error);
    res.status(500).json({ error: "Failed to fetch financial data" });
  }
}
