class WOWForContainer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.init();
    }

    init() {
        this.container.addEventListener("scroll", this.onScroll.bind(this));
        this.onScroll(); // Check on load
    }

    onScroll() {
        const elements = this.container.querySelectorAll(".wow");
        elements.forEach((element) => {
            if (this.isInViewport(element)) {
                this.applyAnimation(element);
            }
        });

        //   if (this.animatedElements.size === this.elements.length) {
        //       // All elements have been animated, remove the scroll event listener
        //       this.container.removeEventListener(
        //           "scroll",
        //           this.onScroll.bind(this)
        //       );
        //   }
    }

    isInViewport(element) {
        //   console.log("🚀 ~ WOWForContainer ~ isInViewport ~ element:", element);
        const rect = element.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        return (
            rect.top >= containerRect.top &&
            rect.left >= containerRect.left &&
            rect.bottom <= containerRect.bottom + 100 &&
            rect.right <= containerRect.right
        );
    }

    getAnimateStyle(className) {
        const classNames = className.split(" ");
        let styleName = null;
        for (let i = 0; i < classNames.length; i++) {
            if (classNames[i].startsWith("animate__")) {
                styleName = classNames[i].replace("animate__", "");
                break;
            }
        }
        return styleName;
    }

    applyAnimation(element) {
        // const animateClass = element.getAttribute('class') || 'animate__bounceIn';
        const classNames = element.className || "animate__bounceIn";
        const styleName = this.getAnimateStyle(classNames);
        const duration = element.getAttribute("data-wow-duration") || "1s";
        const delay = element.getAttribute("data-wow-delay") || "0s";

        element.style.visibility = "visible";
        element.style.animationDuration = duration;
        element.style.animationDelay = delay;
        element.style.animationName = styleName;

        element.classList.add("animated");
        setTimeout(() => {
            element.classList.remove("animated");
        }, delay);
    }
}
