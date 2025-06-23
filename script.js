document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all links with a class that indicates they should trigger smooth scrolling
  // You could also select all <a> tags that have an href starting with '#'
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default jump behavior

      const targetId = this.getAttribute("href"); // Get the href value (e.g., "#about-section")
      const targetElement = document.querySelector(targetId); // Find the element with that ID

      if (targetElement) {
        // Use the scrollIntoView method for smooth scrolling
        targetElement.scrollIntoView({
          behavior: "smooth", // This makes the scroll animated
          block: "start", // Aligns the top of the element with the top of the viewport
        });
      }
    });
  });

  // If you specifically want it for the select element like we discussed before,
  // where the option's value is an ID on the page:
  const contactSelect = document.getElementById("contactRedirect"); // Assuming your select has this ID

  if (contactSelect) {
    contactSelect.addEventListener("change", function () {
      const selectedValue = this.value; // Get the value (e.g., "#services-section")

      // Check if the value starts with '#' and is not empty
      if (selectedValue && selectedValue.startsWith("#")) {
        const targetElement = document.querySelector(selectedValue);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else if (selectedValue) {
        // If it's a full URL (like contact.html), still redirect normally
        window.location.href = selectedValue;
      }
    });
  }
});

let slideIndex = 0; // Keep track of the current slide
let slideshowTimeout; // To store the timeout for automatic progression

const slides = document.querySelectorAll(".slideshow-container .mySlides");
const captions = document.querySelectorAll(".slideshow-container .text");
const dotsContainer = document.querySelector(".dots-container");

// Function to create navigation dots dynamically
function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-index", index);
    dot.addEventListener("click", () => currentSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// Function to show a specific slide
function showSlides() {
  // Hide all slides and captions, deactivate all dots
  slides.forEach((slide) => slide.classList.remove("active"));
  captions.forEach((caption) => caption.classList.remove("active"));
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("active"));

  // Reset timeout to prevent rapid transitions when manually navigating
  clearTimeout(slideshowTimeout);

  // Set the current slide and caption to active (visible)
  if (slides[slideIndex]) {
    // Check if slide exists
    slides[slideIndex].classList.add("active");
    if (captions[slideIndex]) {
      // Check if caption exists
      captions[slideIndex].classList.add("active");
    }
  }

  // Set the corresponding dot to active
  const currentDot = dotsContainer.querySelector(
    `.dot[data-slide-index="${slideIndex}"]`
  );
  if (currentDot) {
    currentDot.classList.add("active");
  }

  // Move to the next slide after a duration
  // Adjust the duration (in milliseconds) here for how long each slide shows
  slideshowTimeout = setTimeout(() => {
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0; // Loop back to the first slide
    }
    showSlides(); // Call itself to show the next slide
  }, 4000); // Change image every 5 seconds (5000 milliseconds)
}

// Function to jump to a specific slide when a dot is clicked
function currentSlide(n) {
  slideIndex = n;
  showSlides(); // Display the selected slide immediately
}

// Initialize slideshow when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  createDots(); // Create dots before showing slides
  showSlides(); // Start the slideshow
});
