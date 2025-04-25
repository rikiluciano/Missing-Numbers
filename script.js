 document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tabla-numeros');

// Crear la tabla  
for (let i = 0; i < 100; i += 10) {  
  const thead = document.createElement('thead');  
  const filaTh = document.createElement('tr');  
  for (let j = i; j < i + 10; j++) {  
    const th = document.createElement('th');  
    th.align = 'center';  
    th.textContent = j.toString().padStart(2, '0');  
    filaTh.appendChild(th);  
  }  
  thead.appendChild(filaTh);  
  tabla.appendChild(thead);  
  
  const tbody = document.createElement('tbody');  
  const filaTd = document.createElement('tr');  
  for (let j = i; j < i + 10; j++) {  
    const td = document.createElement('td');  
    td.id = j.toString().padStart(2, '0');  
    td.align = 'center';  
    td.innerHTML = '&nbsp;';  
    filaTd.appendChild(td);  
  }  
  tbody.appendChild(filaTd);  
  tabla.appendChild(tbody);  
}  
  
// CONFIG JSONBIN  
const binId = '67fc06fa8960c979a5844eda';  
const masterKey = '$2a$10$R47nF8Jwysp8tum8vhlkAOq/QNQz2Y7zY3UnvE5qEfAFuQDIQHhs6';  
const accessKey = '$2a$10$NV5uk0VSWvnyVwTRSo228exXdxhD5YHsAmpQDB3z.jZec0yH2ckam';  
  
// Lista de Feeds y Aliases  
const feeds = [  
  { url: "https://enloteria.com/rss/anguilla-9am", alias: "Anguilla 9 AM" },  
  { url: "https://enloteria.com/rss/anguilla-10am", alias: "Anguilla 10 AM" },  
  { url: "https://enloteria.com/rss/anguilla-11am", alias: "Anguilla 11 AM" },  
  { url: "https://enloteria.com/rss/anguilla-12pm", alias: "Anguilla 12 PM" },  
  { url: "https://enloteria.com/rss/la-primera", alias: "La Primera día" },  
  { url: "https://enloteria.com/rss/lotedom", alias: "LoteDom" },  
  { url: "https://enloteria.com/rss/king-lottery-dia", alias: "King Lottery Día" },  
  { url: "https://enloteria.com/rss/la-suerte", alias: "La Suerte" },  
  { url: "https://enloteria.com/rss/real", alias: "La Real" },  
  { url: "https://enloteria.com/rss/anguilla-1pm", alias: "Anguilla 1 PM" },  
  { url: "https://enloteria.com/rss/florida-tarde", alias: "Florida Tarde" },  
  { url: "https://enloteria.com/rss/anguilla-2pm", alias: "Anguilla 2 PM" },  
  { url: "https://enloteria.com/rss/gana-mas", alias: "Gana Más" },  
  { url: "https://enloteria.com/rss/new-york-tarde", alias: "New York Tarde" },  
  { url: "https://enloteria.com/rss/anguilla-3pm", alias: "Anguilla 3 PM" },  
  { url: "https://enloteria.com/rss/anguilla-4pm", alias: "Anguilla 4 PM" },  
  { url: "https://enloteria.com/rss/anguilla-5pm", alias: "Anguilla 5 PM" },  
  { url: "https://enloteria.com/resultados-anguilla-6pm-hoy", alias: "Anguilla 6 PM" },  
  { url: "https://enloteria.com/rss/la-suerte-6pm", alias: "La Suerte 6 PM" },  
  { url: "https://enloteria.com/rss/anguilla-7pm", alias: "Anguilla 7 PM" },  
  { url: "https://enloteria.com/rss/king-lottery-noche", alias: "King Lottery Noche" },  
  { url: "https://enloteria.com/rss/loteka", alias: "Loteka" },  
  { url: "https://enloteria.com/rss/anguilla-8pm", alias: "Anguilla 8 PM" },  
  { url: "https://enloteria.com/rss/la-primera-noche", alias: "La Primera Noche" },  
  { url: "https://enloteria.com/rss/leidsa", alias: "Leidsa" },  
  { url: "https://enloteria.com/rss/anguilla-9pm", alias: "Anguilla 9 PM" },  
  { url: "https://enloteria.com/rss/nacional-noche", alias: "Nacional Noche" },  
  { url: "https://enloteria.com/rss/florida-noche", alias: "Florida Noche" },  
  { url: "https://enloteria.com/rss/new-york-noche", alias: "New York Noche" }  
];  
  
