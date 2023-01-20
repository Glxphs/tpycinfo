/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, url: { pathname } }) {
  const res = await fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en`);
  const weather = await res.json();
 
  return { weather, pathname };
}