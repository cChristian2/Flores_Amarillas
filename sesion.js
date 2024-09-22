// Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

// Función que reinicia el tamaño de las notas
function recize_notes() {
    notes.forEach(note => {
        if (note.classList.contains("active")) {
            note.classList.remove("active");
            gsap.set(note, { height: "30%", clearProps: "all" });
        }
    });
}

// Función principal que habilita todas las notas
function notes_ready() {
    gsap.to(".js-envelop-content", { height: "110%", duration: 0.5 });

    notes.forEach((note, index) => {
        note.addEventListener("click", function () {
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                gsap.set(this, { height: "30%", clearProps: "all" });
            } else {
                recize_notes(); // Reinicia el tamaño antes de abrir una nueva
                this.classList.add("active");

                let newHeight = mobile_media_query.matches ? 125 : tablet_media_query.matches ? 80 : 70;
                gsap.set(this, { height: newHeight + (20 * index) + "%" });
            }
        });
    });
}

// Función que configura el papel superior del sobre
function set_up_paper() {
    gsap.set(".js-up-paper", {
        bottom: "97%",
        rotation: 180,
        zIndex: 200,
        clipPath: "polygon(0% 0%, 100% 0%, 50% 81%)",
        onComplete: notes_ready
    });
}

// Función que inicia la transición del sobre
function envelop_transition() {
    gsap.to(".js-up-paper", { bottom: "1%", duration: 0.25, onComplete: set_up_paper });
    document.querySelector(".js-up-paper").removeEventListener("click", envelop_transition);
}

// Función que permite cortar el sticker
function sticker() {
    gsap.set(".js-sticker", { width: "20%", left: "-80%" });
    document.body.classList.remove("scissors");
    document.querySelector(".js-sticker").removeEventListener("click", sticker);
    document.querySelector(".js-up-paper").addEventListener("click", envelop_transition);
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

window.onresize = function () {
    recize_notes();
};
