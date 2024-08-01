// Render Menu
function renderListMenuDesktop() {
    const menuEl = document.querySelector(".main-menu #nav-menu ul");

    if (!menuEl) return console.log("Not found element!");

    mainMenuData.forEach((item) => {
        const li = document.createElement("li");
        li.className = "nav-menu__item";

        const link = `<a href="${item.link}">${item.title}</a>`;
        li.innerHTML = link;

        menuEl.appendChild(li);
    });
}
renderListMenuDesktop();

// Control Search
function addEventForButtonSearch() {
    const elBtn = document.querySelector(".nav-menu #search-control");

    if (!elBtn) return console.log("Not found element!");

    elBtn.addEventListener("click", (e) => {
        console.log("search click");
        createPopupSearch();
    });

    document.addEventListener("click", (event) => {
        if (elBtn.contains(event.target)) return;

        const containerSearch = document.querySelector(
            "#popup-search #container-search"
        );
        if (!containerSearch) return;
        if (!containerSearch.contains(event.target)) {
            removePopupSearch();
        }
    });
}

function createPopupSearch() {
    const popupSearchEle = document.createElement("div");
    popupSearchEle.className = "popup-search";
    popupSearchEle.id = "popup-search";
    popupSearchEle.innerHTML = `
    <div class="overlay"></div>
        <div class="container-search box-shadow-md" id="container-search">
            <input type="text" placeholder="Tìm kiếm..." />
            <div class="search-results" id="search-results">

            </div>
            <div class="no-results">
                Không tìm thấy kết quả nào
            </div>
        </div>
    `;

    document.body.appendChild(popupSearchEle);

    renderListSearchResult();
}

function removePopupSearch() {
    const popupSearchEle = document.querySelector("#popup-search");
    if (popupSearchEle) document.body.removeChild(popupSearchEle);
}

function renderListSearchResult() {
    const searchResultEl = document.querySelector("#search-results");

    if (!searchResultEl) return console.log("Not found element!");

    const { status, total, message, data } = searchResults;

    if (status === 0) {
        searchResultEl.innerHTML = `<p class="text-danger">${message}</p>`;
        return;
    }

    const list = data.map((item) => {
        const link = `<a href="${item.url}">${item.title}</a>`;
        return `<li class="search-result__item">${link}</li>`;
    });

    searchResultEl.innerHTML = `<ul>${list.join("")}</ul>`;
}

setTimeout(() => {
    renderListSearchResult();
    addEventForButtonSearch();
}, 1000);

//Menu mobile
function addEventToggleMenuMobile() {
    const elBtn = document.querySelector(".btn-open-menu-mobile");

    if (!elBtn) return console.log("Not found element!  22222");

    elBtn.addEventListener("click", (e) => {
        createMenuMobile();
    });

    document.addEventListener("click", (event) => {
        console.log("🚀 ~ document.addEventListener ~ elBtn:", elBtn);
        if (elBtn.contains(event.target)) return;

        const containerSearch = document.querySelector(
            "#popup-menu-mobile #container-menu-mobile"
        );
        if (!containerSearch.contains(event.target)) {
            removePopupMenuMobile();
        }
    });
}

function renderListMenuMobile() {
    const menuEl = document.querySelector(".popup-menu-mobile #nav-menu");

    if (!menuEl) return console.log("Not found element!");

    mainMenuData.forEach((item) => {
        const li = document.createElement("li");
        li.className = "nav-menu__item";

        const link = `<a href="${item.link}">${item.title}</a>`;
        li.innerHTML = link;

        menuEl.appendChild(li);
    });
}

function createMenuMobile() {
    const popupMenu = document.createElement("div");
    popupMenu.className = "popup-menu-mobile";
    popupMenu.id = "popup-menu-mobile";
    popupMenu.innerHTML = `
    <div class="overlay"></div>
        <div class="container-menu-mobile box-shadow-md" id="container-menu-mobile">
            <ul class="nav-menu" id="nav-menu">
            </ul>
        </div>
    `;

    document.body.appendChild(popupMenu);

    renderListMenuMobile();
}

function removePopupMenuMobile() {
    const popupMenuMobile = document.querySelector("#popup-menu-mobile");
    if (popupMenuMobile) document.body.removeChild(popupMenuMobile);
}

setTimeout(() => {
    addEventToggleMenuMobile();
}, 1000);
