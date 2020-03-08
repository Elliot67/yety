export class ScrollAnimation{

    constructor(){
        console.log('ScrollAnimation init');
        this.fromLeft = [].slice.call(document.querySelectorAll("[data-scrollAnimation='fromLeft']"));
        this.fromRight = [].slice.call(document.querySelectorAll("[data-scrollAnimation='fromRight']"));

        console.log('animatedElements : ', this.fromLeft, this.fromRight);

        document.addEventListener('resize', this.checkWidth, false);
        this.checkWidth();      

        if("IntersectionObserver" in window && this.desktop) {
            this.init();
        } else if(this.desktop) {
            this.fallbackInit();
        }
    }

    checkWidth(){
        if(window.innerWidth < window.$minDesktop) {
            this.desktop = false;
            if(this.animationFromLeft || this.animationFromRight) {
                this.animationFromLeft.disconnect();
                this.animationFromRight.disconnect();

                [...this.animationFromLeft, ...this.animationFromRight].forEach((element) => {
                    element.removeAttribute('data-scrollAnimation');
                    // TODO: Voir s'il ne faut pas faire d'autres choses
                });
            }
        } else if(!this.desktop) {
            this.desktop = true;
        }
    }

    init() {
        this.animationFromLeft = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let element = entry.target;
                    element.classList.add('animationFromLeft');
                    element.removeAttribute('data-scrollAnimation');
                    this.animationFromLeft .unobserve(element);
                }
            });
        });

        this.animationFromRight = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let element = entry.target;
                    element.classList.add('animationFromRight');
                    element.removeAttribute('data-scrollAnimation');
                    this.animationFromRight.unobserve(element);
                }
            });
        });
        
        this.fromLeft.forEach((element) => {
            this.animationFromLeft.observe(element);
        });

        this.fromRight.forEach((element) => {
            this.animationFromRight.observe(element);
        });

        //TODO: Ajouter animation opacity sur les élements qui sont au centre
    }

    fallbackInit(){
        console.log('IntersectionObserver not available in navigator');
    }

}