function renderListCard() {
    const listCardEl = document.querySelector("#sidebar-list-card");

    if (!listCardEl) return console.log("Not found element!");

    homeSidebarCards.forEach((card) => {
        const item = document.createElement("div");
        item.className = "card-item box-shadow-sm";
        const contentCardItem = `
               <div class="avatar">
                  <img src="${card.image}" />
               </div>
               <div class="info">
                  <h3 class="title">
                     ${card.title}
                  </h3>
                  <p class="subtitle">
                     ${card.subtitle}
                  </p>
                  <p class="description">${card.description}</p>
                  <div class="actions">
                     <a href="${card.link_female}" class="btn btn-primary-outline full-radius">
                        <span>Tìm hiểu thêm</span>
                        <b>Nữ</b>
                     </a>

                     <a href="${card.link_male}" class="btn btn-primary-outline full-radius">
                        <span>Tìm hiểu thêm</span>
                        <b>Nam</b>
                     </a>
                  </div>
               </div>
            `;
        item.innerHTML = contentCardItem;

        listCardEl.appendChild(item);
    });
}
renderListCard();
