import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function RamadanCountdown() {
    const [timeLeft, setTimeLeft] = useState(null);
    const [nextPrayer, setNextPrayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("Cairo");

    useEffect(() => {
        const fetchTimings = async (lat, lng, cityName = null) => {
            try {
                const date = new Date();
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

                let url;
                if (lat && lng) {
                    url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=5`;
                } else {
                    url = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=Cairo&country=Egypt&method=5`;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (data.code === 200) {
                    const timings = data.data.timings;
                    setTimings(timings); // Store for interval
                    calculateTimeLeft(timings); // Initial calc
                    if (cityName) setCity(cityName);
                    else if (lat && lng) setCity("Local");
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch prayer times:", error);
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchTimings(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        console.warn("Geolocation denied/failed, falling back to Cairo.", error);
                        setCity("Cairo");
                        fetchTimings(null, null, "Cairo");
                    }
                );
            } else {
                setCity("Cairo");
                fetchTimings(null, null, "Cairo");
            }
        };

        getLocation();

        // Refresh API daily or periodically (every hour) to catch date change
        const refreshInterval = setInterval(() => {
            getLocation();
        }, 3600000);

        return () => clearInterval(refreshInterval);
    }, []);

    const [timings, setTimings] = useState(null);

    useEffect(() => {
        if (!timings) return;
        const infoInterval = setInterval(() => {
            calculateTimeLeft(timings);
        }, 1000);
        return () => clearInterval(infoInterval);
    }, [timings]);


    const calculateTimeLeft = (timings) => {
        const now = new Date();

        const getMinutes = (timeStr) => {
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
        };

        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        const maghribMinutes = getMinutes(timings.Maghrib);
        const fajrMinutes = getMinutes(timings.Fajr);

        // Convert target times to seconds for smooth countdown
        let targetSeconds, nextName;

        if (currentMinutes < fajrMinutes) {
            targetSeconds = fajrMinutes * 60;
            nextName = "Suhoor";
        } else if (currentMinutes < maghribMinutes) {
            targetSeconds = maghribMinutes * 60;
            nextName = "Iftar";
        } else {
            targetSeconds = (fajrMinutes + 24 * 60) * 60; // Next day Fajr approx
            nextName = "Suhoor";
        }

        let diff = targetSeconds - currentSeconds;
        if (diff < 0) diff += 24 * 3600;

        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;

        const hoursStr = h < 10 ? `0${h}` : h;
        const minsStr = m < 10 ? `0${m}` : m;
        const secsStr = s < 10 ? `0${s}` : s;

        setTimeLeft(`${hoursStr}:${minsStr}:${secsStr}`);
        setNextPrayer(nextName);
    };

    if (loading) return null;

    return (
        <div className="animate-fade-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--terminal-bg)',
            border: '1px solid var(--grid-line)',
            borderRadius: '50px',
            padding: '6px 14px', /* Slightly smaller padding */
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            color: 'var(--ramadan-gold)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.75rem', /* Slightly smaller font */
            width: 'fit-content',
            height: 'fit-content'
        }}>
            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.7 }}>
                <MapPin size={14} />
                <span style={{ textTransform: 'uppercase' }}>{city}</span>
            </div>

            {/* Vertical Separator */}
            <div style={{ width: '1px', height: '12px', background: 'var(--grid-line)' }}></div>

            {/* Countdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.7 }}>{nextPrayer}:</span>
                <span style={{
                    fontWeight: 'bold',
                    color: 'var(--text-main)',
                    letterSpacing: '1px'
                }}>
                    {timeLeft || "--:--:--"}
                </span>
            </div>
        </div>
    );
}
