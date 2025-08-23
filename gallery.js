// gallery.js
document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("galleryGrid");

  fetch("gallery.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load gallery.json");
      }
      return response.json();
    })
    .then((items) => {
      galleryGrid.innerHTML = ""; // Clear old content

      items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "gallery-card";

        let media;
        if (item.type === "video") {
          media = document.createElement("video");
          media.src = item.src;
          media.controls = true;
        } else {
          media = document.createElement("img");
          media.src = item.src;
          media.alt = item.title;
        }

        media.className = "gallery-media"; // ✅ add a common class for styling
        card.appendChild(media);

        const caption = document.createElement("div");
        caption.className = "gallery-caption";

        const title = document.createElement("h3");
        title.textContent = item.title.replace(/_/g, " "); // convert underscores to spaces
        caption.appendChild(title);

        if (item.price) {
          const price = document.createElement("p");
          price.className = "gallery-price";
          price.textContent = `Price: ${item.price}`;
          caption.appendChild(price);
        }

        if (item.status) {
          const status = document.createElement("p");
          status.className = `gallery-status ${
            item.status.toLowerCase() === "sold" ? "sold" : "available"
          }`;
          status.textContent =
            item.status.toLowerCase() === "sold"
              ? "Status: SOLD"
              : "Status: Available";
          caption.appendChild(status);
        }

        card.appendChild(caption);
        galleryGrid.appendChild(card);
      });
    })
    .catch((error) => {
      console.error(error);
      galleryGrid.innerHTML = "<p>Could not load gallery.</p>";
    });
});
