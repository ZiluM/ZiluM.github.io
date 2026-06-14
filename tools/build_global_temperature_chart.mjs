import fs from 'node:fs';

const csv = fs.readFileSync('data/hadcrut5_global_annual.csv', 'utf8').trim();
const [headerLine, ...lines] = csv.split(/\r?\n/).filter(Boolean);
const headers = headerLine.split(',');

const rows = lines.map((line) => {
  const values = line.split(',');
  const row = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  return {
    year: Number(row.Time),
    anomaly: Number(row['Anomaly (deg C)']),
    low: Number(row['Lower confidence limit (2.5%)']),
    high: Number(row['Upper confidence limit (97.5%)']),
  };
}).filter((row) => row.year >= 1850 && row.year <= 2025);

const baselineRows = rows.filter((row) => row.year >= 1850 && row.year <= 1900);
const baseline = baselineRows.reduce((sum, row) => sum + row.anomaly, 0) / baselineRows.length;
const series = rows.map((row) => ({
  year: row.year,
  value: row.anomaly - baseline,
  low: row.low - baseline,
  high: row.high - baseline,
}));

const moving = series.map((row, index) => {
  const start = Math.max(0, index - 4);
  const end = Math.min(series.length - 1, index + 4);
  const window = series.slice(start, end + 1);
  return {
    year: row.year,
    value: window.reduce((sum, item) => sum + item.value, 0) / window.length,
  };
});

const latest = series[series.length - 1];
const width = 640;
const height = 380;
const margin = { top: 42, right: 34, bottom: 58, left: 58 };
const plotW = width - margin.left - margin.right;
const plotH = height - margin.top - margin.bottom;
const xMin = 1850;
const xMax = 2025;
const yMin = -0.45;
const yMax = 1.65;

function x(year) {
  return margin.left + ((year - xMin) / (xMax - xMin)) * plotW;
}

function y(value) {
  return margin.top + ((yMax - value) / (yMax - yMin)) * plotH;
}

function path(points, valueKey = 'value') {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(point.year).toFixed(2)},${y(point[valueKey]).toFixed(2)}`).join(' ');
}

function uncertaintyPath(points) {
  const upper = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(point.year).toFixed(2)},${y(point.high).toFixed(2)}`);
  const lower = points.slice().reverse().map((point) => `L${x(point.year).toFixed(2)},${y(point.low).toFixed(2)}`);
  return `${upper.join(' ')} ${lower.join(' ')} Z`;
}

function tickLineY(value) {
  const yy = y(value).toFixed(2);
  return `<line class="grid" x1="${margin.left}" x2="${width - margin.right}" y1="${yy}" y2="${yy}" />`;
}

function tickLabelY(value) {
  return `<text class="axis-label" x="${margin.left - 10}" y="${(y(value) + 4).toFixed(2)}" text-anchor="end">${value.toFixed(1)}</text>`;
}

function tickLineX(year) {
  const xx = x(year).toFixed(2);
  return `<line class="grid" x1="${xx}" x2="${xx}" y1="${margin.top}" y2="${height - margin.bottom}" />`;
}

function tickLabelX(year) {
  return `<text class="axis-label" x="${x(year).toFixed(2)}" y="${height - margin.bottom + 24}" text-anchor="middle">${year}</text>`;
}

