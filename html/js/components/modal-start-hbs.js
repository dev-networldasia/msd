console.log("----------------------------------------------------------------");
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr === -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}
function getCookieTest(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) === arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i === 0) break;
    }
    return "";
}
const getHBS = () => {
    if (getCookieTest("hpvquestion") !== "") {
        return getCookieTest("hpvquestion");
    } else {
        return "";
    }
};

async function requestReportHSB(type) {
    const formData = new FormData();
    const token = getToken("_token");
    if (!token) return;
    formData.append("token", token);
    formData.append("type", type);
    try {
        fetch(`${window.location.origin}/api/WEB/trackingButton.php`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    } catch (e) {}
}

function checkReportHSB() {
    if (!getHBS()) {
        const reportHSB = document.querySelector(
            ".modal-start-hbs#modal-start-hbs"
        );

        if (reportHSB) {
            reportHSB.style.display = "flex";
            setTimeout(() => reportHSB.classList.add("active"), 300);

            const answers = { knowHpv: undefined, injectHpv: undefined };
            const handleChange = (type, value) => {
                answers[type] = value;
                if (answers.knowHpv && answers.injectHpv) {
                    console.log(`Call api reportHBS from ${type}`, answers);
                }
            };

            reportHSB
                .querySelectorAll(
                    ".question-item#know-hpv input[name='know-hpv']"
                )
                .forEach((item) =>
                    item.addEventListener("change", () =>
                        handleChange("knowHpv", item.value)
                    )
                );

            reportHSB
                .querySelectorAll(
                    ".question-item#injected-hpv input[name='injected-hpv']"
                )
                .forEach((item) =>
                    item.addEventListener("change", () =>
                        handleChange("injectHpv", item.value)
                    )
                );
        }
    }
}

checkReportHSB();
