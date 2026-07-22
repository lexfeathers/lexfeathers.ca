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

function lightbox(this: HTMLImageElement) {
	this.classList.toggle("lightbox");
}

document.addEventListener("keydown", function (event) {
	// Toggle lightbox class off when using escape key
	if (event.key === "Escape") {
		// IKOV: in = keys, of = values
		for (const element of document.getElementsByClassName("lightbox")) {
			element.classList.remove("lightbox");
		}
	} else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
		const direction = event.key === "ArrowRight" ? 1 : -1;
		const currentLightbox = document
			.getElementsByClassName("lightbox")
			?.item(0);

		if (currentLightbox == null) return;

		const imageGrid = currentLightbox.parentElement?.parentElement;

		if (
			imageGrid?.attributes.getNamedItem("data-type")?.value !=
			"image-grid"
		)
			return;

		const lightboxImages = imageGrid.querySelectorAll("img");

		let currentLightboxIndex = -1;

		lightboxImages.forEach((image: HTMLImageElement, index) => {
			if (image === currentLightbox) {
				currentLightboxIndex = index;
			}
		});

		if (currentLightboxIndex == -1) return;

		let nextLightboxIndex = currentLightboxIndex + direction;

		if (nextLightboxIndex < 0) {
			nextLightboxIndex = lightboxImages.length - 1;
		} else if (nextLightboxIndex == lightboxImages.length) {
			nextLightboxIndex = 0;
		}

		lightboxImages.item(currentLightboxIndex).classList.remove("lightbox");
		lightboxImages.item(nextLightboxIndex).classList.add("lightbox");
	}
});
