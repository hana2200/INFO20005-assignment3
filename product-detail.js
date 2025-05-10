document.addEventListener("DOMContentLoaded", () => {
    // Tab functionality
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
    if (document.querySelector(".tab-content")) {
      document.querySelector(".tab-content").style.display = "block"
      document.querySelector(".tab-toggle").textContent = "−"
    }
  
    // Add to cart functionality
    const addToCartBtn = document.getElementById("add-to-cart-btn")
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        const productTitle = document.getElementById("product-title").textContent
        const productPrice = document.getElementById("product-price").textContent
        const productSize = document.getElementById("size-select").value
        const productImage = document.getElementById("product-image").src
  
        // Create cart item object
        const cartItem = {
          title: productTitle,
          price: productPrice,
          size: productSize,
          image: productImage,
          quantity: 1,
        }
  
        // Get existing cart or create new one
        const cart = JSON.parse(localStorage.getItem("lupiciaCart")) || []
  
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex((item) => item.title === cartItem.title && item.size === cartItem.size)
  
        if (existingItemIndex > -1) {
          // Update quantity if item exists
          cart[existingItemIndex].quantity += 1
        } else {
          // Add new item if it doesn't exist
          cart.push(cartItem)
        }
  
        // Save cart to localStorage
        localStorage.setItem("lupiciaCart", JSON.stringify(cart))
  
        // Show confirmation
        alert(`${productTitle} (${productSize}) has been added to your cart!`)
      })
    }
  
    // Mobile menu functionality
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
  })
  
  