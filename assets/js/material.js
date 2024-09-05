const form = document.getElementById("form-generator");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  const color = document.getElementById("pickcolor").value;

  if (url==="") {
    document.getElementById("warning-info").innerHTML="Please enter a URL.";
  } else {
    showSpinner();

    setTimeout(() => {
        
        hideSpinner();
        generateQRCode(url, size, color);

        setTimeout(() => {
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
        }, 50)

        showButton();
    }, 1000);
  }

};

const generateQRCode = (url, size, color) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
        colorDark : color,
        colorLight : "#ffffff"
    });
}

const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
}

const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
}

const hideButton = () => {
    document.getElementById("bton").style.display = "none"
};

const showButton = () => {
    document.getElementById("bton").style.display = "block"
};

const clearUI = () => {
    qr.innerHTML = "";
    const saveLink = document.getElementById("save-link");
    if (saveLink) {
        saveLink.remove();
    }
}

const createSaveBtn = (saveUrl) => {
    const Link = document.createElement("a");
    Link.id = "save-link";
    Link.classList = " bg-green-dark hover:bg-green-after font-bold rounded w-1/3 btn mb-0 btn-sm m-auto my-5";
    Link.href = saveUrl;
    Link.download = "qrcode";
    Link.innerHTML = "Save Image";
    document.getElementById("generated").appendChild(Link);
};

hideSpinner();
hideButton();

form.addEventListener("submit", onGenerateSubmit);