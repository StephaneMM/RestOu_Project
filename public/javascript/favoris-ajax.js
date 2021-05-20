
let favoris = document.querySelector(".favoris")
console.log(favoris)

if(favoris !== null) {
    favoris.addEventListener('click', (event)=> {
        console.log(event.target.dataset.restou)
        let restaurant = event.target.dataset.restou
       
        if(event.target.style.color === "white") {
            event.target.style.color = "#C71585"
            axios.post(`/users/wish-list`, null, { params: {
                restaurant: restaurant,


                }})
                .then(response => console.log(response.status))
                .catch(err => console.warn(err));


            
        } else {
            event.target.style.color = "white"
            axios.patch(`/users/wish-list-delete`, null, { params: {
                restaurant: restaurant,


                }})
                .then(response => console.log(response.status))
                .catch(err => console.warn(err));


        }

    })

}
