export class Members {
	constructor() {
		this.elements = [].slice.call(document.querySelectorAll('.Members-content'));
		this.heads = document.querySelectorAll('.Members-head');
		this.currentTab = document.querySelector('.Members .activeTab');
		this.currentHead = document.querySelector('.Members .activeHead');
		this.isRunning = false;

		this.events();
	}

	events() {
		for (const head of this.heads) {
			head.addEventListener('click', (event) => {
				if(!this.isRunning) {
					this.isRunning = true;

					const target = document.querySelector(".Members-content[data-name='" + event.target.dataset.name + "']");
					if (this.currentTab !== target) {
						this.animate(this.currentTab, target)
						.finally(() => {
							this.currentHead.classList.remove('activeHead');
							event.target.classList.add('activeHead');
							this.currentHead = event.target;
							this.currentTab = target;
							window.setTimeout(() => {
								this.isRunning = false;
							}, 500);
						});
					} else {
						this.isRunning = false;
					}
				}
			});
		}
	}

	async animate(leave, enter) {
		new Promise(function(resolve, reject) {
			leave.classList.remove('activeTab');
			window.setTimeout(() => {
				leave.classList.add('hideTab');
				enter.classList.remove('hideTab');
				window.setTimeout(() => {
					enter.classList.add('activeTab');
					resolve();
				}, 50);
			}, 500);
		});
	}
}