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
            const script = el.getElementsByTagName("script")[0];
            if (script) eval(script.innerHTML);
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
