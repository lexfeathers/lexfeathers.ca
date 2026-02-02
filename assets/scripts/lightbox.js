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