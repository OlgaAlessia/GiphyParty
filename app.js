//console.log("Let's get this party started!");

const form = document.querySelector('form');
const btn = document.getElementById('remove');

form.addEventListener("submit", function (e) {
    const input = document.querySelector('#search');
    e.preventDefault();

    getGiphy(input.value);
    input.value = '';
})

async function getGiphy(value){
    try{
        const res = await axios.get("http://api.giphy.com/v1/gifs/search", { 
          params : { 
            q: value, 
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
        renderGiphy(res.data.data);
    } catch (e) {
        alert("GIPHY NOT FOUND!");
    }
}

function renderGiphy(giphys) {
    const divGyphy = document.querySelector('#giphy');
    let randomVal = Math.floor(Math.random() * (giphys.length + 1));
    divGyphy.append(makeGyphyImg(giphys[randomVal]))
    btn.classList.add("active"); 
    btn.classList.remove("disable");
}


function makeGyphyImg(giphy) {
    const divCol = document.createElement('div');
    divCol.classList.add("col-md-3");
    divCol.classList.add("divGiphy");

    const newImg = document.createElement('img');
    newImg.classList.add("w-100");
    newImg.src = giphy.images.original.url;
    newImg.alt = giphy.title;

    divCol.append(newImg);
    return divCol;
}



btn.addEventListener("click", function (e) {
    const divContainer = document.getElementById('giphy');
    divContainer.innerHTML = ""; 
    btn.classList.add("disable"); 
    btn.classList.remove("active");
});