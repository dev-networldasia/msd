//----------------------------------------------------------------
// *** MENU DESKTOP ***
//----------------------------------------------------------------
function renderListMenuDesktop() {
    const menuEl = document.querySelector(".main-menu #nav-menu ul");

    if (!menuEl) return console.log("Not found element!");

    mainMenuData.forEach((item) => {
        const li = document.createElement("li");
        li.className = `nav-menu__item ${
            item.title === "Nữ giới" ? "is-female" : ""
        } ${item.title === "Nam giới" ? "is-male" : ""}`;

        const link = `<a href="${item.link}" target="_blank"><span>${item.title}</span></a>`;
        li.innerHTML = link;

        menuEl.appendChild(li);
    });
}
renderListMenuDesktop();

//----------------------------------------------------------------
// *** SEARCH CONTROL ***
//----------------------------------------------------------------
function addEventForButtonSearch() {
    const elBtn = document.querySelector(".nav-menu #search-control");

    if (!elBtn) return console.log("Not found element!");

    elBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        activeModalSearch();
        addEventForBtnSearchControl();
    });

    document.addEventListener("click", (event) => {
        if (elBtn.contains(event.target)) return;

        const containerSearch = document.querySelector(
            "#modal-search.modal-search .search-control"
        );
        // if (!containerSearch) return;
        // if (!containerSearch.contains(event.target)) {
        //     removePopupSearch();
        // }
    });
}

function addEventForBtnSearchControl() {
    const containerSearch = document.querySelector(
        "#modal-search.modal-search"
    );

    if (!containerSearch) return console.log("Not found element!");

    const btnSearch = containerSearch.querySelector(".search-control .search");
    const input = containerSearch.querySelector(".input-control");

    if (!btnSearch || !input) return;

    //Render 6 most viewed articles default
    get6MostViewedArticles("", containerSearch);

    if (!input.dataset.keyDownEnterEventAdded) {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                handleSearch(input.value, containerSearch);
            }
        });
        input.dataset.keyDownEnterEventAdded = true;
    }
    if (!btnSearch.dataset.clickEventAdded) {
        btnSearch.addEventListener("click", (event) => {
            event.preventDefault();
            if (!input.value) return;
            handleSearch(input.value, containerSearch);
        });
        btnSearch.dataset.clickEventAdded = true;
    }
}

// function createPopupSearch() {
//     const popupSearchEle = document.createElement("div");
//     popupSearchEle.className = "popup-search";
//     popupSearchEle.id = "popup-search";
//     popupSearchEle.innerHTML = `
//     <div class="overlay"></div>
//         <div class="container-search box-shadow-md" id="container-search">
//             <input type="text" placeholder="Tìm kiếm..." />
//             <div class="search-results" id="search-results">

//             </div>
//             <div class="no-results">
//                 Không tìm thấy kết quả nào
//             </div>
//         </div>
//     `;

//     document.body.appendChild(popupSearchEle);

//     renderListSearchResult();
// }

function activeModalSearch() {
    const popupSearchEle = document.querySelector(".modal-search#modal-search");
    if (!popupSearchEle) return;

    popupSearchEle.classList.add("active");

    const searchContent = popupSearchEle.querySelector(".search-content");

    function eventClickOutSide(event) {
        if (searchContent.contains(event.target)) return;

        popupSearchEle.classList.remove("active");
        document.removeEventListener("click", eventClickOutSide);
    }

    document.addEventListener("click", eventClickOutSide);

    const elBtnCloseModal = popupSearchEle.querySelector(".close-modal");
    if (elBtnCloseModal) {
        elBtnCloseModal.addEventListener("click", () => {
            popupSearchEle.style.display = "block";
            popupSearchEle.classList.remove("active");
            setTimeout(() => {
                popupSearchEle.style.display = "none";
                document.removeEventListener("click", eventClickOutSide);
            }, 300);
        });
    }
}

