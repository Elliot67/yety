export class LazyLoader{

    constructor(){
        console.log('LazyLoader init');
        this.lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

        console.log('lazyImages: ', this.lazyImages);

        if("IntersectionObserver" in window) {
            this.init();
        } else {
            this.fallbackInit();
        }
    }

    init() {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    if(lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.removeAttribute('data-src');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        },
        {
            rootMargin: '200px'
        });
        
        this.lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    fallbackInit(){
        // TODO: Ajouter un autre type de lazy load
        console.log('IntersectionObserver not available in navigator');
    }

}