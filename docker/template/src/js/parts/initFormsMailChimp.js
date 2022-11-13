/* eslint-disable */

import { $ } from './_utility';

/*------------------------------------------------------------------

  Init MailChimp

-------------------------------------------------------------------*/
function initFormsMailChimp() {
    const $mchimp = $('form.nk-mchimp');
    if (typeof $.validator === 'undefined' || !$mchimp.length) {
        return;
    }
    const self = this;

    // Additional Validate Methods From MailChimp
    // Validate a multifield birthday
    $.validator.addMethod('mc_birthday', function (date, element, grouping_class) {
        let isValid = false;
        const $fields = $('input:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            const dateArray = new Array();
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();

            // correct month value
            dateArray.month -= 1;

            const testDate = new Date(1970, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid month and day.');

    // Validate a multifield date
    $.validator.addMethod('mc_date', function (date, element, grouping_class) {
        let isValid = false;
        const $fields = $('input:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            const dateArray = new Array();
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();
            dateArray.year = $fields.filter('input[name*="[year]"]').val();

            // correct month value
            dateArray.month -= 1;

            // correct year value
            if (dateArray.year.length < 4) {
                dateArray.year = parseInt(dateArray.year, 10) < 50 ? 2000 + parseInt(dateArray.year, 10) : 1900 + parseInt(dateArray.year, 10);
            }

            const testDate = new Date(dateArray.year, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month || testDate.getFullYear() !== dateArray.year) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid date');

    // Validate a multifield phone number
    $.validator.addMethod('mc_phone', function (phone_number, element, grouping_class) {
        let isValid = false;
        const $fields = $('input:filled:not(:hidden)', $(element).closest(grouping_class));
        if ($fields.length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
            isValid = phone_number.length === 10 && phone_number.match(/[0-9]{9}/);
        }
        return isValid;
    }, 'Please specify a valid phone number');

    $.validator.addMethod('skip_or_complete_group', function (value, element, grouping_class) {
        let $fields = $('input:not(:hidden)', $(element).closest(grouping_class)),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : $.extend({}, this),
            numberFilled = $fields.filter(function () {
                return validator.elementValue(this);
            }).length,
            isValid = numberFilled === 0 || numberFilled === $fields.length;

        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each field's validation rules
        if (!$(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, $.validator.format('Please supply missing fields.'));

    $.validator.addMethod('skip_or_fill_minimum', function (value, element, options) {
        let $fields = $(options[1], element.form),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : $.extend({}, this),
            numberFilled = $fields.filter(function () {
                return validator.elementValue(this);
            }).length,
            isValid = numberFilled === 0 || numberFilled >= options[0];
        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
        if (!$(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, $.validator.format('Please either skip these fields or fill at least {0} of them.'));

    $.validator.addMethod('zipcodeUS', function (value, element) {
        return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, 'The specified US ZIP Code is invalid');

    $mchimp.each(function () {
        const $form = $(this);
        if (!$form.length) {
            return;
        }

        const validator = $form.validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            // Grouping fields makes jQuery Validation display one error for all the fields in the group
            // It doesn't have anything to do with how the fields are validated (together or separately),
            // it's strictly for visual display of errors
            groups() {
                const groups = {};
                $form.find('.input-group').each(function () {
                    const inputs = $(this).find('input:text:not(:hidden)');	// TODO: What about non-text inputs like number?
                    if (inputs.length > 1) {
                        const mergeName = inputs.first().attr('name');
                        const fieldNames = $.map(inputs, f => f.name);
                        groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ');
                    }
                });
                return groups;
            },
            // Place a field's inline error HTML just before the div.input-group closing tag
            errorPlacement(error, element) {
                element.closest('.input-group').after(error);
                self.debounceResize();
            },
            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler() {
                const $responseSuccess = $form.find('.nk-form-response-success');
                const $responseError = $form.find('.nk-form-response-error');
                let url = $form.attr('action');
                url = url.replace('/post?u=', '/post-json?u=');
                url += '&c=?';

                $.ajax({
                    dataType: 'jsonp',
                    url,
                    data: $form.serializeArray(),
                    success(resp) {
                        $responseSuccess.hide();
                        $responseError.hide();

                        // On successful form submission, display a success message and reset the form
                        if (resp.result === 'success') {
                            $responseSuccess.show().html(resp.msg);
                            $form[0].reset();

                            // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                        } else {
                            // Example errors - Note: You only get one back at a time even if you submit several that are bad.
                            // Error structure - number indicates the index of the merge field that was invalid, then details
                            // Object {result: "error", msg: "6 - Please enter the date"}
                            // Object {result: "error", msg: "4 - Please enter a value"}
                            // Object {result: "error", msg: "9 - Please enter a complete address"}

                            // Try to parse the error into a field index and a message.
                            // On failure, just put the dump thing into in the msg letiable.
                            let index = -1;
                            let msg;
                            try {
                                const parts = resp.msg.split(' - ', 2);
                                if (typeof parts[1] === 'undefined') {
                                    msg = resp.msg;
                                } else {
                                    i = parseInt(parts[0], 10);
                                    if (i.toString() === parts[0]) {
                                        index = parts[0];
                                        msg = parts[1];
                                    } else {
                                        index = -1;
                                        msg = resp.msg;
                                    }
                                }
                            } catch (e) {
                                index = -1;
                                msg = resp.msg;
                            }

                            try {
                                // If index is -1 if means we don't have data on specifically which field was invalid.
                                // Just lump the error message into the generic response div.
                                if (index === -1) {
                                    $responseError.show().html(msg);
                                } else {
                                    const fieldName = $form.find(`input[name]:eq(${index})`).attr('name'); // Make sure this exists
                                    const data = {};
                                    data[fieldName] = msg;
                                    validator.showErrors(data);
                                }
                            } catch (e) {
                                $responseError.show().html(msg);
                            }
                        }
                        self.debounceResize();
                    },
                    error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    },
                });
            },
        });
    });

    // Custom validation methods for fields with certain css classes
    $.validator.addClassRules('birthday', { digits: true, mc_birthday: '.datefield' });
    $.validator.addClassRules('datepart', { digits: true, mc_date: '.datefield' });
    $.validator.addClassRules('phonepart', { digits: true, mc_phone: '.phonefield' });
}

export { initFormsMailChimp };
