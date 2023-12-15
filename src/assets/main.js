document.addEventListener("DOMContentLoaded", function(){
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
    function scrollToSection(event){
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection){
            targetSection.scrollIntoView({behavior: 'smooth'});
        }
    }
});

let scrolltoTop = document.getElementById("toTopButton");
window.addEventListener("scroll", function(){
    if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
        scrolltoTop.style.display = "block";
    } else{
        scrolltoTop.style.display = "none";
    }
});
scrolltoTop.addEventListener("click", function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
})

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
          <h2 class="text-lg text-black mx-auto">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${album.releases.items[0].name}
          </h2>
        </div>
      </div>
    `) .slice(0, 8).join("")}
      `;
      content.innerHTML = view;
  } catch (error) {
    console.log(error)
  }
})();