const yTicks = [-0.4, 0, 0.4, 0.8, 1.2, 1.6];
const xTicks = [1850, 1900, 1950, 2000, 2025];

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Global temperature change since 1850</title>
  <desc id="desc">HadCRUT5 annual global mean temperature anomalies from 1850 to 2025, rebased relative to the 1850-1900 average.</desc>
  <defs>
    <linearGradient id="warmingLine" x1="0%" x2="100%" y1="0%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="42%" stop-color="#0f766e" />
      <stop offset="72%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#dc2626" />
    </linearGradient>
    <style>
      .background { fill: #f8fafc; }
      .title { fill: #0f172a; font: 700 24px Tahoma, Geneva, Verdana, sans-serif; }
      .subtitle { fill: #475569; font: 14px Tahoma, Geneva, Verdana, sans-serif; }
      .axis-label { fill: #475569; font: 12px Tahoma, Geneva, Verdana, sans-serif; }
      .axis-title { fill: #334155; font: 700 13px Tahoma, Geneva, Verdana, sans-serif; }
      .grid { stroke: #cbd5e1; stroke-width: 1; opacity: 0.62; }
      .axis { stroke: #64748b; stroke-width: 1.2; }
      .uncertainty { fill: #0ea5e9; opacity: 0.14; }
      .annual { fill: none; stroke: #94a3b8; stroke-width: 1.25; opacity: 0.55; }
      .smooth { fill: none; stroke: url(#warmingLine); stroke-width: 4.2; stroke-linecap: round; stroke-linejoin: round; }
      .zero { stroke: #334155; stroke-width: 1.25; stroke-dasharray: 4 5; opacity: 0.55; }
      .latest-dot { fill: #dc2626; stroke: #ffffff; stroke-width: 3; }
      .callout { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
      .callout-text { fill: #0f172a; font: 700 15px Tahoma, Geneva, Verdana, sans-serif; }
      .source { fill: #64748b; font: 11px Tahoma, Geneva, Verdana, sans-serif; }
      @media (prefers-color-scheme: dark) {
        .background { fill: #111827; }
        .title, .callout-text { fill: #f8fafc; }
        .subtitle, .axis-label, .axis-title, .source { fill: #cbd5e1; }
        .grid { stroke: #334155; opacity: 0.82; }
        .axis { stroke: #94a3b8; }
        .callout { fill: #1f2937; stroke: #334155; }
        .annual { stroke: #94a3b8; opacity: 0.45; }
        .zero { stroke: #cbd5e1; opacity: 0.44; }
      }
    </style>
  </defs>

  <rect class="background" width="${width}" height="${height}" rx="18" />
  <text class="title" x="${margin.left}" y="28">Global Temperature Change</text>
  <text class="subtitle" x="${margin.left}" y="50">HadCRUT5 annual mean, relative to 1850-1900</text>

  <g>
    ${yTicks.map(tickLineY).join('\n    ')}
    ${xTicks.map(tickLineX).join('\n    ')}
    <line class="zero" x1="${margin.left}" x2="${width - margin.right}" y1="${y(0).toFixed(2)}" y2="${y(0).toFixed(2)}" />
    <line class="axis" x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height - margin.bottom}" />
    <line class="axis" x1="${margin.left}" x2="${width - margin.right}" y1="${height - margin.bottom}" y2="${height - margin.bottom}" />
    ${yTicks.map(tickLabelY).join('\n    ')}
    ${xTicks.map(tickLabelX).join('\n    ')}
    <text class="axis-title" x="${margin.left}" y="${height - 16}">Year</text>
    <text class="axis-title" transform="translate(18 ${margin.top + plotH / 2}) rotate(-90)">Temperature anomaly (°C)</text>
  </g>

  <path class="uncertainty" d="${uncertaintyPath(series)}" />
  <path class="annual" d="${path(series)}" />
  <path class="smooth" d="${path(moving)}" />

  <circle class="latest-dot" cx="${x(latest.year).toFixed(2)}" cy="${y(latest.value).toFixed(2)}" r="6" />
  <g transform="translate(${width - 190} ${margin.top + 18})">
    <rect class="callout" width="150" height="64" rx="10" />
    <text class="callout-text" x="14" y="25">${latest.year}: +${latest.value.toFixed(2)}°C</text>
    <text class="source" x="14" y="47">9-yr smooth highlighted</text>
  </g>
  <text class="source" x="${width - margin.right}" y="${height - 16}" text-anchor="end">Data: Met Office HadCRUT5 v5.1</text>
</svg>
`;

fs.writeFileSync('assets/global_temperature_timeseries.svg', svg);
console.log(`Wrote assets/global_temperature_timeseries.svg with ${series.length} annual values; latest complete year ${latest.year} = +${latest.value.toFixed(2)} C relative to 1850-1900.`);
