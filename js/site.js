﻿//https://monsterlessons-academy.com/posts/cookie-consent-popup-cookie-banner-examples-with-html-css-javascript
(() => {
    const getCookie = (name) => {
        const value = " " + document.cookie;
        console.log("value", `==${value}==`);
        const parts = value.split(" " + name + "=");
        return parts.length < 2 ? undefined : parts.pop().split(";").shift();
    };

    const setCookie = function (name, value, expiryDays, domain, path, secure) {
        const exdate = new Date();
        exdate.setHours(
            exdate.getHours() +
            (typeof expiryDays !== "number" ? 365 : expiryDays) * 24
        );
        document.cookie =
            name +
            "=" +
            value +
            ";expires=" +
            exdate.toUTCString() +
            ";path=" +
            (path || "/") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
    };

    const $cookiesBanner = document.getElementById("cookieConsent");
    const $cookiesBannerButton = $cookiesBanner.querySelector("button");
    const cookieName = "cookiesBanner";

    const hasCookie = getCookie(cookieName);
    if (!hasCookie) {
        $cookiesBanner.classList.remove("hidden");
        $cookiesBanner.classList.add("show");
    } else {
        $cookiesBanner.remove();
    }

    $cookiesBannerButton.addEventListener("click", () => {
        setCookie(cookieName, "closed");
        $cookiesBanner.remove();
    });
})();