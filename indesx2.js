// Timezones we want
const tzs = {
ny: { zone: 'America/New_York', timeEl: 'ny-time', dateEl: 'ny-date' },
bj: { zone: 'Asia/Shanghai', timeEl: 'bj-time', dateEl: 'bj-date' },
tk: { zone: 'Asia/Tokyo', timeEl: 'tk-time', dateEl: 'tk-date' },
ros: { zone: 'America/Argentina/Cordoba', timeEl: 'ros-time', dateEl: 'ros-date' }
};


function fmt(d, zone) {
// Format time and date using Intl.DateTimeFormat with timeZone
const time = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: zone }).format(d);
const date = new Intl.DateTimeFormat('es-AR', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: zone }).format(d);
return { time, date };
}


const status = document.getElementById('status');


if (!window.EventSource) {
status.textContent = 'Su navegador no soporta EventSource (SSE).';
} else {
const es = new EventSource('/events');


es.onopen = () => { status.textContent = 'Conectado — recibiendo actualizaciones cada segundo.'; };


es.onerror = (e) => { status.textContent = 'Error en la conexión SSE.'; console.error('SSE error', e); };


es.onmessage = (ev) => {
// Server sends an ISO timestamp: e.g. 2025-09-09T21:00:00.000Z
const iso = ev.data;
const d = new Date(iso);


// Update all clocks
Object.values(tzs).forEach(({zone, timeEl, dateEl}) => {
const {time, date} = fmt(d, zone);
document.getElementById(timeEl).textContent = time;
document.getElementById(dateEl).textContent = date;
});
};
}