async function handleSearch(inputValue, containerSearch) {
    const titleResultBox = containerSearch.querySelector(
        ".results-search .title"
    );
    const resultsContent = containerSearch.querySelector(
        ".results-search .list-results"
    );
    const searchControl = containerSearch.querySelector(".search-control");

    if (
        !titleResultBox ||
        !resultsContent ||
        searchControl.dataset.isSearching
    ) {
        return;
    }

    searchControl.dataset.isSearching = "loading";
    titleResultBox.textContent = "Kết quả tìm kiếm";
    resultsContent.innerHTML = `<div class="msd-loader-container">
               <div class="msd-loader"></div>
               <div class="msd-loader-text">Tìm kiếm...</div>
            </div>`;
    const resultData = await requestSearchPost(inputValue);
    searchControl.dataset.isSearching = "";
    if (!resultData) {
        resultsContent.innerHTML = `<div class="not-found-post">Không tìm thấy bài viết!</div>`;
    } else {
        const listPostHTML = resultData.map((post) => {
            return `<a href="${post.link}" class="result-item">
            <img src="${post.image}" alt="${post.title}">
            <p class="result-item__des">${post.title}</p>
            </a>`;
        });
        resultsContent.innerHTML = listPostHTML.join("");
    }
}

async function get6MostViewedArticles(inputValue, containerSearch) {
    const titleResultBox = containerSearch.querySelector(
        ".results-search .title"
    );
    const resultsContent = containerSearch.querySelector(
        ".results-search .list-results"
    );
    if (!titleResultBox || !resultsContent) return;

    titleResultBox.textContent = "Kết quả tìm kiếm nhiều nhất";

    resultsContent.innerHTML = `<div class="msd-loader-container">
               <div class="msd-loader"></div>
               <div class="msd-loader-text">Tìm kiếm...</div>
            </div>`;
    const resultData = await requestSearchPost(inputValue);
    if (!resultData) {
        resultsContent.innerHTML = `<div class="not-found-post">Không tìm thấy bài viết!</div>`;
    } else {
        const listPostHTML = resultData.map((post) => {
            return `<a href="${post.link}" class="result-item">
            <img src="${post.image}" alt="${post.title}">
            <p class="result-item__des">${post.title}</p>
            </a>`;
        });
        resultsContent.innerHTML = listPostHTML.join("");
    }
}

function requestSearchPost(value) {
    // const url = `${apiUrl}/search?q=${value}`;
    // return fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => renderPostOfModalSearch(data.data))
    //     .catch((error) => console.error("Error:", error));
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
                {
                    title: "Một mối quan hệ lành mạnh là cùng giúp nhau hoàn thiện, chăm sóc lẫn nhau và trân trọng giá trị của đối phương",
                    image: "https://hpv.vn/api/CMS/image/folder/1716989923_Picture3.png",
                },
            ]);
        }, 2000);
    });
}

function removePopupSearch() {
    const popupSearchEle = document.querySelector("#popup-search");
    if (popupSearchEle) document.body.removeChild(popupSearchEle);
}

setTimeout(() => {
    addEventForButtonSearch();
}, 1000);

//----------------------------------------------------------------
// *** MENU MOBILE ***
//----------------------------------------------------------------

//Menu mobile
function addEventToggleMenuMobile() {
    const elBtn = document.querySelector(".btn-open-menu-mobile");

    if (!elBtn) return console.log("Not found element!");

    elBtn.addEventListener("click", (e) => {
        createMenuMobile();
    });

    document.addEventListener("click", (event) => {
        if (elBtn.contains(event.target)) return;

        const containerSearch = document.querySelector(
            "#popup-menu-mobile #container-menu-mobile"
        );
        if (!containerSearch?.contains(event.target)) {
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

//----------------------------------------------------------------
// *** DETECT FIXED MENU SCROLL ***
//----------------------------------------------------------------

function addEventDetectMenuStuck() {
    document.addEventListener("scroll", () => {
        const stickyElement = document.querySelector("header.menu-header#menu");

        const container = stickyElement.parentElement;

        const isStuck =
            stickyElement.getBoundingClientRect().top <= 20 &&
            container.getBoundingClientRect().top < 0;

        if (isStuck) {
            stickyElement.classList.add("is-sticky");
        } else {
            stickyElement.classList.remove("is-sticky");
        }
    });
}

addEventDetectMenuStuck();
