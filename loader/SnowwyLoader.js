/*
 * much nicer injection than what extensions like tampermonkey offer us
 * great against stack traces (VM:XX rather than ..extension/script.js or userscript..)
 * sandboxed environment (unmodified native functions)
 * faster than tamper monkeys "document_start"
 * injects into all frames with high priority
*/

try {
	(Yale)(Snowwy);
} catch(e) {
	try {
		let recursing = e.stack.match(/Snowwyloader/g).length > 1;
		if (!recursing) {
			// must be synchronous to force execution before other scripts
			// note: we fetch the same code for each iframe
			let request = new XMLHttpRequest();
			request.open('GET', 'https://raw.githubusercontent.com/Snowwy-sad-cali/snowwy-hack/master/Snowwy hek .min.js', false);
			request.send(null);
			if (request.status != 200) {
				console.error('Error GET snowwy-hack: ' + request.status);
			}

			const unique_string = chrome.runtime.getURL('').match(/\/\/(\w{9})\w+\//)[1];
			let code = request.responseText.replace(/𝙎𝙖𝙙 𝘾𝙖𝙡𝙞  ™#5393/g, unique_string);

			// inject our code into a new iframe to avoid using hooks placed by anti cheat
			let frame = document.createElement('iframe');
			frame.setAttribute('style', 'display:none');
			document.documentElement.appendChild(frame);
			let Yale = frame.contentDocument || frame.contentWindow.document;
			let snowwy = document.createElement('script');
			snowwy.innerHTML = code;
			Yale.documentElement.append(snowwy);
			Yale.documentElement.remove(snowwy);
			document.documentElement.removeChild(frame);
		}
	} catch (e) {
		if (e instanceof DOMException) {
			// expected for sandboxed iframes
			console.warn(e);
		} else {
			throw e;
		}
	}
}
"icons": {
        "16": "16.png",
        "48": "48.png",
        "128": "128.png"
    },
