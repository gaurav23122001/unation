let hideTimeout: any; // Store the timeout ID
declare const document: any;
function getSyncData(key: string) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, (data: any) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data);
            }
        });
    });
}


const hideRedditNSFW = async () => {
    if (window.location.href.includes("www.reddit.com")) {
        const siteData: any = await getSyncData("siteData");
        const disable = siteData.siteData[5].settings.disable;
        if (!disable) {
            const toggle = siteData.siteData[2].settings.nsfw;
            const spanElements = document.querySelectorAll("span");
            spanElements.forEach((list: any, index: any) => {
                if (list.innerText === "nsfw") {
                    let parent = list;
                    let flag = 1;
                    while (parent && !parent.hasAttribute("data-testid")) {
                        if (parent.getAttribute("id") === "AppRouter-main-content") {
                            flag = 0;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if (
                        flag &&
                        toggle &&
                        parent &&
                        parent.getAttribute("data-testid") === "post-container"
                    ) {
                        parent.style.display = "none";
                    } else if (
                        flag &&
                        parent &&
                        parent.getAttribute("data-testid") === "post-container"
                    ) {
                        parent.style.display = "";
                    }
                }
            });
        }
    }
};
window.addEventListener("scroll", () => {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        hideRedditNSFW();
    }, 1000);
});

export { };
