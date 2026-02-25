import React from 'react';

const TICKER_TEXT =
  'Delhi Prices +12% YoY  |  Gurgaon +15% YoY  |  Aerocity +18% YoY  |  South Delhi +10% YoY  |  Noida +9% YoY  |  Dwarka Expressway +14% YoY  |  Greater Noida +11% YoY  |  Faridabad +8% YoY';

export default function MarketTicker() {
  return (
    <div
      className="market-ticker"
      style={{
        height: '32px',
        background: '#111',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 100,
        borderBottom: '1px solid #2a2a2a',
      }}
    >
      <div className="ticker-track">
        <span className="ticker-content">{TICKER_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="ticker-content">{TICKER_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
