// Example gallery data
const galleryItems = [
  {
    type: "image",
    src: "images/tables/Olivetable.jpg",
    title: "Olive Wood Coffee Table"
  },
  {
    type: "image",
    src: "images/tables/Patagoniarosewood.jpg,
    title: "Patagonian Rosewood River Table"
  },
  {
    type: "video",
    src: "images/tables/Olivetablevid.mp4",
    title: "Olive Coffee Table"
  },
  {
    type: "image",
    src: "images/tables/Walnuthallway.jpg",
    title: "Walnut Live Edge"
  }
];

const galleryGrid = document.getElementById("galleryGrid");

galleryItems.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("gallery-card");

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    card.appendChild(img);
  } else if (item.type === "video") {
    const vid = document.createElement("video");
    vid.src = item.src;
    vid.controls = true;
    card.appendChild(vid);
  }

  const caption = document.createElement("p");
  caption.textContent = item.title;
  card.appendChild(caption);

  galleryGrid.appendChild(card);
});
