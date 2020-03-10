export class ScrollAnimation {

	constructor() {
		console.log('ScrollAnimation init');

		this.fromLeft = [].slice.call(document.querySelectorAll("[data-scrollAnimation='fromLeft']"));
		this.fromRight = [].slice.call(document.querySelectorAll("[data-scrollAnimation='fromRight']"));
		this.allElements = this.fromLeft.concat(this.fromRight);

		if (window.innerWidth >= window.$minDesktop) { // PC
			if ("IntersectionObserver" in window) {
				this.init();
				window.addEventListener('resize', this.checkWidth.bind(this), { passive: true });
			} else {
				this.fallbackInit();
				window.addEventListener('resize', this.checkWidth.bind(this), { passive: true });
			}

		} else { // Mobile
			this.cleanAttributes();
		}
	}

	init() {
		this.animatedElements = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					let element = entry.target;
					if (element.dataset.scrollanimation === "fromLeft") {
						console.log('FROM LEFT');
						element.classList.add('animationFromLeft');
					} else if (element.dataset.scrollanimation === "fromRight") {
						console.log('FROM RIGHT');
						element.classList.add('animationFromRight');
					}
					element.removeAttribute('data-scrollAnimation');
					this.animatedElements.unobserve(element);
				}
			});
		});

		this.allElements.forEach((element) => {
			this.animatedElements.observe(element);
		});
	}


	cleanAttributes() {
		this.allElements.forEach((element) => {
			if (element.dataset.scrollanimation) {
				element.removeAttribute('data-scrollAnimation');
			} else if (element.classList.contains("animationFromLeft")) {
				element.classList.remove('animationFromLeft');
			} else if (element.classList.contains("animationFromRight")) {
				element.classList.remove('animationFromRight');
			}
		});
	}

	checkWidth() {
		if (window.innerWidth < window.$minDesktop) {
			this.cleanAttributes();
			this.animatedElements.disconnect();
		}
	}


	fallbackInit() {
		console.log('IntersectionObserver not available in navigator');
		this.cleanAttributes();
	}

}