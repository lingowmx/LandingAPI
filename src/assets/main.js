const API =
  "https://spotify23.p.rapidapi.com/artist_albums/?id=0L8ExT028jH3ddEcZwqJJ5&offset=1&limit=12";
const content = null || document.getElementById('content')
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5582c27926mshc59fff0c965881bp17f4cdjsn000b5c5914d4",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const albums = await fetchData(API);
    let view = ` 
    ${albums.data.artist.discography.albums.items.map(
      (album) => `
    <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${album.releases.items[0].coverArt.sources[0].url}" alt="${album.releases.items[0].name}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-black">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${album.releases.items[0].name}
          </h3>
        </div>
      </div>
    `)}
      `;
      content.innerHTML = view;
  } catch (error) {
    console.log(error)
  }
})();
