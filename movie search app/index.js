const APIURL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH =  "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const moviebox = document.querySelector("#movie-box");

    const getmovies =async(api)=>{
        const response = await fetch(api);
        const data = await response.json();
        showmovies(data);
    }

    getmovies(APIURL);

    const showmovies = (data) =>{
        moviebox.innerHTML="";

        data.results.forEach(
            (item) => {
                const imagePath = item.poster_path === null ? "img-not-found.png" : IMGPATH + item.poster_path;
                
                const box = document.createElement("div");
                box.classList.add("box");
                box.innerHTML=`
                <img src="${IMGPATH + item.poster_path}" alt="">
                <div class="overlay">
                    <div class="title">
                        <h2>${item.original_title}</h2>
                        <span>${item.vote_average}</span>
                    </div>
                    <h3>overview:</h3>
                    <p>
                    ${item.overview}   
                    </p>
                </div>
            </div>
                `;
                moviebox.appendChild(box);
            }
        )
    }

    document.querySelector("#search").addEventListener(
        "keyup",
        function(event){
            if(event.target.value !=""){
                getmovies(SEARCHAPI + event.target.value);
            }
            else{
                getmovies(APIURL);
            }
        }
    )

    