var storeName = "Shop";
var username = "Neel";

function loadUI() {
    loadDashboard();
    loadNavBar();
}

function loadDashboard() {
    document.body.innerHTML = "";
}

function loadNavBar() {
    var navbarItems = ["Dashboard","Settings","Profile"];
    
    var navbar = document.createElement("NAV");
    navbar.className = "navbar navbar-inverse navbar-fixed-top";
    document.body.appendChild(navbar);
    
    var container = document.createElement("DIV");
    container.className = "container-fluid";
    navbar.appendChild(container);
    
    var navbarHeader = document.createElement("NAV");
    navbarHeader.className = "navbar-header";
    container.appendChild(navbarHeader);
    
    var a = document.createElement("A");
    a.setAttribute("href", "#");
    a.className = "navbar-brand";
    a.appendChild(document.createTextNode(storeName));
    navbarHeader.appendChild(a);
    
    var nav = document.createElement("DIV");
    nav.className = "navbar-collapse collapse";
    
    var navListDropdown = document.createElement("UL");
    navListDropdown.className = "nav navbar-nav";
    var dropdown = document.createElement("li");
    dropdown.className = "dropdown";
    var a2 = document.createElement("A");
    a2.setAttribute("id","drop1");
    a2.setAttribute("href","#");
    a2.setAttribute("data-toggle","dropdown");
    a2.setAttribute("aria-haspopop","true");
    a2.setAttribute("role","button");
    a2.setAttribute("aria-expanded","false");
    a2.className = "dropdown-toggle";
    a2.appendChild(document.createTextNode(username));
    var caret = document.createElement("SPAN");
    caret.className = "caret";
    a2.appendChild(caret);
    dropdown.appendChild(a2);
    var dropdownList = document.createElement("UL");
    dropdownList.className = "dropdown-menu";
    dropdownList.setAttribute("role","menu");
    dropdownList.setAttribute("aria-labelledby","drop1");
    var dropdownLI = document.createElement("li");
    dropdownLI.setAttribute("role","presentation");
    var item1 = document.createElement("A");
    item1.setAttribute("role","menuitem");
    item1.setAttribute("tabindex","-1");
    item1.setAttribute("href","#");
    var profile = document.createElement("SPAN");
    profile.className = "glyphicon glyphicon-user";
    profile.setAttribute("aria-hidden","true");
    item1.appendChild(profile);
    item1.appendChild(document.createTextNode(" My Account"));
    var divider = document.createElement("li");
    divider.setAttribute("role","presentation");
    divider.className = "divider";
    var dropdownLI2 = document.createElement("li");
    dropdownLI2.setAttribute("role","presentation");
    var item2 = document.createElement("A");
    item2.setAttribute("role","menuitem");
    item2.setAttribute("tabindex","-1");
    item2.setAttribute("href","#");
    var logout = document.createElement("SPAN");
    logout.className = "glyphicon glyphicon-log-out";
    logout.setAttribute("aria-hidden","true");
    item2.appendChild(logout);
    item2.appendChild(document.createTextNode(" Logout"));
    dropdownLI.appendChild(item1);
    dropdownLI2.appendChild(item2);
    dropdownList.appendChild(dropdownLI);
    dropdownList.appendChild(divider);
    dropdownList.appendChild(dropdownLI2);
    dropdown.appendChild(dropdownList);
    navListDropdown.appendChild(dropdown);
    nav.appendChild(navListDropdown);
    
    var navList = document.createElement("UL");
    navList.className = "nav navbar-nav navbar-right";
    for(i = 0; i < navbarItems.length; i++) {
        var a = document.createElement("A");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode(navbarItems[i]));
        var li = document.createElement("li");
        li.appendChild(a);
        navList.appendChild(li);
    }
    nav.appendChild(navList);
    container.appendChild(nav);
}