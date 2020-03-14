export class Form {

	constructor() {
		this.isPlaying = false;
		this.formContainer = document.querySelector('.Contact-right');
		this.inputs = this.formContainer.querySelectorAll('input');
		this.textarea = this.formContainer.querySelector('textarea');
		this.submitButton = this.formContainer.querySelector('button');

		this.events();
	}

	events() {
		this.submitButton.addEventListener('click', () => {
			if(!this.isPlaying) {
				this.isPlaying = true;
				this.loadBar();
			}
		}, { passive: true });
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
		for (const input of this.inputs) {
			input.value = "";
		}
		this.textarea.value = "";
	}
}