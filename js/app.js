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

function addActiveClass(newElement, className) {
    // remove active class on the current active section
    const previousActiveElement = document.querySelector(`.${className}`);
    previousActiveElement.classList.remove(`${className}`);

    // add active class to the new section
    newElement.classList.add(className);
}

function scrollAndMakeActive(event) {
    // scroll into view
    const newSectionId = event.target.getAttribute('data-section-id');
    const newSection = document.getElementById(newSectionId);
    newSection.scrollIntoView({behavior: "smooth"}); // This generates a scroll event and the active class is set inside the eventListener.

    const newListItemId = `link${newSectionId.substring(7,8)}`;
    const newListItem = document.getElementById(newListItemId);

    // add active class to the link item
    addActiveClass(newListItem, 'active-link');

}

function scrollEventListener(event) {
    
	sections.forEach(section => {
        if (!isInViewport(section)) {
            return;
        }
        else {
            // add active class for section
            addActiveClass(section, 'active-section');
            
            const newListItemId = `link${section.id.substring(7,8)}`;
            const newListItem = document.getElementById(newListItemId);

            // add active class for list item
            addActiveClass(newListItem, 'active-link');
        }
    })
}

function buildNavBar(navbarListNames) {
    navbarListNames.forEach( (name, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = name;
        listItem.className = (index === 0) ? 'menu__link active-link' : 'menu__link';
        listItem.setAttribute('data-section-id', name.replace(/\s/g, '').toLowerCase());
        listItem.id = `link${index+1}`;
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
