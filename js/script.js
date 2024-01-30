// HEADER //
const SVGMenuTab = document.querySelector('#menu-responsive')
const MenuTabDrop= document.querySelector('.container-menu-tab')

const SVGAcconutTab = document.querySelector('#svg-account')
const MenuAccountTabDrop= document.querySelector('.container-account-tab')


SVGMenuTab.addEventListener("click", function (event) {
    
    event.stopPropagation();
    
    const menuAberto = MenuTabDrop.style.display === "flex";

    MenuTabDrop.style.display = menuAberto ? "none" : "flex";
    MenuAccountTabDrop.style.display = "none"

    if(MenuAccountTabDrop.style.contains("flex")){
        MenuTabDrop.style("none")
    }
     
});

document.addEventListener("click", function (event) {
    
    if (!MenuTabDrop.contains(event.target) && MenuTabDrop.style.display === "flex") {
        MenuTabDrop.style.display = "none";
    }
});

SVGAcconutTab.addEventListener("click", function (event) {

    event.stopPropagation();
    
    const accountAberto = MenuAccountTabDrop.style.display === "flex";

    MenuAccountTabDrop.style.display = accountAberto ? "none" : "flex";
    MenuTabDrop.style.display = "none"

if(MenuTabDrop.style.contains("flex")){
    MenuAccountTabDrop.style("none")
}
 
});

document.addEventListener("click", function (event) {
    
    if (!MenuAccountTabDrop.contains(event.target) && MenuAccountTabDrop.style.display === "flex") {
        MenuAccountTabDrop.style.display = "none";
    }
});



// SECTION SLIDES //

let currentIndex = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const slidesPerPart = totalSlides / 2; 

function showSlide(index) {
  const slides = document.querySelector('.slides');
  index = (index + totalSlides) % totalSlides;
  currentIndex = index;
  const translation = -index * 100 + '%';
  slides.style.transform = 'translateX(' + translation + ')';
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;


  if (currentIndex === 1) {
    currentIndex+ 0.5;
  }else{
    currentIndex = 0;
  }

  showSlide(currentIndex);
}

function prevSlide() {
  if (currentIndex > 0) {
    showSlide(currentIndex - 1);
  } else {
  
    if (currentIndex >= slidesPerPart) {
      currentIndex = totalSlides - 1;
    }

    showSlide(currentIndex);
  }
}


// Search Produtos //

   
    var produtos = document.querySelectorAll('.produto');


    document.getElementById('searchInput').addEventListener('input', function () {

        var termoPesquisa = this.value.toLowerCase();


        produtos.forEach(function (produto) {
   
            var textoProduto = produto.textContent.toLowerCase();

     
            if (textoProduto.includes(termoPesquisa)) {
               
                produto.style.display = 'flex'; 
            } else {
              
                produto.style.display = 'none';
            }
        });
    });




    // Automatização de Lista de Produtos //


    