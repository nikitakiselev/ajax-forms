/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _AjaxFormEs = __webpack_require__(1);

	var _AjaxFormEs2 = _interopRequireDefault(_AjaxFormEs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var contactForm = new _AjaxFormEs2.default('#contact-form', {
	    autoHelpBlock: true
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AjaxForm = function () {
	    function AjaxForm(element, options) {
	        var _this = this;

	        _classCallCheck(this, AjaxForm);

	        this.form = element;
	        this.$form = $(this.form);
	        this.options = Object.assign(this.getDefaultOptions(), options);

	        this.$form.on('submit', function (event) {
	            _this.submit();
	            event.preventDefault();
	        });
	    }

	    _createClass(AjaxForm, [{
	        key: 'getDefaultOptions',
	        value: function getDefaultOptions() {
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
	    }, {
	        key: 'sendRequest',
	        value: function sendRequest(url, data) {
	            return new Promise(function (resolve, reject) {
	                $.post(url, data, function (response) {
	                    resolve(response);
	                }).error(reject);
	            });
	        }
	    }, {
	        key: 'getFormData',
	        value: function getFormData() {
	            return Object.assign(this.$form.serializeArray(), this.options.data);
	        }
	    }, {
	        key: 'populateFormErrors',
	        value: function populateFormErrors(errorsJson) {
	            for (var fieldName in errorsJson) {
	                this.setFieldError(fieldName, errorsJson[fieldName].shift());
	            }
	        }
	    }, {
	        key: 'clearErrors',
	        value: function clearErrors() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.getFormFields()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var field = _step.value;

	                    var $parent = $(field).closest(this.options.controlWrapper);

	                    if ($parent.length) {
	                        $parent.removeClass(this.options.controlErrorClass).find(this.options.controlErrorBlock).html('');
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'setFieldError',
	        value: function setFieldError(fieldName, errorText) {
	            var $field = this.$form.find('[name=' + fieldName + ']');

	            if ($field.length === 0) {
	                return;
	            }

	            var $parent = $field.closest(this.options.controlWrapper);

	            if ($parent.length === 0) {
	                return;
	            }

	            $parent.addClass(this.options.controlErrorClass);

	            this.setHelpBlock($parent, errorText);
	        }
	    }, {
	        key: 'setHelpBlock',
	        value: function setHelpBlock($parent, errorText) {
	            var $helpBlock = $parent.find(this.options.controlErrorBlock);

	            if ($helpBlock.length === 0 && this.options.autoHelpBlock) {
	                $helpBlock = $('<div></div>');
	                $helpBlock.addClass(this.options.controlErrorBlock.replace('.', ''));
	                $parent.append($helpBlock);
	            }

	            $helpBlock.html(errorText);
	        }
	    }, {
	        key: 'getFormFields',
	        value: function getFormFields() {
	            return $(this.options.formFields);
	        }
	    }, {
	        key: 'getSubmitBtn',
	        value: function getSubmitBtn() {
	            return $(this.options.submit);
	        }
	    }, {
	        key: 'setLoadingState',
	        value: function setLoadingState() {
	            var $submit = this.getSubmitBtn();

	            this.getFormFields().prop('readonly', true).addClass('disabled');

	            $submit.prop('readonly', true).addClass('disabled').data('old', $submit.html()).html(this.options.submitLoadingState);
	        }
	    }, {
	        key: 'resetState',
	        value: function resetState() {
	            var $submit = this.getSubmitBtn();

	            this.getFormFields().prop('readonly', false).removeClass('disabled');

	            $submit.prop('readonly', false).removeClass('disabled').html($submit.data('old'));
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.$form.trigger('reset');
	        }
	    }, {
	        key: 'submit',
	        value: function submit() {
	            var _this2 = this;

	            this.clearErrors();
	            this.setLoadingState();

	            this.sendRequest(this.action, this.getFormData()).then(function (response) {
	                _this2.resetState();
	                _this2.submited(response);
	            }).catch(function (jqXHR) {
	                _this2.resetState();

	                if (jqXHR.status === 422) {
	                    return _this2.populateFormErrors(jqXHR.responseJSON);
	                }

	                return _this2.error(jqXHR);
	            });
	        }
	    }, {
	        key: 'submited',
	        value: function submited(response) {}
	    }, {
	        key: 'error',
	        value: function error(jqXHR) {}
	    }, {
	        key: 'action',
	        get: function get() {
	            return this.options.action;
	        }
	    }]);

	    return AjaxForm;
	}();

	exports.default = AjaxForm;

/***/ }
/******/ ]);