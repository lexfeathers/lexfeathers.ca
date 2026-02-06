if (document.readyState === "loading") {
//   DOM hasn't loaded
  document.addEventListener("DOMContentLoaded", getImages);
} else {
//   DOM has already loaded
  getImages();
}

function getImages() {
  const images = document.querySelectorAll('[data-type="image"] img');  
  
  images.forEach((image, index) => {
    image.id = `image-lightbox-${index}`;
    image.addEventListener("click", lightbox);

});
}

function lightbox() {
    this.classList.toggle("lightbox");
}

// Toggle lightbox class off when using escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // IKOV: in = keys, of = values
        for (const element of document.getElementsByClassName("lightbox")) {
            element.classList.remove("lightbox");
        }
    }
});
