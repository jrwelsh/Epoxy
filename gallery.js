// Example gallery data
const galleryItems = [
  {
    type: "image",
    src: "https://i.imgur.com/E3T4z6h.jpg",
    title: "Oak River Table"
  },
  {
    type: "image",
    src: "https://i.imgur.com/2cOaZsJ.jpg",
    title: "Walnut Live Edge"
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Pouring Epoxy Demo"
  },
  {
    type: "image",
    src: "https://i.imgur.com/6kphbP3.jpg",
    title: "Cherry Slab with Blue Epoxy"
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