
let favoris = document.querySelectorAll(".favoris")
console.log(favoris)

favoris.forEach((fav) => {
    fav.addEventListener('click', ()=> {
        let restaurant = fav.dataset.restou
        let user = document.querySelector("#user_id").innerHTML
        let favoris = document.querySelector("#favoris").innerHTML.split(",")
        
        if(fav.style.color === "white") {
            fav.style.color = "#C71585"
            axios.post(`/users/wish-list`, null, { params: {
                restaurant: restaurant,
                user: user,
                favoris: favoris

              }})
              .then(response => console.log(response.status))
              .catch(err => console.warn(err));


            
        } else {
            fav.style.color = "white"
            axios.patch(`/users/wish-list-delete`, null, { params: {
                restaurant: restaurant,
                user: user,
                favoris: favoris

              }})
              .then(response => console.log(response.status))
              .catch(err => console.warn(err));


        }

    })
})