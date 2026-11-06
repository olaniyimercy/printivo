// Responsive homepage navigation
const menuButton = document.getElementById("menu");
const menuList = document.getElementById("menu-list");

if (menuButton && menuList) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  menuList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuList.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Personalised welcome message
const welcomeText = document.getElementById("welcome-text");
if (welcomeText) {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    welcomeText.textContent =
      user && typeof user.name === "string" && user.name.trim()
        ? `Hi ${user.name.trim()}, welcome back.`
        : "Welcome to Printivo.";
  } catch (error) {
    console.warn("Could not read saved user information:", error);
    welcomeText.textContent = "Welcome to Printivo.";
  }
}

// Logout actions
function outBtn() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "signin.html";
}

function createBack() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Load demo products and render responsive product cards.
async function getUser() {
  const productsContainer = document.getElementById("products-grid");
  if (!productsContainer) return;

  productsContainer.innerHTML =
    '<div class="loading-state">Loading products<span class="loading-dots">...</span></div>';

  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);

    const products = await response.json();
    if (!Array.isArray(products))
      throw new Error("The products response was not valid.");

    productsContainer.replaceChildren();

    products.slice(0, 8).forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      const imageWrap = document.createElement("div");
      imageWrap.className = "product-image-wrap";

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title || "Product image";
      image.loading = "lazy";
      image.onerror = () => {
        image.alt = "Product image unavailable";
        image.style.opacity = "0.25";
      };
      imageWrap.appendChild(image);

      const category = document.createElement("p");
      category.className = "product-category";
      category.textContent = product.category || "Popular product";

      const title = document.createElement("h2");
      title.textContent = product.title || "Untitled product";

      const price = document.createElement("p");
      price.textContent = `From $${Number(product.price || 0).toFixed(2)}`;

      card.append(imageWrap, category, title, price);
      productsContainer.appendChild(card);
    });

    if (!products.length) {
      productsContainer.innerHTML =
        '<p class="loading-state">No products are available right now.</p>';
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML =
      '<p class="loading-state">We could not load the demo products. Please check your internet connection and refresh the page.</p>';
  }
}

// Search the product cards currently displayed on the page.
const searchForm = document.getElementById("hero-search-form");
const searchInput = document.getElementById("product-search");
if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = !query || card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    const toolbar = document.querySelector(
      ".product-toolbar > span:first-child",
    );
    if (toolbar && cards.length) {
      toolbar.textContent = query
        ? `${visibleCount} matching product${visibleCount === 1 ? "" : "s"}`
        : "Customer favourites";
    }

    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  });
}

getUser();
