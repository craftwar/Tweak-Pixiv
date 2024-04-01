'use strict';
(() => {
	if (window.location.href.startsWith("https://www.pixiv.net/jump.php")) {
		const observer = new MutationObserver((record, observer) => {
			if (skipConfirmation())
				observer.disconnect();
		}).observe(document.body, { subtree: true, childList: true, attributes: true });
		if (skipConfirmation())
			observer.disconnect();
		function skipConfirmation() {
			let link = document.body.querySelector("a")
			if (link) {
				link.click();
				return true;
			}
		}
	} else if (window.location.href.includes("/artworks/")) {
		// press "R" or "ESC" to open/close manga show all
		var showAll = true;
		window.addEventListener("keydown", (event) => {
			if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName))
				return
			if (event.code == "KeyR" || event.code == "Escape") {
				showAll = !showAll;
				if (!showAll) {
					const exitShowAllButton = document.body.querySelector("div.gtm-manga-viewer-close-icon");
					if (exitShowAllButton) {
						exitShowAllButton.click();
					}
				} else {
					clickShowAll();
				}
			}
		});

		function clickShowAll() {
			const showAllButton = document.body.querySelector("button.sc-emr523-0");
			if (showAllButton) {
				showAllButton.click();
				return true;
			}
		}

		const showAllObserver = new MutationObserver((record, observer) => {
			if (clickShowAll())
				observer.disconnect();
		});
		showAllObserver.observe(document.body, { subtree: true, childList: true, attributes: true });

		function urlWithoutHash(url) {
			if (url.endsWith("#1"))
				return url.slice(0, -2);
			else
				return url;
		}
		var oldURL;
		if (oldURL === undefined)
			oldURL = urlWithoutHash(window.location.href);
		browser.runtime.onMessage.addListener(
			(message) => {
				const newURL = urlWithoutHash(message.url);
				if (oldURL != newURL) { // don't enable observer on manga open/close
					oldURL = newURL;
					showAllObserver.observe(document.body, { subtree: true, childList: true, attributes: true });
				}
			}
		);
	} else { // install keydown to all page or ajax page loading may not work
		window.addEventListener("keydown", (event) => {
			if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName))
				return
			if ((/.+?\/(?:(?:(?:artworks)|(?:illustrations)|(?:manga)|(?:bookmark_new_illust\.php))(?:$|\?))/.test(window.location.href))) {
				let pagination;
				switch (event.key) {
					case "ArrowRight":
						pagination = document.body.querySelector("nav.sc-xhhh7v-0 > a:last-child");
						break;
					case "ArrowLeft":
						pagination = document.body.querySelector("nav.sc-xhhh7v-0 > a:first-child");
						break;
				}
				if (pagination)
					pagination.click();
			}
		});
	}
})();