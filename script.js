// Sample products data
const products = [
    {
      id: 1,
      name: "Sencha Green Tea",
      category: "Green Tea",
      price: 15.99,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cfGUMpTYyiHg1fhDL0B5UkYp6CyePu.png",
      description:
        "A classic Japanese green tea with a refreshing flavor. This premium tea is steamed to preserve its natural essence, resulting in a bright, grassy taste with subtle sweet notes.",
      origin: "Japan",
    },
    {
      id: 2,
      name: "Earl Grey Black Tea",
      category: "Black Tea",
      price: 14.99,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ttOKpPTQboJCmyCBCCt574T0QkZgX1.png",
      description:
        "A fragrant black tea infused with bergamot oil. Our Earl Grey features premium Ceylon black tea with the perfect balance of citrusy bergamot, creating a sophisticated and uplifting cup.",
      origin: "India",
    },
    {
      id: 3,
      name: "Chamomile Herbal Tea",
      category: "Herbal Tea",
      price: 14.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%282%29-e90TLCS1Ku7TnpUA0KLQZvkTuqZQVo.png",
      description:
        "A soothing herbal tea made from chamomile flowers. This caffeine-free infusion offers a gentle, apple-like sweetness and is renowned for its calming properties, perfect for evening relaxation.",
      origin: "Egypt",
    },
    {
      id: 4,
      name: "Oolong Tea",
      category: "Oolong Tea",
      price: 15.99,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%283%29-YIwhjSJDsZaPr4Zbsw0oSWsZy3oxDJ.png",
      description:
        "A traditional Chinese tea with a unique aroma and taste. Our premium oolong is partially oxidized, creating a complex flavor profile that balances the freshness of green tea with the richness of black tea.",
      origin: "China",
    },
    {
      id: 5,
      name: "Matcha Green Tea",
      category: "Green Tea",
      price: 22.0,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cfGUMpTYyiHg1fhDL0B5UkYp6CyePu.png",
      description:
        "A finely ground powder of green tea leaves, perfect for lattes and smoothies. Our ceremonial grade matcha is stone-ground from shade-grown tea leaves, offering a vibrant green color and rich umami flavor.",
      origin: "Japan",
    },
    {
      id: 6,
      name: "English Breakfast Black Tea",
      category: "Black Tea",
      price: 11.25,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cfGUMpTYyiHg1fhDL0B5UkYp6CyePu.png",
      description:
        "A robust and full-bodied black tea, ideal for starting the day. Our English Breakfast blend combines premium Assam and Ceylon teas, creating a rich, malty flavor that pairs perfectly with milk.",
      origin: "India",
    },
    {
      id: 7,
      name: "Peppermint Herbal Tea",
      category: "Herbal Tea",
      price: 9.5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%282%29-e90TLCS1Ku7TnpUA0KLQZvkTuqZQVo.png",
      description:
        "A refreshing herbal tea with a cool and minty flavor. Made from pure peppermint leaves, this caffeine-free infusion offers an invigorating taste and aroma that soothes the digestive system.",
      origin: "USA",
    },
    {
      id: 8,
      name: "Jasmine Green Tea",
      category: "Green Tea",
      price: 16.5,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cfGUMpTYyiHg1fhDL0B5UkYp6CyePu.png",
      description:
        "Green tea scented with jasmine flowers, creating a delicate and aromatic blend. Our jasmine tea is crafted by layering green tea leaves with fresh jasmine blossoms, allowing the tea to naturally absorb the floral essence.",
      origin: "China",
    },
  ]
  
  // Run when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Update cart count
    updateCartCount()
  
    // Set up mobile menu
    setupMobileMenu()
  
    // Set up product tabs if on product detail page
    setupProductTabs()
  
    // Set up product filters if on products page
    setupProductFilters()
  
    // Check which page we're on and run appropriate functions
    const currentPage = window.location.pathname
  
    if (currentPage.includes("index.html") || currentPage === "/" || currentPage.endsWith("/")) {
      loadFeaturedProducts()
    } else if (currentPage.includes("products.html")) {
      loadAllProducts()
    } else if (currentPage.includes("product-detail.html")) {
      loadProductDetail()
      loadRelatedProducts()
    } else if (currentPage.includes("cart.html")) {
      loadCart()
    } else if (currentPage.includes("checkout.html")) {
      loadCheckout()
      setupCheckoutForm()
    } else if (currentPage.includes("confirmation.html")) {
      showOrderConfirmation()
    }
  })
  
  // Set up product tabs
  function setupProductTabs() {
    const tabButtons = document.querySelectorAll(".tab-button")
    if (!tabButtons.length) return
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and content
        document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"))
        document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked button and corresponding content
        button.classList.add("active")
        const tabId = button.getAttribute("data-tab")
        document.getElementById(`${tabId}-tab`).classList.add("active")
      })
    })
  }
  
  // Set up product filters
  function setupProductFilters() {
    const filterButtons = document.querySelectorAll(".filter-button")
    if (!filterButtons.length) return
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        document.querySelectorAll(".filter-button").forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        // Filter products
        const category = button.getAttribute("data-category")
        if (category === "all") {
          loadAllProducts()
        } else {
          loadAllProducts(category)
        }
      })
    })
  }
  
  // Set up mobile menu
  function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
  
    if (!mobileMenuToggle || !mobileMenu || !mobileMenuClose) return
  
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  
    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  
    // Update mobile cart count
    const mobileCartCount = document.getElementById("cart-count-mobile")
    if (mobileCartCount) {
      const cart = JSON.parse(localStorage.getItem("cart")) || []
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
      mobileCartCount.textContent = itemCount
    }
  }
  
  // Update cart count in header
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll("#cart-count, #cart-count-mobile")
    if (!cartCountElements.length) return
  
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  
    cartCountElements.forEach((element) => {
      element.textContent = itemCount
    })
  }
  
  // Load featured products on home page
  function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById("featured-products")
    if (!featuredProductsContainer) return
  
    // Get first 4 products for featured section
    const featuredProducts = products.slice(0, 4)
  
    let productsHTML = ""
  
    featuredProducts.forEach((product) => {
      productsHTML += `
      <div class="product-card">
        <a href="product-detail.html?id=${product.id}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
        </a>
        <div class="product-info">
          <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `
    })
  
    featuredProductsContainer.innerHTML = productsHTML
  }
  
  // Load all products on products page
  function loadAllProducts(filterCategory = "") {
    const productsGrid = document.getElementById("products-grid")
    if (!productsGrid) return
  
    // Filter products if category is specified
    let filteredProducts = products
  
    if (filterCategory) {
      filteredProducts = products.filter((product) => product.category.toLowerCase().replace(" ", "-") === filterCategory)
    }
  
    // Check URL for category parameter
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get("category")
  
    if (categoryParam) {
      filteredProducts = products.filter((product) => product.category.toLowerCase().replace(" ", "-") === categoryParam)
    }
  
    let productsHTML = ""
  
    filteredProducts.forEach((product) => {
      productsHTML += `
      <div class="product-card">
        <a href="product-detail.html?id=${product.id}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
        </a>
        <div class="product-info">
          <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `
    })
  
    productsGrid.innerHTML = productsHTML
  }
  
  // Load related products
  function loadRelatedProducts() {
    const relatedProductsContainer = document.getElementById("related-products")
    if (!relatedProductsContainer) return
  
    // Get current product ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const productId = Number.parseInt(urlParams.get("id"))
  
    // Find current product
    const currentProduct = products.find((p) => p.id === productId)
    if (!currentProduct) return
  
    // Get products in the same category
    const relatedProducts = products
      .filter((p) => p.category === currentProduct.category && p.id !== productId)
      .slice(0, 3)
  
    let productsHTML = ""
  
    relatedProducts.forEach((product) => {
      productsHTML += `
      <div class="product-card">
        <a href="product-detail.html?id=${product.id}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
        </a>
        <div class="product-info">
          <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `
    })
  
    relatedProductsContainer.innerHTML = productsHTML
  }
  
  // Load product detail page
  function loadProductDetail() {
    const productDetailContainer = document.getElementById("product-detail")
    if (!productDetailContainer) return
  
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const productId = Number.parseInt(urlParams.get("id"))
  
    // Find product by ID
    const product = products.find((p) => p.id === productId)
  
    if (!product) {
      productDetailContainer.innerHTML = "<p>Product not found</p>"
      return
    }
  
    // Update page title
    document.title = `${product.name} - Lupicia Tea`
  
    // Update product name in breadcrumbs
    const productNameElement = document.getElementById("product-name")
    if (productNameElement) {
      productNameElement.textContent = product.name
    }
  
    productDetailContainer.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info-container">
        <h1>${product.name}</h1>
        <div class="product-category">${product.category}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        
        <div class="product-description">
          <p>${product.description}</p>
          <p><strong>Origin:</strong> ${product.origin}</p>
        </div>
        
        <div class="product-options">
          <div class="option-group">
            <label class="option-label">Size</label>
            <div class="option-buttons" id="size-options">
              <button class="option-button" data-size="50g">50g</button>
              <button class="option-button active" data-size="100g">100g</button>
              <button class="option-button" data-size="250g">250g</button>
            </div>
          </div>
          
          <div class="option-group">
            <label class="option-label">Package</label>
            <div class="option-buttons" id="package-options">
              <button class="option-button active" data-package="Tin">Tin</button>
              <button class="option-button" data-package="Refill">Refill Pack</button>
            </div>
          </div>
        </div>
        
        <div class="product-actions">
          <div class="quantity-selector">
            <button class="quantity-btn" id="decrease-quantity">-</button>
            <input type="number" id="quantity" value="1" min="1">
            <button class="quantity-btn" id="increase-quantity">+</button>
          </div>
          
          <button class="btn" id="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
    `
  
    // Set up option buttons
    const sizeButtons = document.querySelectorAll("#size-options .option-button")
    const packageButtons = document.querySelectorAll("#package-options .option-button")
  
    sizeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        sizeButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
      })
    })
  
    packageButtons.forEach((button) => {
      button.addEventListener("click", function () {
        packageButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
      })
    })
  
    // Set up quantity buttons
    const decreaseBtn = document.getElementById("decrease-quantity")
    const increaseBtn = document.getElementById("increase-quantity")
    const quantityInput = document.getElementById("quantity")
  
    decreaseBtn.addEventListener("click", () => {
      const quantity = Number.parseInt(quantityInput.value)
      if (quantity > 1) {
        quantityInput.value = quantity - 1
      }
    })
  
    increaseBtn.addEventListener("click", () => {
      const quantity = Number.parseInt(quantityInput.value)
      quantityInput.value = quantity + 1
    })
  
    // Add to cart button
    const addToCartBtn = document.getElementById("add-to-cart-btn")
  
    addToCartBtn.addEventListener("click", () => {
      const selectedSize = document.querySelector("#size-options .option-button.active").getAttribute("data-size")
      const selectedPackage = document
        .querySelector("#package-options .option-button.active")
        .getAttribute("data-package")
      const quantity = Number.parseInt(quantityInput.value)
  
      addToCart(product.id, selectedSize, selectedPackage, quantity)
    })
  }
  
  // Add product to cart
  function addToCart(productId, size = "100g", packaging = "Tin", quantity = 1) {
    // Find product by ID
    const product = products.find((p) => p.id === productId)
  
    if (!product) return
  
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    // Check if product already exists in cart with same options
    const existingItemIndex = cart.findIndex(
      (item) => item.id === productId && item.size === size && item.packaging === packaging,
    )
  
    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item if product doesn't exist
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: size,
        packaging: packaging,
        quantity: quantity,
      })
    }
  
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
  
    // Update cart count
    updateCartCount()
  
    // Show confirmation
    alert(`${product.name} has been added to your cart!`)
  }
  
  // Load cart page
  function loadCart() {
    const cartContainer = document.getElementById("cart-container")
    const emptyCart = document.getElementById("empty-cart")
    const cartActions = document.getElementById("cart-actions")
  
    if (!cartContainer || !emptyCart || !cartActions) return
  
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (cart.length === 0) {
      cartContainer.style.display = "none"
      emptyCart.style.display = "block"
      cartActions.style.display = "none"
      return
    }
  
    cartContainer.style.display = "block"
    emptyCart.style.display = "none"
    cartActions.style.display = "flex"
  
    let cartHTML = ""
    let subtotal = 0
  
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity
      subtotal += itemTotal
  
      cartHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Size: ${item.size} | Package: ${item.packaging}</p>
        </div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-quantity">
          <div class="cart-quantity">
            <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
            <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantityDirect(${index}, this.value)">
            <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        <button onclick="removeCartItem(${index})" class="remove-btn">Remove</button>
      </div>
      `
    })
  
    cartHTML += `
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${subtotal >= 50 ? "Free" : "$5.99"}</span>
      </div>
      <div class="summary-row">
        <span>Tax (10%)</span>
        <span>$${(subtotal * 0.1).toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${(subtotal + (subtotal < 50 ? 5.99 : 0) + subtotal * 0.1).toFixed(2)}</span>
      </div>
    </div>
    `
  
    cartContainer.innerHTML = cartHTML
  }
  
  // Update cart item quantity
  function updateCartItemQuantity(index, change) {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (index >= 0 && index < cart.length) {
      cart[index].quantity += change
  
      // Ensure quantity is at least 1
      if (cart[index].quantity < 1) {
        cart[index].quantity = 1
      }
  
      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart))
  
      // Reload cart
      loadCart()
  
      // Update cart count
      updateCartCount()
    }
  }
  
  // Update cart item quantity directly
  function updateCartItemQuantityDirect(index, quantity) {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (index >= 0 && index < cart.length) {
      // Ensure quantity is at least 1
      cart[index].quantity = Math.max(1, Number.parseInt(quantity))
  
      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart))
  
      // Reload cart
      loadCart()
  
      // Update cart count
      updateCartCount()
    }
  }
  
  // Remove item from cart
  function removeCartItem(index) {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (index >= 0 && index < cart.length) {
      // Remove item from cart
      cart.splice(index, 1)
  
      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart))
  
      // Reload cart
      loadCart()
  
      // Update cart count
      updateCartCount()
    }
  }
  
  // Load checkout page
  function loadCheckout() {
    const checkoutItemsContainer = document.getElementById("checkout-items")
    const summaryTotalsContainer = document.getElementById("summary-totals")
  
    if (!checkoutItemsContainer || !summaryTotalsContainer) return
  
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (cart.length === 0) {
      // Redirect to cart page if cart is empty
      window.location.href = "cart.html"
      return
    }
  
    let checkoutItemsHTML = ""
    let subtotal = 0
  
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      subtotal += itemTotal
  
      checkoutItemsHTML += `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="checkout-item-info">
          <h3>${item.name}</h3>
          <p>Size: ${item.size} | Package: ${item.packaging}</p>
          <div class="item-price">
            <span>${item.quantity} × $${item.price.toFixed(2)}</span>
            <span>$${itemTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `
    })
  
    checkoutItemsContainer.innerHTML = checkoutItemsHTML
  
    // Calculate totals
    const shipping = subtotal >= 50 ? 0 : 5.99
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax
  
    const summaryHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Tax (10%)</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    `
  
    summaryTotalsContainer.innerHTML = summaryHTML
  }
  
  // Set up checkout form
  function setupCheckoutForm() {
    const checkoutForm = document.getElementById("checkout-form")
    if (!checkoutForm) return
  
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Simple validation
      const requiredFields = checkoutForm.querySelectorAll("[required]")
      let isValid = true
  
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })
  
      if (!isValid) {
        alert("Please fill in all required fields.")
        return
      }
  
      // Generate order number
      const orderNumber = "ORD" + Math.floor(Math.random() * 10000)
  
      // Save order details to localStorage
      localStorage.setItem("orderNumber", orderNumber)
      localStorage.setItem("orderDate", new Date().toLocaleDateString())
  
      // Clear cart
      localStorage.removeItem("cart")
  
      // Redirect to confirmation page
      window.location.href = "confirmation.html"
    })
  }
  
  // Show order confirmation
  function showOrderConfirmation() {
    const orderNumberElement = document.getElementById("order-number")
    const orderDateElement = document.getElementById("order-date")
  
    if (!orderNumberElement || !orderDateElement) return
  
    // Get order details from localStorage
    const orderNumber = localStorage.getItem("orderNumber") || "ORD12345"
    const orderDate = localStorage.getItem("orderDate") || new Date().toLocaleDateString()
  
    orderNumberElement.textContent = orderNumber
    orderDateElement.textContent = orderDate
  
    // Update cart count (should be 0 now)
    updateCartCount()
  }
  
  