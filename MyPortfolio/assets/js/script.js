"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// resume modal functions
function openResume() {
  const resumeModal = document.getElementById('resumeModal');
  const iframe = document.getElementById('resumeIframe');
  const imagePreview = document.getElementById('resumeImagePreview');
  
  resumeModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Check if we're on file:// protocol or local server
  const isFileProtocol = window.location.protocol === 'file:';
  
  // If file protocol, show image preview immediately since PDFs won't work
  if (isFileProtocol) {
    iframe.style.display = 'none';
    imagePreview.style.display = 'block';
  } else {
    // Try to load PDF first
    let pdfLoaded = false;
    
    iframe.onload = function() {
      pdfLoaded = true;
      iframe.style.display = 'block';
      imagePreview.style.display = 'none';
    };
    
    iframe.onerror = function() {
      console.log('PDF failed to load, showing image preview');
      iframe.style.display = 'none';
      imagePreview.style.display = 'block';
    };
    
    // Fallback after timeout
    setTimeout(() => {
      if (!pdfLoaded) {
        iframe.style.display = 'none';
        imagePreview.style.display = 'block';
      }
    }, 1000);
  }
}

function closeResume() {
  const resumeModal = document.getElementById('resumeModal');
  resumeModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeResume();
  }
});

// Handle resume download
document.addEventListener('DOMContentLoaded', function() {
  const downloadBtn = document.querySelector('.resume-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      
      // Try multiple methods to ensure download works
      const resumeUrl = './assets/gyanaprakashsahoo_resume.pdf';
      const fileName = 'Gyana_Prakash_Resume.pdf';
      
      // Method 1: Try direct download
      try {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download feedback
        const span = this.querySelector('span');
        const originalText = span.textContent;
        span.textContent = 'Downloading...';
        
        setTimeout(() => {
          span.textContent = originalText;
        }, 2000);
        
      } catch (error) {
        // Method 2: If download fails, open in new tab
        console.log('Direct download failed, opening in new tab');
        window.open(resumeUrl, '_blank');
        
        // Show feedback
        const span = this.querySelector('span');
        const originalText = span.textContent;
        span.textContent = 'Opening...';
        
        setTimeout(() => {
          span.textContent = originalText;
        }, 2000);
      }
    });
  }
});

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Mouse tracking for radial glow effect
document.addEventListener('mousemove', function(e) {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', x + '%');
  document.documentElement.style.setProperty('--mouse-y', y + '%');
});
