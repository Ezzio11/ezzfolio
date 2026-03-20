export default async function handler(req, res) {
  try {
    // 1. Get USD/EGP rate
    const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
    const rateData = await rateRes.json();
    const egpRate = rateData.rates.EGP;

    // 2. Get Gold Price in USD per ounce (XAU)
    const apiKey = process.env.METAL_API_KEY;
    const metalRes = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU`);
    const metalData = await metalRes.json();
    
    if (!metalData.rates || !metalData.rates.XAU) {
        throw new Error("Invalid metal data");
    }

    const goldPriceUsdOunce = 1 / metalData.rates.XAU; 
    
    // 3. Convert to 21K EGP per gram
    const goldPriceUsdGram = goldPriceUsdOunce / 31.1034768;
    const goldPrice24kEgp = goldPriceUsdGram * egpRate;
    const price21k = goldPrice24kEgp * (21 / 24);
    
    res.status(200).json({ price21k, rate: egpRate });

  } catch (error) {
    console.error("Gold API Error:", error);
    res.status(500).json({ error: "Failed to fetch gold price" });
  }
}
