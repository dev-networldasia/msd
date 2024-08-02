/**
 *
 * @param {string} path
 * @param {string} id
 */
async function loadHtmlComponent(path, id, nameFile) {
    fetch(`${path}/${nameFile || "index"}.html`)
        .then((response) => response.text())
        .then((data) => {
            const el = document.getElementById(id);
            el.innerHTML = data;
            const scripts = el.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i]) eval(scripts[i].innerHTML);
            }
        });
}

async function loadFile(path, pathSelector) {
    fetch(path)
        .then((response) => response.text())
        .then((data) => {
            const el = document.querySelector(pathSelector);
            if (el) el.innerHTML = data;
        });
}

async function loadCssFile(path, id) {
    fetch(path)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById(id).innerHTML = data;
        });
}

async function loadJsFile(path, id) {
    fetch(path)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById(id).innerHTML = data;
        });
}

// window.loadHtmlFile = loadHtmlFile;
