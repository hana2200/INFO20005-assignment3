// Wait for the DOM to be fully loaded before executing any code
document.addEventListener("DOMContentLoaded", () => {
    // Set up tab functionality
    setupTabs()
  
    // Set up mobile menu
    setupMobileMenu()
  
    // Set up add to cart functionality
    setupAddToCart()
  })
  
  // Function to set up the tab functionality
  function setupTabs() {
    const tabHeaders = document.querySelectorAll(".tab-header")
  
    tabHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const content = this.nextElementSibling
        const toggle = this.querySelector(".tab-toggle")
  
        if (content.style.display === "block") {
          content.style.display = "none"
          toggle.textContent = "+"
        } else {
          content.style.display = "block"
          toggle.textContent = "−"
        }
      })
    })
  
    // Show first tab content by default
    const firstTabContent = document.querySelector(".tab-content")
    const firstTabToggle = document.querySelector(".tab-toggle")
  
    if (firstTabContent && firstTabToggle) {
      firstTabContent.style.display = "block"
      firstTabToggle.textContent = "−"
    }
  }
  
  // Function to set up mobile menu
  function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuClose = document.querySelector(".mobile-menu-close")
  
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active")
        document.body.style.overflow = "hidden"
      })
  
      mobileMenuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
      })
  
      // Close menu when clicking on a link
      const mobileMenuLinks = document.querySelectorAll(".mobile-menu-nav a")
      mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
          document.body.style.overflow = ""
        })
      })
    }
  }
  
  // Function to set up add to cart functionality
  function setupAddToCart() {
    const addToCartBtn = document.getElementById("add-to-cart-btn")
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        // Get product details
        const productTitle = document.getElementById("product-title").textContent
        const productPriceText = document.getElementById("product-price").textContent
        const productPrice = Number.parseFloat(productPriceText.replace("$", "").trim())
        const productSize = document.getElementById("size-select").value
        const productImage = document.getElementById("product-image").src
  
        // Create cart item
        const cartItem = {
          title: productTitle,
          price: productPrice,
          size: productSize,
          image: productImage,
          quantity: 1,
        }
  
        // Add to cart
        addItemToCart(cartItem)
  
        // Show confirmation
        alert(`${productTitle} (${productSize}) has been added to your cart!`)
  
        // Change button text and style
        addToCartBtn.textContent = "Added To Cart"
        addToCartBtn.style.backgroundColor = "#4a5a48" // Darker green color (same as hover)
      })
    }
  }
  
  // Function to add an item to the cart
  function addItemToCart(item) {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("teaShopCart")) || []
  
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.title === item.title && cartItem.size === item.size)
  
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item if it doesn't exist
      cart.push(item)
    }
  
    // Save updated cart to localStorage
    localStorage.setItem("teaShopCart", JSON.stringify(cart))
  }
  