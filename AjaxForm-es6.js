class AjaxForm {
	
	constructor(element, options) {
		this.form = element;
		this.$form = $(this.form);
		this.options = Object.assign(
			{},
			this.getDefaultOptions(),
			options
		);

		this.$form.on('submit', event => {
			this.submit();
			event.preventDefault();
		});
	}

	getDefaultOptions() {
		return {
			action: this.$form.attr('action'),
			data: {}
		};
	}

	get action() {
		return this.options.action;
	}

	sendRequest(url, data) {
		return new Promise((resolve, reject) => {
			$.post(url, data, response => {
				resolve(response);
			})
				.error(reject);
		});
	}

	getFormData() {
		return Object.assign(this.$form.serializeArray, this.options.data);
	}

	populateFormErrors(errorsJson) {
		for ()
	}

	submit() {
		this.sendRequest(
			this.action,
			this.getFormData()
		).then(this.submited, jqXHR => {
			if (jqXHR.status === 422) {
				return this.populateFormErrors(jqXHR.responseJSON);
			}

			return this.error(jqXHR);
		});
	}

	submited(response) {}
	error(jqXHR) {}

}