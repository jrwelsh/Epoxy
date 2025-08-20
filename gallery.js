// Gallery items (update src paths to your actual files)
const galleryItems = [
  {
    type: "image",
    src: "images/tables/Olivetable.jpg",
    title: "Olive Wood Coffee Table"
  },
  {
    type: "image",
    src: "https://i.imgur.com/2cOaZsJ.jpg",
    title: "Walnut Live Edge"
  },
  {
    type: "video",
    src: "images/tables/Olivetablevid.mp4",
    title: "Olive Coffee Table (Video)"
  },
  {
    type: "image",
    src: "https://i.imgur.com/6kphbP3.jpg",
    title: "Cherry Slab with Blue Epoxy"
  }
];

const galleryGrid = document.getElementById("galleryGrid");

if (!galleryGrid) {
  console.error("Gallery container #galleryGrid not found in HTML.");
} else {
  if (galleryItems.length === 0) {
    galleryGrid.innerHTML = "<p>No gallery items found.</p>";
  } else {
    galleryItems.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("gallery-card");

      if (item.type === "image") {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.title;
        img.loading = "lazy";
        card.appendChild(img);
      } else if (item.type === "video") {
        const vid = document.createElement("video");
        vid.src = item.src;
        vid.controls = true;
        vid.width = 300; // keep consistent size
        card.appendChild(vid);
      }

      const caption = document.createElement("p");
      caption.textContent = item.title;
      card.appendChild(caption);

      galleryGrid.appendChild(card);
    });
  }
}
