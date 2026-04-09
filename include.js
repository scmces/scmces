// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  loadPartials();
});

async function loadPartials() {
  console.log('Loading partials...');
  
  const partials = [
    { id: 'header', file: 'partials/header.html' },
    { id: 'navbar', file: 'partials/navbar.html' },
    { id: 'footer', file: 'partials/footer.html' }
  ];
  
  try {
    // Load all partials
    for (const partial of partials) {
      await loadPartial(partial.id, partial.file);
    }
    
    console.log('All partials loaded');
    
    // Initialize navbar functionality
    initNavbar();
    
  } catch (error) {
    console.error('Error loading partials:', error);
  }
}

async function loadPartial(id, file) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Element #${id} not found`);
      return;
    }
    
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }
    
    const html = await response.text();
    element.innerHTML = html;
    console.log(`Loaded ${file}`);
    
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = `
        <div style="padding: 10px; background: #ffebee; color: #c62828; border-radius: 4px;">
          Error loading ${file}
        </div>
      `;
    }
  }
}

function initNavbar() {
  console.log('Initializing navbar...');
  
  const navbar = document.querySelector('.navbar');
  const banner = document.querySelector('.brandrow');
  
  if (!navbar) {
    console.error('Navbar not found!');
    return;
  }
  
  if (!banner) {
    console.warn('Banner (.brandrow) not found. Sticky nav may not work correctly.');
  }
  
  // 1. Sticky navbar functionality
  if (banner) {
    const bannerHeight = banner.offsetHeight;
    let navbarHeight = navbar.offsetHeight;
    
    // Update on resize
    window.addEventListener('resize', function() {
      navbarHeight = navbar.offsetHeight;
    });
    
    // Scroll event
    window.addEventListener('scroll', function() {
      if (window.scrollY >= bannerHeight) {
        navbar.classList.add('sticky');
        document.body.style.paddingTop = navbarHeight + 'px';
      } else {
        navbar.classList.remove('sticky');
        document.body.style.paddingTop = '0';
      }
    });
    
    // Trigger once to set initial state
    setTimeout(() => {
      if (window.scrollY >= bannerHeight) {
        navbar.classList.add('sticky');
        document.body.style.paddingTop = navbar.offsetHeight + 'px';
      }
    }, 100);
  }
  
  // 2. Active link highlighting
  highlightActiveLink();
}

function highlightActiveLink() {
  const currentPage = getCurrentPage();
  console.log(`Current page: ${currentPage}`);
  
  const navLinks = document.querySelectorAll('.navbar .nav a');
  console.log(`Found ${navLinks.length} nav links`);
  
  // First remove any existing active classes
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    // Also check if it's a dropbtn
    if (link.classList.contains('dropbtn')) {
      link.classList.remove('active');
    }
  });
  
  // Add active class to matching links
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (linkHref) {
      // Simple matching logic
      if (linkHref === currentPage) {
        link.classList.add('active');
        console.log(`Active: ${linkHref}`);
      }
      // For index page
      else if (currentPage === '' && linkHref === 'index.html') {
        link.classList.add('active');
        console.log(`Active (index): ${linkHref}`);
      }
      // For pages without .html extension in URL
      else if (currentPage.includes(linkHref.replace('.html', '')) && 
               linkHref !== 'index.html' && 
               linkHref !== currentPage) {
        // Check if this is a parent page (like services.html when on services.html#sdc)
        const linkPage = linkHref.split('#')[0];
        const currentPageBase = currentPage.split('#')[0];
        
        if (currentPageBase === linkPage) {
          link.classList.add('active');
          console.log(`Active (hash match): ${linkHref}`);
        }
      }
    }
  });
}

function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  
  // Handle index page
  if (page === '' || page === '/' || page.includes('index')) {
    return 'index.html';
  }
  
  return page;
}

// Re-run highlight on hash changes (for anchor links)
window.addEventListener('hashchange', highlightActiveLink);