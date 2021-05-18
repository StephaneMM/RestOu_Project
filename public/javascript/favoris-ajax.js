
let favoris = document.querySelectorAll(".favoris")
console.log(favoris)

favoris.forEach((fav) => {
    fav.addEventListener('click', ()=> {

        if(fav.style.color === "white") {
            fav.style.color = "#C71585"
        } else {
            fav.style.color = "white"
        }

    })
})