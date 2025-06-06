const key = "BX9Y8ynrNhkZ-mx3ZmGonrRHQ6GHONzOlfFWfJexwS8";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResultDiv = document.querySelector(".search-results");
const showButtonEl = document.getElementById("show-button");
let page = 1;

async function searchImages() {
  let inputVal = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputVal}&client_id=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultDiv.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultDiv.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showButtonEl.addEventListener("click",() => {
    searchImages();
})
