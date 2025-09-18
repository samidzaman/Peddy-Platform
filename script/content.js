// pet categories 
// load categories 

const loadcategories = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displaycategories(data.categories))
    .catch(error => {
      console.log(error)
    })
}
// display categories 
const displaycategories = (categories) => {
  // categories container id call
  const categoriesdiv = document.getElementById('categories_batton')
  categories.forEach(item => {
    // console.log(item)
    // categories to button create 
    const categoriescontainer = document.createElement('div')
    categoriescontainer.innerHTML = ` <button id="${item.
      category_id}" onclick="categorycontent('${item.category}')" class="btn bg-white text-black" > <img src=${item.category_icon} class=w-6 h-6 > ${item.category} </button>`
    categoriesdiv.append(categoriescontainer)

  })
}
loadcategories()


// load All  pet content 
const loadallcontent = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => displayallcontent(data.pets))
    .catch(error => {
      console.log(error)
    })

}

const displayallcontent = (pets) => {
  const Allcontentcontainer = document.getElementById('pet_cnt')
  Allcontentcontainer.innerHTML = ""
  // cat wise content if no availabe
  if (pets.length == 0) {
    Allcontentcontainer.classList.remove("grid")

    Allcontentcontainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="images/error.webp" />
            <h2 class="text-xl font-bold">No Information Available</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> 
            its layout. The point of using Lorem Ipsum is that it has a. </p>
        </div>
    `
    return;
  }

  else {
    Allcontentcontainer.classList.add("grid")
  }





  pets.forEach(pet => {
    const contentcard = document.createElement('div')
    contentcard.classList = "card bg-base-100 w-85  cntcard"
    contentcard.innerHTML = `
   
   
  <figure>
    <img
      src=${pet.image}
      alt="${pet.pet_name}" class="w-full h-full px-8 py-5 rounded-lg" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.pet_name}</h2>
    <div class="flex gap-1"> 
    <div> <img src="images/i1.png" /> </div>
    <div> <p>Breed: ${pet.breed}</p> </div>
    </div>
    <div class="flex gap-1"> 
    <div> <img src="images/i2.png" /> </div>
    <div> <p>Birth: ${pet.date_of_birth}</p> </div>
    </div>
    <div class="flex gap-1"> 
    <div> <img src="images/i3.png" /> </div>
    <div> <p>gender: ${pet.gender}</p> </div>
    </div>
    <div class="flex gap-1"> 
    <div> <img src="images/i4.png" /> </div>
    <div> <p>Price: ${pet.price}</p> </div>
    </div>
    
    <div class="fles justify-between">
      <button class="btn cart-btn"> <img src="images/like.png" /></button>
      <button class="btn">Adopt</button>
      <button onclick="loadpetdetails('${pet.petId}')" class="btn">Details</button>
    </div>
  </div>

   `
    Allcontentcontainer.append(contentcard)

    // ADD TO CART BUTTON
    const CartButton = contentcard.querySelector(".cart-btn")
    CartButton.addEventListener("click", () => {
      const AddtoCartarea = document.getElementById("addcart")
      const LikedImage = document.createElement("img")
      LikedImage.src = pet.image
      LikedImage.alt = pet.pet_name
      LikedImage.classList = "w-24 h-24 object-cover rounded-md border-white p-1"
      AddtoCartarea.appendChild(LikedImage)
    })


  })



}
// category wise Content
const categorycontent = (categoryName) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((data) => displayallcontent(data.data))

}


loadallcontent()




// // pet deails function 
const loadpetdetails = async (petData) => {
  console.log(petData)
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petData}`
  const res = await fetch(uri);
  const data = await res.json()
  console.log(data)
  displaydetails(data.petData);

}

const displaydetails = (petData) => {
  const detailsContainer = document.getElementById('detailsarea')
  detailsContainer.innerHTML = `
    <img src=${petData.image}  />
    <p> ${petData.pet_details} </p>
  `
  document.getElementById('customModal').showModal()
}





// Mobile menu 
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

