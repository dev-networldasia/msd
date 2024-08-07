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
        methodEvent() {
            console.log("booking");
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
