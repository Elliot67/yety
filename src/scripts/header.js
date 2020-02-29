export class Header {

    constructor() {
        console.log('Header init');

        this.header = document.querySelector('.Header');
        this.menuOpen = false;

        this.events();
    }

    events() {
        this.header.querySelector('.Header-button').addEventListener("click", () => {
            this.toggleMenu();
        }, false);
    }

    toggleMenu() {

        this.header.classList.toggle('activeMenu');
        this.menuOpen = !this.menuOpen;

        if (this.menuOpen) { // FIXME: Cela enlève la barre de navigation ce qui change la taille du viewport, voir si il n'y a pas une meilleure solution
            document.querySelector('body').style.overflow = "hidden";
        } else {
            document.querySelector('body').style.overflow = "initial";
        }
    }

}