// Mostrar conteo en la tabla  
function mostrarConteo(conteo) {  
  for (let i = 0; i < 100; i++) {  
    const numero = i.toString().padStart(2, '0');  
    const celda = document.getElementById(numero);  
    let cantidadTotal = 0;  
    // Buscar conteo total entre todos los feeds (alias)
    for (const alias in conteo) {
      cantidadTotal += conteo[alias][numero] || 0;
    }
    celda.textContent = cantidadTotal > 0 ? cantidadTotal : '';  
  }  
}  
  
// Cargar datos desde JSONBin  
async function cargarDesdeBin() {  
  try {  
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {  
      headers: {  
        'X-Master-Key': masterKey,  
        'X-Access-Key': accessKey  
      }  
    });  
    if (!res.ok) throw new Error('No se pudo cargar el bin');  
    const data = await res.json();  
    return data.record;  
  } catch (error) {  
    console.error('Error al cargar bin:', error);  
    return null;  
  }  
}  
  
// Guardar en JSONBin  
async function guardarEnBin(data) {  
  try {  
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {  
      method: 'PUT',  
      headers: {  
        'Content-Type': 'application/json',  
        'X-Master-Key': masterKey,  
        'X-Access-Key': accessKey  
      },  
      body: JSON.stringify(data)  
    });  
    const result = await res.json();  
    console.log('Datos actualizados en JSONBin:', result);  
  } catch (error) {  
    console.error('Error al guardar en bin:', error);  
  }  
}  
  
// Procesar todos los feeds RSS  
async function procesarTodosLosFeeds() {  
  const estructura = await cargarDesdeBin();  
  if (!estructura) return;  
  
  const conteo = estructura.conteo || {};  
  const itemsProcesados = estructura.itemsProcesados || [];  
  
  let seActualizo = false;  
  
  for (const feed of feeds) {  
    try {  
      const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(feed.url));  
      const data = await res.json();  
      const xml = new DOMParser().parseFromString(data.contents, 'text/xml');  
      const items = xml.querySelectorAll('item');  
  
      items.forEach(item => {  
        const title = item.querySelector('title')?.textContent || '';  
        const pubDate = item.querySelector('pubDate')?.textContent || '';  
  
        if (!title.toLowerCase().includes('hoy:') || !pubDate) return;  
        if (itemsProcesados.includes(pubDate)) return;  
  
        const match = title.match(/hoy[:\s]*([\d]{2})[-,\s]+([\d]{2})[-,\s]+([\d]{2})/i);  
        if (!match) return;  
  
        const numeros = match.slice(1);  
        // Guardar los números bajo el alias correspondiente
        if (!conteo[feed.alias]) conteo[feed.alias] = { "ConteoEnPrimera": {}, "ConteoAll": {} };
        const conteoAlias = conteo[feed.alias];
  
        numeros.forEach(num => {  
          conteoAlias.ConteoAll[num] = (conteoAlias.ConteoAll[num] || 0) + 1;  
          conteoAlias.ConteoEnPrimera[num] = (conteoAlias.ConteoEnPrimera[num] || 0) + 1;  
        });  
  
        itemsProcesados.push(pubDate);  
        seActualizo = true;  
      });  
    } catch (error) {  
      console.error(`Error al procesar feed ${feed.alias}:`, error);  
    }  
  }  
  
  if (seActualizo) {  
    await guardarEnBin({ conteo, itemsProcesados });  
  }  
  
  mostrarConteo(conteo);  
}  
  
// INICIO  
procesarTodosLosFeeds();
}