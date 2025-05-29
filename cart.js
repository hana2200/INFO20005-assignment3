// Wait for the DOM to be fully loaded before executing any code
document.addEventListener("DOMContentLoaded", () => {
    // Set up mobile menu
    setupMobileMenu()
  
    // Load cart items
    loadCartItems()
  
    // Update cart count in header
    updateCartCount()
  })
  
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
  
  // Function to load cart items
  function loadCartItems() {
    const cartItemsContainer = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartGrid = document.querySelector(".cart-grid")
    const cartActions = document.querySelector(".cart-actions")
  
    if (!cartItemsContainer || !emptyCartMessage || !cartGrid) return
  
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("teaShopCart")) || []
  
    // Show empty cart message if cart is empty
    if (cart.length === 0) {
      cartGrid.style.display = "none"
      emptyCartMessage.style.display = "block"
      if (cartActions) cartActions.style.display = "none"
      return
    }
  
    // Show cart grid and hide empty cart message
    cartGrid.style.display = "grid"
    emptyCartMessage.style.display = "none"
    if (cartActions) cartActions.style.display = "flex"
  
    // Clear cart items container
    cartItemsContainer.innerHTML = ""
  
    // Generate HTML for each cart item
    let cartHTML = ""
    let subtotal = 0
  
    cart.forEach((item, index) => {
      const itemTotal = Number.parseFloat(item.price) * item.quantity
      subtotal += itemTotal
  
      // Check if we're on mobile
      const isMobile = window.innerWidth <= 576
  
      if (isMobile) {
        // Mobile layout with details grid
        cartHTML += `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Size: ${item.size}</p>
                <button class="remove-item" data-index="${index}" aria-label="Remove item">×</button>
              </div>
            </div>
            <div class="cart-item-details-grid">
              <div class="cart-item-price">
                ${Number.parseFloat(item.price).toFixed(2)}
              </div>
              <div class="cart-item-quantity">
                <div class="quantity-selector">
                  <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                  <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                  <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                </div>
              </div>
              <div class="cart-item-total">
                ${itemTotal.toFixed(2)}
              </div>
            </div>
          </div>
        `
      } else {
        // Desktop layout
        cartHTML += `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Size: ${item.size}</p>
              </div>
            </div>
            <div class="cart-item-price">${Number.parseFloat(item.price).toFixed(2)}</div>
            <div class="cart-item-quantity">
              <div class="quantity-selector">
                <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                <button class="quantity-btn increase-btn" data-index="${index}">+</button>
              </div>
            </div>
            <div class="cart-item-total">${itemTotal.toFixed(2)}</div>
            <button class="remove-item" data-index="${index}" aria-label="Remove item">×</button>
          </div>
        `
      }
    })
  
    // Add cart items to container
    cartItemsContainer.innerHTML = cartHTML
  
    // Calculate tax and total
    const tax = subtotal * 0.075 // 7.5% tax rate
    const total = subtotal + tax
  
    // Update summary values
    document.getElementById("item-count").textContent = cart.length
    document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)}`
    document.getElementById("tax").textContent = `${tax.toFixed(2)}`
    document.getElementById("total").textContent = `${total.toFixed(2)}`
  
    // Add event listeners to quantity buttons and remove buttons
    setupCartButtons()
  }
  
  // Function to set up cart buttons
  function setupCartButtons() {
    // Decrease quantity buttons
    const decreaseButtons = document.querySelectorAll(".decrease-btn")
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        updateCartItemQuantity(index, -1)
      })
    })
  
    // Increase quantity buttons
    const increaseButtons = document.querySelectorAll(".increase-btn")
    increaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        updateCartItemQuantity(index, 1)
      })
    })
  
    // Remove item buttons
    const removeButtons = document.querySelectorAll(".remove-item")
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        removeCartItem(index)
      })
    })
  }
  
  // Function to update cart item quantity
  function updateCartItemQuantity(index, change) {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("teaShopCart")) || []
  
    if (index >= 0 && index < cart.length) {
      // Update quantity
      cart[index].quantity += change
  
      // Ensure quantity is at least 1
      if (cart[index].quantity < 1) {
        cart[index].quantity = 1
      }
  
      // Save updated cart to localStorage
      localStorage.setItem("teaShopCart", JSON.stringify(cart))
  
      // Reload cart items
      loadCartItems()
  
      // Update cart count in header
      updateCartCount()
    }
  }
  
  // Function to remove item from cart
  function removeCartItem(index) {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("teaShopCart")) || []
  
    if (index >= 0 && index < cart.length) {
      // Remove item from cart
      cart.splice(index, 1)
  
      // Save updated cart to localStorage
      localStorage.setItem("teaShopCart", JSON.stringify(cart))
  
      // Reload cart items
      loadCartItems()
  
      // Update cart count in header
      updateCartCount()
    }
  }
  
  // Update cart count in header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("teaShopCart")) || []
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  
    // Update cart count in header if element exists
    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = cartCount
    }
  }
  
  