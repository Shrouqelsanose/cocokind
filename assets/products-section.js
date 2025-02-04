document.addEventListener("DOMContentLoaded", () => {
  class ProductSelection extends HTMLElement {
    constructor() {
      super();
      this.toast = this.querySelector("#toast");
      this.cart =
        document.querySelector("cart-notification") ||
        document.querySelector("cart-drawer");
    }

    connectedCallback() {
      const addToCartButtons = this.querySelectorAll(".add-to-cart-btn");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) =>
          this.handleSingleAddToCart(event)
        );
      });
    }

    async handleSingleAddToCart(event) {
      const button = event.target;
      const productId = button.dataset.productId;

      if (!productId) {
        this.showToast("Invalid product.");
        return;
      }

      const formData = { items: [{ id: productId, quantity: 1 }] };

      try {
        const response = await fetch(
          `${window.Shopify.routes.root}cart/add.js`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) throw new Error("Failed to add product to cart.");

        this.showToast("Product added to cart!");
      } catch (error) {
        console.error("Error adding product:", error);
        this.showToast("Error adding product to cart.");
      }
    }

    showToast(message) {
      this.toast.textContent = message;
      this.toast.classList.add("show");
      setTimeout(() => this.toast.classList.remove("show"), 3000);
    }
  }

  if (!customElements.get("products-selection")) {
    customElements.define("products-selection", ProductSelection);
  }
});
