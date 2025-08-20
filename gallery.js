const galleryGrid = document.getElementById("galleryGrid");

fetch("gallery.json")
  .then(res => res.json())
  .then(galleryItems => {
    if (!galleryItems.length) {
      galleryGrid.innerHTML = "<p>No gallery items found.</p>";
      return;
    }

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
        vid.width = 320;
        card.appendChild(vid);
      }

      const caption = document.createElement("p");
      caption.textContent = item.title;
      card.appendChild(caption);

      galleryGrid.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error loading gallery.json:", err);
    galleryGrid.innerHTML = "<p>Could not load gallery.</p>";
  });
