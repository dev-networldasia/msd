function renderListMenuDesktop() {
    const menuEl = document.querySelector(".menu-desktop #nav-menu ul");

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

function addEventForButtonSearch() {
    const elBtn = document.querySelector(".nav-menu #search-control");

    if (!elBtn) return console.log("Not found element!");

    elBtn.addEventListener("click", (e) => {
        createPopupSearch();
    });

    document.addEventListener("click", (event) => {
        if (elBtn.contains(event.target)) return;

        const containerSearch = document.querySelector(
            "#popup-search #container-search"
        );
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
