//https://rapidapi.com/
//Nos permite acceder a muchas APIs
//https://commentpicker.com/youtube-channel-id.php --> nos da el ID del canal
//INSTALAMOS npm install gh-pages --save-dev PARA USAR GIT PAGES
//PAGINA WEB --> https://diego27xd.github.io/async-landing/
//PARA PUBLICARLO en el PACKAGE.JSON AGREGAMOS UN NUEVO SCRIPT, EN EST ECASO DEPLOY
//para luego de subir todo al repo. remoto... publicarlo con npm run deploy
const API='https://youtube-v31.p.rapidapi.com/search?channelId=UCDvtvLLtohQEaMKgMzZTwDQ&part=snippet%2Cid&order=date&maxResults=50'
const content=null||document.getElementById('content');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key':'c68edbdba9mshc3cb6eb8038f3b2p1f444ajsna5de19fe1256',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
//AUTOMATICAMENTE EJECUTA UNA FUNCIÓN
//funcion que se autoinvoca
//cuando cargue el archivo se va a ejecutar
(async ()=>{
    try{
        const videos = await fetchData(API);
        //crearemos un template en html para que itere por los elementos de la respuesta
        //view es esa porcion de html
        //usamos js para iterar 
        //en esta API , para acceder a los videos, se refiere a items, se hace un map para devolver un nuevo arreglo con el template por cada resultado
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
                </h3>
            </div>
            </div>

        `).slice(0, 12).join('')} //SOLO RETORNA 24 DE LOS 12     
        `;
        //AGREGAMOS AL HTML
        content.innerHTML = view;
    }catch (error){
        console.log(error);
    }
})();