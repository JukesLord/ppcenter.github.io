    var smartform = smartform || {};
    /* allowInvalidEmail umožňuje odeslání formuláře s nesprávnou e-mailovou adresou, pokud je nastaveno na true */
    const allowInvalidEmail = true;

    smartform.beforeInit = function () {
        smartform.setClientId('3EzG0uuPat');
    }

    smartform.afterInit = function () {
        // Nastavení našeptávání adres. V případě, že nemáte zapnutou validaci poštovných adres, odstraňte tento řádek.
        configureAddressesValidation();
        // Nastavení našeptávání firem. V případě, že nemáte zapnutou validaci firem, odstraňte tento řádek.
        configureCompanyValidation();
        // Nastavení validace emailových adres. V případě, že nemáte zapnutou validaci emailových adres, odstraňte tento řádek.
        configureEmailValidation();


        smartform.rebindAllForms(function () {
            $("#billCountryId").change(smartformSetCountry);
            smartformSetCountry();
            smartform.getInstance("smartform-instance-email").emailControl.addValidationCallback(emailValidationCallback);
            smartform.getInstanceIds().forEach(el => {
                smartform.getInstance(el).addressControl.setSelectionCallback(selectionCallback)
                smartform.getInstance(el).companyControl.setSelectionCallback(selectionCallback)
            })
        });
    }

    /* callback pro vyvolání validace adres a firem*/
    function selectionCallback(element, text, fieldType, suggestion) {
        if (fieldType === "smartform-address-zip" || fieldType === "smartform-company-registration-number" || fieldType === "smartform-company-vat-number") {
            element.value = text
            var event = new Event('change');
            element.dispatchEvent(event);
            return false
        }
        return true
    }

    /* konfugurace validace emailu */
    function configureEmailValidation() {
        const $email = $("#email");
        if ($email.length) {
            $email.off()
                .removeClass("js-validation")
                .addClass("no-js-validation smartform-email smartform-instance-email")
                .parent().removeClass("js-validated-element-wrapper");

            $email.on('focusout', function () {
                if (this.value == "") {
                    if (!allowInvalidEmail) {
                        $email.addClass("js-error-field")
                    }
                    $('#email ~ .js-validator-msg').removeClass("msg-email-ok").addClass("msg-error").css('display', 'block').text("Povinné pole");
                }
            });

            createEmailResult();
        }
    }

    /* konfigurace validace adres */
    function configureAddressesValidation() {
        //Poštovní adresy
        if ($("#billStreet").length) {
            if ($("#billHouseNumber").length) {
                $("#billStreet").addClass("smartform-address-street smartform-instance-1");
                $("#billHouseNumber").addClass("smartform-address-number smartform-instance-1");
            } else {
                $("#billStreet").addClass("smartform-address-street-and-number smartform-instance-1");
            }
            $("#billCity").addClass("smartform-address-city smartform-instance-1");
            $("#billZip").addClass("smartform-address-zip smartform-instance-1");
        }

        if ($("#deliveryStreet").length) {
            if ($("#deliveryHouseNumber").length) {
                $("#deliveryStreet").addClass("smartform-address-street smartform-instance-2");
                $("#deliveryHouseNumber").addClass("smartform-address-number smartform-instance-2");
            } else {
                $("#deliveryStreet").addClass("smartform-address-street-and-number smartform-instance-2");
            }
            $("#deliveryCity").addClass("smartform-address-city smartform-instance-2");
            $("#deliveryZip").addClass("smartform-address-zip smartform-instance-2");
        }
    }

    /* konfigurace validace firem */
    function configureCompanyValidation() {
        if ($("#company-info").length) {
            if ($("#billCompany").length) {
                $("#billCompany").addClass("smartform-company-name smartform-instance-1");
            }
            if ($("#companyId").length) {
                $("#companyId").addClass("smartform-company-registration-number smartform-instance-1");
            }
            if ($("#vatId").length) {
                $("#vatId").addClass("smartform-company-vat-number smartform-instance-1");
            }
        }

        if ($("#deliveryCompany").length) {
            $("#deliveryCompany").addClass("smartform-company-name smartform-instance-2");
        }
    }

    /* Vytvoření prvku výsledku e-mailu */
    function createEmailResult() {
        $('<div>', {
            class: "js-validator-msg",
            css: {display: 'none'}
        }).insertAfter("#email");
    }

    /* Validační callback pro validaci emailu. */
    function emailValidationCallback(response) {
        if (response) {
            const emailResult = $('#email ~ .js-validator-msg');
            const resultType = response.result.resultType;
            const flags = response.result.flags.c;

            let message = '';
            let emailValid = false;

            if (resultType === 'EXISTS' || resultType === 'UNKNOWN') {
                message = 'E-mailová adresa je v pořádku.';
                emailValid = true;
            } else if (resultType === 'NOT_EXISTS') {
                if (flags.some(x => x.c === "MAILBOX_NOT_FOUND")) {
                    message = 'E-mailová schránka neexistuje.';
                } else if (flags.some(x => x.c === "BAD_SYNTAX")) {
                    message = 'Špatně zadaná e-mailová adresa.';
                } else if (flags.some(x => x.c === "BAD_DOMAIN")) {
                    message = 'Špatně zadaná doména.';
                }
            }

            emailResult.text(message).toggle(!!message);
            if (emailValid) {
                emailResult.removeClass("msg-error").addClass("msg-email-ok");
                $("#email").removeClass("js-error-field");
            } else {
                if (!allowInvalidEmail) {
                    $("#email").addClass("js-error-field");
                }
                emailResult.removeClass("msg-email-ok").addClass("msg-error");
            }
        }
    }

    function smartformSetCountry() {
        var country = $("#billCountryId option:selected").attr("data-code");
        if (smartform.getInstance("smartform-instance-1"))
            smartform.getInstance("smartform-instance-1").addressControl.setCountry(country);
        if (smartform.getInstance("smartform-instance-2"))
            smartform.getInstance("smartform-instance-2").addressControl.setCountry(country);
        smartform.getInstanceIds().forEach(el => smartform.getInstance(el).companyControl.setAllSuggestionsEnabled(country === 'CZ'))
    }
