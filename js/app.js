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

function addActiveClass(newElement) {
    // remove active class on the current active section
    document.querySelector(".active-section").classList.remove("active-section");

    // add active class to the new section
    newElement.className = 'active-section';
}

function scrollAndMakeActive(event) {
    // scroll into view
    const newSectionId = event.target.getAttribute('data-section-id');
    const newSection = document.getElementById(newSectionId);
    newSection.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

    // add active class to this new section
    addActiveClass(newSection);

}

function scrollEventListener(event) {
    
	sections.forEach(section => {
        if (!isInViewport(section)) {
            return;
        }
        else {
            addActiveClass(section);
        }
    })
}

function buildNavBar(navbarListNames) {
    navbarListNames.forEach(name => {
        const listItem = document.createElement('li');
        listItem.innerText = name;
        listItem.className = 'menu__link';
        listItem.setAttribute('data-section-id', name.replace(/\s/g, '').toLowerCase());
        listItem.addEventListener('click', scrollAndMakeActive);
        docFragment.appendChild(listItem);
    });
    navbar.appendChild(docFragment);
}

/*!
 * Determine if an element is in the viewport
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}    elem The element
 * @return {Boolean}      Returns true if element is in the viewport
 */
function isInViewport (elem) {
	const distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNavBar(navbarListNames);

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', scrollEventListener);
