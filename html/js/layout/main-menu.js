const cards = [
    {
        id: 1,
        title: "Nữ giới",
        link: "#",
    },
    {
        id: 2,
        title: "Nam giới",
        link: "#",
    },
    {
        id: 3,
        title: "Trắc nghiệm",
        link: "#",
    },
    {
        id: 4,
        title: "Sống lành chủ động",
        link: "#",
    },
    {
        id: 5,
        title: "Hoạt động cộng đồng",
        link: "#",
    },
    {
        id: 6,
        title: "Địa điểm tư vấn",
        link: "#",
    },
];

function renderListMenuDesktop() {
    const menuEl = document.querySelector(".menu-desktop #nav-menu ul");

    if (!menuEl) return console.log("Not found element!");

    cards.forEach((item) => {
        const li = document.createElement("li");
        li.className = "nav-menu__item";

        const link = `<a href="${item.link}">${item.title}</a>`;
        li.innerHTML = link;

        menuEl.appendChild(li);
    });
}
renderListMenuDesktop();
