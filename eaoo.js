// ==UserScript==
// @name         Eao pixel minimap
// @namespace    http://tampermonkey.net/
// @version      1.3.12
// @description  Eao pxl minimap
// @author       Zynv
// @grant 		 GM_xmlhttpRequest
// @grant 		 unsafeWindow
// @require		 https://raw.githubusercontent.com/mitchellmebane/GM_fetch/master/GM_fetch.min.js
// @connect		 githubusercontent.com
// @connect		 github.io
// @connect		 endlessnightnlr.github.io
// @connect		 github.com
// @connect      localhost
// @connect		 glitch.me
// @connect		 pixelzone.io
// @connect		 pixelplanet.fun
// @connect		 fuckyouarkeros.fun
// @connect		 ponyplace.z19.web.core.windows.net
// @match      *://pixelzone.io/*
// @match      *://*.pixelplanet.fun*
// @match      *://*.fuckyouarkeros.fun*
// @match      *://pixel2019.vkforms.ru/*
// @match      *://pixel2020.vkforms.ru/*
// @match      *://pixel.w84.vkforms.ru/*
// @match      *://ourworldofpixels.com/*
// @match      *://pixelplace.io/*
// @match      *://pxls.space/*
// @match      *://goodsanta.club/*
// @match      *://hot-potato.reddit.com/embed*
// @match      *://garlic-bread.reddit.com/embed*
// @match      https://pixelwar-mts.ru/*
// @homepage     https://endlessnightnlr.github.io
// @updateURL    https://endlessnightnlr.github.io/MLPP/loader.user.js
// @downloadURL  https://endlessnightnlr.github.io/MLPP/loader.user.js
// ==/UserScript==

[
	['.*:\/\/.*pixelplanet\.fun.*', 'https://endlessnightnlr.github.io/MLPP/PixelPlanet/code.js'],
].forEach(([reg, src]) => {
	if (new RegExp(reg).test(location.href)) {
		console.log(`trigger "${reg}"\nload code from "${src}"`);


		function t(e) {
			return new Promise((t, r) => {
				e.onload = t;
				e.onerror = r;
				e.onabort = r;
				e.ontimeout = r;
				GM.xmlHttpRequest(e);
			});
		}

		(async () => {
			try {
				const res = await t({ method: "GET", url: `${src}?t=${Date.now()}` })
				const code = res.responseText;
				new Function("const [self, GM, unsafeWindow] = arguments;\n" + code)(self, GM, unsafeWindow);
			} catch(e) {
				console.error(e);
			}
		})();

		/*fetch(src)
		.then(res => {
			if (res.readyState !== res.DONE) {
				return;
			}

			if (res.status !== 200) {
				alert(`cant load script\ncode: ${res.status}\nreason: ${res.statusText}`);
				return;
			}

			return res.text()
		})
		.then(code => {
			new Function("const [self, GM, unsafeWindow] = arguments;\n" + code)(self, GM, unsafeWindow);
		});*/
	}
});
