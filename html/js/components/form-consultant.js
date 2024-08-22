function eventDropdowns() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    dropdownToggle.addEventListener("click", function () {
        dropdownMenu.style.display =
            dropdownMenu.style.display === "block" ? "none" : "block";
    });

    dropdownItems.forEach(function (item) {
        item.addEventListener("click", function () {
            dropdownToggle.textContent = item.textContent;
            dropdownToggle.setAttribute(
                "data-value",
                item.getAttribute("data-value")
            );
            dropdownMenu.style.display = "none";
        });
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            dropdownMenu.style.display = "none";
        }
    });
}

eventDropdowns();
