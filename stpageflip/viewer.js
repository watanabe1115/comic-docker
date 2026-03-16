const params = new URLSearchParams(window.location.search);
const file = params.get("file"); // /manga/Series/Vol1.cbz

async function loadCbz(cbzPath) {
    const res = await fetch(cbzPath);
    const blob = await res.blob();
    const zip = await JSZip.loadAsync(blob);

    const images = [];

    for (const filename of Object.keys(zip.files).sort()) {
        if (filename.match(/\.(jpg|jpeg|png)$/i)) {
            const fileData = await zip.files[filename].async("blob");
            images.push(URL.createObjectURL(fileData));
        }
    }

    return images;
}

async function init() {
    const images = await loadCbz(file);

    const flip = new St.PageFlip(document.getElementById("flipbook"), {
        width: 800,
        height: 1200,
        size: "stretch",
        maxShadowOpacity: 0.5,
        showCover: false,
        mobileScrollSupport: true
    });

    flip.loadFromImages(images);
}

init();