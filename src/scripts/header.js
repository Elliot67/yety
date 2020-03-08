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
    }

}