//----------------------------------------------------------------
// *** ADD EVENT CLICK FOR FAST ACTION BUTTON ***
//----------------------------------------------------------------

function btnChatWithUs() {
    const btn = document.querySelector(".btn-chat-with-us");
    btn.addEventListener("click", () => {
        // Your code here
    });
}

const actionsData = [
    {
        id: 1,
        key: "chat-with-us",
        path: ".fast-action-controls #fast-btn-chat-now",
        methodEvent() {
            console.log("chat-with-us");
        },
    },
    {
        id: 2,
        key: "consulting-point",
        path: ".fast-action-controls #fast-btn-consulting-point",
        methodEvent() {
            console.log("consulting point");
        },
    },
    {
        id: 3,
        key: "chat-with-us",
        path: ".fast-action-controls #fast-btn-booking",
        methodEvent(event) {
            const popover = document.querySelector(
                ".popover-locations#popover-locations"
            );
            if (!popover) {
                event.stopPropagation();
                createPopoverLocations();
            } else {
                handleClosePopoverLocations();
            }
        },
    },
];
function addEventClickForFastActionControls() {
    actionsData.forEach((action) => {
        const btn = document.querySelector(action.path);
        if (btn) btn.addEventListener("click", action.methodEvent);
    });
    // Add more event listeners here as needed.
}

addEventClickForFastActionControls();

//----------------------------------------------------------------
// *** CREATE POPOVER LOCATIONS ***
//----------------------------------------------------------------
var timerCountDown = null;
function clearTimerCountDown() {
    clearInterval(timerCountDown);
    timerCountDown = null;
}

// Event click location item
const handleClickLocation = (event, link) => {
    handleClosePopoverLocations(event);

    const popoverDirect = createPopoverModalDelayChangePage();
    const elClickToHere = popoverDirect.querySelector("a#link-redirect");

    if (elClickToHere) elClickToHere.href = link;

    let timeRemaining = 4;
    const eleNumberRemaining = document.querySelector(
        "#popover-modal-delay-change-page #count-down"
    );
    if (!eleNumberRemaining) return;
    timerCountDown = setInterval(() => {
        eleNumberRemaining.textContent = timeRemaining--;
        if (timeRemaining < 0) {
            clearTimerCountDown();
            window.location.href = link;
        }
    }, 1000);
};

// Add event click outside popover
const handleClosePopoverLocations = (event) => {
    if (event) event.stopPropagation();
    console.log("Call in popover locations");
    const elPopoverLocations = document.querySelector(
        ".popover-locations#popover-locations"
    );

    // Check if the click is within the popover or the popover doesn't exist

    if (!elPopoverLocations) {
        return;
    }

    // Remove the active class
    elPopoverLocations.classList.remove("active");

    // Remove the popover from the DOM after the timeout
    setTimeout(() => {
        if (elPopoverLocations) {
            document.body.removeChild(elPopoverLocations);
        }
    }, 240);

    // Remove the event listener
    document.removeEventListener("click", handleClosePopoverLocations);

    // Handle timerCountDown if applicable
    if (timerCountDown) {
        clearInterval(timerCountDown); // Use clearInterval instead of setInterval
    }
};

