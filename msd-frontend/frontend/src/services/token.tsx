let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
function getCookie(name: string) {
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getCookieVal(offset: number) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr === -1) { endstr = document.cookie.length; }
    return unescape(document.cookie.substring(offset, endstr));
} // primary function to retrieve cookie by name 
function getCookieTest(name: string) {
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
        if (i === 0)
            break;
    }
    return "";
}

const current = new Date();
const nextYear = new Date();
nextYear.setFullYear(current.getFullYear() + 1);

export const getToken = () => {
    return getCookie("_token");
    // return localStorage.getItem('token');
}

export const getUser = () => {
    if (getCookie("_token") !=="") {
        return getCookie("_token");
    } else if (getCookie("anonymous_id") !=="") {
        return getCookie("anonymous_id");
    } else {
        return "";
    }

    // return localStorage.getItem('token');
}

export const getHBS = () => {
    if (getCookieTest("hpvquestion") !=="") {
        return getCookieTest("hpvquestion");
    } else {
        return "";
    }
}

const setToken = (token: string) => {
    document.cookie = `_token=${token}; expires=${nextYear} Secure`;
    localStorage.setItem('token', token);
}

const removeToken = () => {
    localStorage.removeItem('token');
}

export const getHPVQuestion = () => {
    if (localStorage.getItem('hpvquestion') !=="" && localStorage.getItem('hpvquestion')) {
        return localStorage.getItem('hpvquestion');
    } else {
        return "";
    }
}

const setHPVQuestion = (hpvquestion: string) => {
    localStorage.setItem('hpvquestion', hpvquestion);
}

export default {
    getToken, setToken, removeToken, getHPVQuestion, setHPVQuestion
}


