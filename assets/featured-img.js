document.addEventListener("DOMContentLoaded", () => {
  if (!customElements.get("featured-tabs-img")) {
    window.customElements.define(
      "featured-tabs-img",
      class extends HTMLElement {
        constructor() {
          super();
          this.currentTab = null;
          this.sliderElement = this.querySelector(
            ".featured-collection__products-container"
          );
          this.swiperInstances = {};
          this.initializeEventListeners();
          this.initializeFirstTab();
        }

        initializeEventListeners() {
          const tabLinks = this.querySelectorAll("[data-tab-target]");
          tabLinks.forEach((tabLink) =>
            tabLink.addEventListener("click", (e) => {
              e.preventDefault();
              const targetTab = tabLink.dataset.tabTarget;
              this.toggleCollection(targetTab);
            })
          );
        }

        initializeFirstTab() {
          const firstTab = this.querySelector(".section-tabs-products__tab"); // Get the first tab
          const firstCollection = this.sliderElement.querySelector(
            ".featured-collection__products"
          );

          if (firstTab && firstCollection) {
            this.currentTab = firstCollection.dataset.tab;

            // Set the first tab as active
            firstTab.classList.add("active");

            // Apply the border to the first tab's image
            const firstTabImage = firstTab.querySelector(
              ".section-tabs-products__image "
            );
            if (firstTabImage) {
              firstTabImage.style.border = "2px solid #000"; // Apply border to first tab's image
            }

            // Show the first collection
            firstCollection.style.display = "flex";
            this.swiperInstances[firstCollection.dataset.tab] =
              this.initializeSwiper(firstCollection);
          }
        }

        toggleCollection(targetTab) {
          if (this.currentTab === targetTab) return;

          this.currentTab = targetTab;

          // Hide all collections and destroy Swiper instances
          const collections = this.sliderElement.querySelectorAll(
            ".featured-collection__products"
          );
          collections.forEach((collection) => {
            const isActive = collection.dataset.tab === targetTab;

            if (this.swiperInstances[collection.dataset.tab] && !isActive) {
              this.swiperInstances[collection.dataset.tab].destroy(true, true);
              delete this.swiperInstances[collection.dataset.tab];
            }

            collection.style.display = isActive ? "flex" : "none"; // Show/Hide collections
            collection.classList.toggle("active", isActive);
          });

          // Ensure the active tab has the active class and apply border to the image
          const tabs = this.querySelectorAll(".section-tabs-products__tab");
          tabs.forEach((tab) => {
            const tabImage = tab.querySelector(".section-tabs-products__image");
            const tablabel = tab.querySelector(
              ".featured-collection__tab label"
            );
            if (
              tab.querySelector("[data-tab-target]").dataset.tabTarget ===
              targetTab
            ) {
              tab.classList.add("active"); // Set this tab as active
              tabImage.style.border = "2px solid #000"; // Active image gets border
              tablabel.style.textDecoration = "underline";
            } else {
              tab.classList.remove("active"); // Remove active class from inactive tabs
              tabImage.style.border = "none";
              tablabel.style.textDecoration = "none";
            }
          });

          // Initialize Swiper for the active collection
          const activeCollection = this.sliderElement.querySelector(
            `.featured-collection__products[data-tab="${targetTab}"]`
          );
          if (activeCollection) {
            setTimeout(() => {
              this.swiperInstances[targetTab] =
                this.initializeSwiper(activeCollection);
              this.swiperInstances[targetTab].update();
            }, 0);
          }
        }

        initializeSwiper(container) {
          return new Swiper(container, {
            slidesPerView: 5,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            centeredSlides: true,
            fixedWidth: 300,
            arrows: true,

            effect: "coverflow",
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 3,
              slideShadows: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            breakpoints: {
              768: {
                slidesPerView: 7,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 9,
                spaceBetween: 0,
              },
            },
          });
        }
      }
    );
  }
});
