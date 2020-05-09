/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const docFragment = document.createDocumentFragment();

const navbar = document.getElementById('navbar__list');

// convert the HTMLCollection Object to an Array using spread operator
const sections = [...document.getElementsByTagName('section')];

const navbarListNames = getNavbarListItems(sections);
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function getNavbarListItems(sections) {
    return sections.map(section => {
        return section.getAttribute('data-nav');
    });
}

function buildNavBar(navbarListNames) {
    navbarListNames.forEach(name => {
        const listItem = document.createElement('li');
        listItem.innerText = name;
        listItem.className = 'menu__link';
        docFragment.appendChild(listItem);
    });
    navbar.appendChild(docFragment);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNavBar(navbarListNames);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


