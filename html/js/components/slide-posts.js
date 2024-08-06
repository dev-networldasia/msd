function renderListPost() {
    const postListEl = document.querySelector(
        ".slide-posts .posts#post-list .swiper-wrapper"
    );

    if (!postListEl) return console.log("Not found element!");

    posts.forEach((post) => {
        const item = document.createElement("div");
        item.className = "swiper-slide post-item box-shadow-sm";
        const contentCardItem = `
               <div class="post-item__title bg-secondary">
                  ${post.title}
               </div>
               <div class="post-item__avatar">
                  <img src="${post.avatar}" alt="  ${post.title}">
               </div>
               <div class="post-item__des">
                    ${post.des}
               </div>
               <div class="post-item__action">
                  <a href="${post.link}" target="_blank">Tìm hiểu thêm</a>
               </div>
            `;
        item.innerHTML = contentCardItem;
        postListEl.appendChild(item);
    });
}

renderListPost();
