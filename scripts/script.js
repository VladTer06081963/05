const modalController = ({ modal, btnOpen, btnClose }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);
  modalElem.style.cssText = `
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity 1300ms ease-in-out;
  `;

  const closeModal = (event) => {
    const target = event.target;

    if (
      target === modalElem ||
      target.closest(btnClose) ||
      event.code === "Escape"
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = "hidden";
      }, 1300);
      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
  };
  // openModal();
  buttonElems.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  // buttonElem.addEventListener("click", openModal);
  modalElem.addEventListener("click", closeModal);
};
//-----------------
document.body.style.setProperty("--dw", document.body.clientWidth + "px");
document.body.style.setProperty("--dh", document.body.clientHeight + "px");
document.getElementById("cards").onpointermove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const BOX = card.getBoundingClientRect();
    const POINT = { x: x, y: y };
    const RATIO = { x: POINT.x / BOX.width, y: POINT.y / BOX.height };
    const CENTER = fromCenter(RATIO);
    // set some css variables referenced in css
    card.style.setProperty("--ratio-x", RATIO.x);
    card.style.setProperty("--ratio-y", RATIO.y);
  }
};

// maths 🤷‍♀️
function fromCenter({ x, y }) {
  return Math.min(
    Math.max(0, Math.sqrt((y - 0.5) * (y - 0.5) + (x - 0.5) * (x - 0.5)) / 0.5),
    1
  );
}
//-----------------

modalController({
  modal: ".modal1",
  //   btnOpen: ".section__button2",
  btnOpen: "#card1 .btnOpen1", // Используем селектор внутри карточки для кнопки открытия модального окна 2
  btnClose: ".modal__close",
});

modalController({
  modal: ".modal2",
  //   btnOpen: ".section__button2",
  btnOpen: "#card2 .btnOpen2", // Используем селектор внутри карточки для кнопки открытия модального окна 2
  btnClose: ".modal__close",
});

modalController({
  modal: ".modal3",
  //   btnOpen: ".section__button3",
  btnOpen: "#card3 .btnOpen3", // Используем селектор внутри карточки для кнопки открытия модального окна 3
  btnClose: ".modal__close",
});
