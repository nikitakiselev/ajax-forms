class AjaxForm {

    constructor(element, options) {
        this.form = element;
        this.$form = $(this.form);
        this.options = Object.assign(
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
            formFields: 'input, select, textarea',
            submit: '[type=submit]',
            submitLoadingState: '<i class="fa fa-spinner fa-spin"></i> Loading...',
            data: {},

            autoHelpBlock: false,
            controlClass: '.form-control',
            controlWrapper: '.form-group',
            controlErrorClass: 'has-error',
            controlErrorBlock: '.help-block',
            lang: {
                unknownError: 'Возникла непредвиденная ошибка. Попробуйте перезагрузить страницу. Приносим свои извинения за неудобства.'
            }
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
        return Object.assign(this.$form.serializeArray(), this.options.data);
    }

    populateFormErrors(errorsJson) {
        for (let fieldName in errorsJson) {
            this.setFieldError(fieldName, errorsJson[fieldName].shift());
        }
    }

    clearErrors() {
        for (let field of this.getFormFields())
        {
            var $parent = $(field).closest(this.options.controlWrapper);

            if ($parent.length) {
                $parent
                    .removeClass(this.options.controlErrorClass)
                    .find(this.options.controlErrorBlock)
                    .html('');
            }
        }
    };

    setFieldError(fieldName, errorText)
    {
        let $field = this.$form.find(`[name=${fieldName}]`);

        if ($field.length === 0) {
            return;
        }

        let $parent = $field.closest(this.options.controlWrapper);

        if ($parent.length === 0) {
            return;
        }

        $parent.addClass(this.options.controlErrorClass);

        this.setHelpBlock($parent, errorText);
    }

    setHelpBlock($parent, errorText)
    {
        let $helpBlock = $parent.find(this.options.controlErrorBlock);

        if ($helpBlock.length === 0 && this.options.autoHelpBlock) {
            $helpBlock = $('<div></div>');
            $helpBlock.addClass(this.options.controlErrorBlock.replace('.', ''));
            $parent.append($helpBlock);
        }

        $helpBlock.html(errorText);
    }

    getFormFields()
    {
        return $(this.options.formFields);
    }

    getSubmitBtn()
    {
        return $(this.options.submit);
    }

    setLoadingState()
    {
        let $submit = this.getSubmitBtn();

        this.getFormFields()
            .prop('readonly', true)
            .addClass('disabled');

        $submit
            .prop('readonly', true)
            .addClass('disabled')
            .data('old', $submit.html())
            .html(this.options.submitLoadingState);
    }

    resetState()
    {
        let $submit = this.getSubmitBtn();

        this.getFormFields()
            .prop('readonly', false)
            .removeClass('disabled');

        $submit
            .prop('readonly', false)
            .removeClass('disabled')
            .html($submit.data('old'));
    }

    reset()
    {
        this.$form.trigger('reset');
    }

    submit() {
        this.clearErrors();
        this.setLoadingState();

        this.sendRequest(
            this.action,
            this.getFormData()
        ).then(response => {
            this.resetState();
            this.submited(response);
        })
            .catch(jqXHR => {
                this.resetState();

                if (jqXHR.status === 422) {
                    return this.populateFormErrors(jqXHR.responseJSON);
                }

                return this.error(jqXHR);
            });
    }

    submited(response) {
    }

    error(jqXHR) {
    }

}

export default AjaxForm;