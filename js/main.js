const openMenuBtn = document.getElementById("menu-open");
const closeMenuBtn = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const schemeToggleElem = document.getElementById("scheme-toggle");
const schemeToggleElemMob = document.getElementById("scheme-toggle-mobile");
const schemeIMGs = Array.from(document.getElementsByClassName("scheme-img"));
const cursorCanvas = document.getElementById("cursor-canvas");


// light and dark color scheme toggle
function toggleScheme(e) {
    clicked = e.target;
    var state = clicked.getAttribute('class');
    console.log(state);

    if (state.includes("light")) {
        document.documentElement.setAttribute('data-theme', 'dark');
        clicked.classList.remove("light");
        clicked.classList.add("dark");
        clicked.innerHTML = feather.icons['sun'].toSvg();

        schemeIMGs.forEach(img => {
            var src = img.getAttribute('src');
            var srcUpdated = src.replace('-dark', '-light');

            img.setAttribute('src', srcUpdated);
        });
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        clicked.classList.remove("dark");
        clicked.classList.add("light");
        clicked.innerHTML = feather.icons['moon'].toSvg();

        schemeIMGs.forEach(img => {
            var src = img.getAttribute('src');
            var srcUpdated = src.replace('-light', '-dark');

            img.setAttribute('src', srcUpdated);
        });
    }
}


// open and close mobile menu
function toggleMobileMenu(e) {
    if (e.target == openMenuBtn) {
        mobileMenu.style.transform = "translateX(0)";
    } else {
        mobileMenu.style.transform = "translateX(100%)";
    }
}

//detect touch screen devices to disable custom cursor
function customCursorControl() {
    if ( is_touch_enabled() ) {
        cursorCanvas.style.display = "none";
    }
}

//detects touh devices
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}


customCursorControl();

schemeToggleElem.addEventListener('click', toggleScheme, false);
schemeToggleElemMob.addEventListener('click', toggleScheme, false);
openMenuBtn.addEventListener('click', toggleMobileMenu, false);
closeMenuBtn.addEventListener('click', toggleMobileMenu, false);