function createPopoverLocations() {
    const popoverLocations = document.createElement("div");
    popoverLocations.className = "popover-locations";
    popoverLocations.id = "popover-locations";

    // Add Overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    popoverLocations.appendChild(overlay);

    // Add locations
    const locationItems = document.createElement("div");
    // locationItems.className = "locations box-shadow-md";
    locationItems.className = "locations";
    const locations = [
        {
            id: 1,
            title: "Danh sách các Bệnh viện - YouMed - Ứng dụng đặt lịch khám Bệnh viện, Bác sĩ",
            link: "https://youmed.vn/dat-kham/benh-vien?utm_source=Hpv.vn&utm_medium=redirect&utm_campaign=MSD006-HPV",
            image: "./images/common/logo-you-med.svg",
        },
        {
            id: 2,
            title: "Hello Health Group",
            link: "https://hellohealthgroup.com/",
            image: "./images/common/logo-hello-health.svg",
        },
        {
            id: 3,
            title: "Hệ thống tiêm chủng VNVC - Công ty cổ phần Vacxin Việt Nam",
            link: "https://vnvc.vn/dang-ky-tiem-chung/",
            image: "./images/common/logo-vnvc.svg",
        },
        {
            id: 4,
            title: "Nhà thuốc FPT Long Châu - Hệ thống chuỗi nhà thuốc lớn",
            link: "https://nhathuoclongchau.com.vn/trung-tam-tiem-chung",
            image: "./images/common/logo-long-chau.svg",
        },
    ];
    locations.forEach((location) => {
        const locationItem = document.createElement("div");
        locationItem.className = "location-item";
        locationItem.setAttribute("title", location.title);
        locationItem.innerHTML = `<img src="${location.image}" />`;
        locationItem.onclick = () => handleClickLocation(event, location.link);

        locationItems.appendChild(locationItem);
    });
    popoverLocations.appendChild(locationItems);

    document.body.appendChild(popoverLocations);

    // Add animate appear for popover
    const elPopover = document.querySelector(
        ".popover-locations#popover-locations"
    );

    if (!elPopover) return console.log("Not found element!");

    // Delay run animate
    setTimeout(() => {
        elPopover.classList.add("active");
    }, 240);

    document.addEventListener("click", handleClosePopoverLocations);
}

//----------------------------------------------------------------
// *** CREATE POPOVER MODAL CHANGE PAGE ***
//----------------------------------------------------------------

function createPopoverModalDelayChangePage() {
    const popoverLocations = document.createElement("div");
    popoverLocations.className = "popover-modal delay-change-page";
    popoverLocations.id = "popover-modal-delay-change-page";
    popoverLocations.innerHTML = `
       <div class="overlay"></div>
   <div class="popover-content">
      <div class="ribbon-white"></div>
      <div class="title">
         <div class="title__left">
            Rời khỏi HPV.vn
         </div>
         <div class="title__right">
            Rời khỏi trang web hpv.vn sau <span id="count-down">5</span>s
         </div>
      </div>
      <div class="content">
         <p class="">
            Đang rời khỏi trang web hpv.vn
         </p>
         <p>
            Bạn đang rời khỏi trang HPV.vn của MSD và chuyển sang một liên kết khác. Xin lưu ý rằng tất cả nội dung trên
            trang đích bạn đang chuyển sang không thuộc trách nhiệm hoặc sự chấp thuận của chúng tôi. Chúng tôi không
            chịu trách nhiệm về bất kỳ tổn thất hoặc hậu quả nào có thể phát sinh từ liên kết này.
         </p>
         <p>
            Vui lòng đợi tải trang hoặc nhấp 
            <a id="link-redirect"
               href="https://youmed.vn/dat-kham/benh-vien?utm_source=Hpv.vn&utm_medium=redirect&utm_campaign=MSD006-HPV">
               vào đây
            </a> nếu bạn không muốn đợi.
         </p>
      </div>
   </div>
    `;

    document.body.appendChild(popoverLocations);

    // Add animate appear for popover
    const elPopover = document.querySelector(
        ".delay-change-page#popover-modal-delay-change-page"
    );
    const elPopoverContent = document.querySelector(
        ".delay-change-page#popover-modal-delay-change-page .popover-content"
    );

    if (!elPopoverContent) return console.log("Not found element!");

    // Delay run animate
    setTimeout(() => {
        elPopoverContent.classList.add("active");
    }, 240);

    // Add event click outside popover
    const handleClosePopover = (event) => {
        if (elPopoverContent.contains(event.target)) return;
        elPopover.classList.remove("active");
        setTimeout(() => {
            document.body.removeChild(elPopover);
        }, 240);
        clearTimerCountDown();
        document.removeEventListener("click", handleClosePopover);
    };

    document.addEventListener("click", handleClosePopover);

    return popoverLocations;
}
