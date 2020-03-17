export class SubmitFormAnimation {

	constructor(container) {
		this.isPlaying = false;
		this.formContainer = container;
		this.inputs = this.formContainer.querySelectorAll('.JS-input');
		this.textarea = this.formContainer.querySelector('.JS-textarea');
		this.submitButton = this.formContainer.querySelector('.JS-button');

		this.events();
	}

	events() {
		if(this.submitButton) {
			this.submitButton.addEventListener('click', () => {
				if (!this.isPlaying) {
					this.isPlaying = true;
					this.loadBar();
				}
			}, { passive: true });
		}
	}

	loadBar() {
		this.submitButton.classList.add('submit-progress');
		setTimeout(() => {
			this.submitButton.classList.remove('submit-progress');
			this.emptyForm();
			this.isPlaying = false;
		}, 3000);
	}

	emptyForm() {
		if (this.inputs) {
			for (const input of this.inputs) {
				input.value = "";
			}
		}

		if (this.textarea) {
			this.textarea.value = "";
		}
	}
}