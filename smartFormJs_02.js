var smartform = smartform || {};
    /* allowInvalidEmail umožňuje odeslání formuláře s nesprávnou e-mailovou adresou, pokud je nastaveno na true */
    const allowInvalidEmail = true;
    smartform.beforeInit = function() { smartform.setClientId('CLIENTID'); }
    smartform.afterInit = function() {
        // Nastavení našeptávání adres. V případě, že nemáte zapnutou validaci poštovných adres, odstraňte tento řádek.
        configureAddressesValidation();
        // Nastavení našeptávání firem. V případě, že nemáte zapnutou validaci firem, odstraňte tento řádek.
        configureCompanyValidation();
        // Nastavení validace emailových adres. V případě, že nemáte zapnutou validaci emailových adres, odstraňte tento řádek.
        configureEmailValidation();
        smartform.rebindAllForms(function() {
            $("#billCountryId").change(smartformSetCountry);
            smartformSetCountry();
            smartform.getInstance("smartform-instance-email").emailControl.addValidationCallback(emailValidationCallback);
            smartform.getInstanceIds().forEach(el => {
                smartform.getInstance(el).addressControl.setSelectionCallback(selectionCallback);
                smartform.getInstance(el).companyControl.setSelectionCallback(selectionCallback);
            });
        });
    }
    /* callback pro vyvolání validace adres a firem*/
    function selectionCallback(element, text, fieldType, suggestion) {
        if (fieldType === "smartform-address-zip" || fieldType === "smartform-company-registration-number" || fieldType === "smartform-company-vat-number") {
            element.value = text;
            var event = new Event('change');
            element.dispatchEvent(event);
            return false;
        }
        return true;
    }
    /* konfugurace validace emailu */
    function configureEmailValidation() {
        const $email = $("#email");
        if ($email.length) {
            $email.off().removeClass("js-validation").addClass("no-js-validation smartform-email smartform-instance-email").parent().removeClass("js-validated-element-wrapper");
            $email.on('focusout', function() {
                if (this.value == "") {
                    if (!allowInvalidEmail) { $email.addClass("js-error-field"); }
                    $('#email ~ .js-validator-msg').removeClass("msg-email-ok").addClass("msg-error").css('display', 'block').text("Povinné pole");
                }
            });
            createEmailResult();
        }
    }
    function addClasses(elementId, classes) {
        let element = $("#" + elementId);
        if (element.length) {
            element.addClass(classes);
        }
    }
    function configureAddressInstances(prefix, instance, company = false) {
        if ($("#" + prefix + "Street").length) {
            var streetClass = $("#" + prefix + "HouseNumber").length ?
                " smartform-address-street" + (company ? " smartform-company-address-street" : "") :
                " smartform-address-street-and-number" + (company ? " smartform-company-address-street-and-number" : "");

            addClasses(prefix + "Street", streetClass + " smartform-instance-" + instance);
            addClasses(prefix + "HouseNumber", "smartform-address-number" + (company ? " smartform-company-address-number" : "") + "smartform-instance-" + instance);
            addClasses(prefix + "City", "smartform-address-city" + (company ? " smartform-company-address-city" : "") + " smartform-instance-" + instance);
            addClasses(prefix + "Zip", "smartform-address-zip" + (company ? " smartform-company-address-zip" : "") + " smartform-instance-" + instance);
        }
    }
    /* konfigurace validace adres */
    function configureAddressesValidation() {
        configureAddressInstances("bill", "1");
        configureAddressInstances("delivery", "2");
    }

    /* konfigurace validace firem */
    function configureCompanyValidation() {
        if ($("#company-info").length) {
            addClasses("billCompany", "smartform-company-name smartform-instance-1");
            addClasses("companyId", "smartform-company-registration-number smartform-instance-1");
            addClasses("vatId", "smartform-company-vat-number smartform-instance-1");
            configureAddressInstances("bill", "1", true);
        }

        if ($("#deliveryCompany").length) {
            addClasses("deliveryCompany", "smartform-company-name smartform-instance-2");
            configureAddressInstances("delivery", "2", true);
        }
    }

    /* Vytvoření prvku výsledku e-mailu */
    function createEmailResult() {
        $('<div>', { class: "js-validator-msg", css: {display: 'none'} }).insertAfter("#email");
    }
    /* Validační callback pro validaci emailu. */
    function emailValidationCallback(response) {
        if (response) {
            const emailResult = $('#email ~ .js-validator-msg');
            const resultType = response.result.resultType;
            const flags = response.result.flags.c;
            let message = '';
            let emailValid = false;
            if (resultType === 'EXISTS' || resultType === 'UNKNOWN') { message = 'E-mailová adresa je v pořádku.'; emailValid = true; }
            else if (resultType === 'NOT_EXISTS') {
                if (flags.some(x => x.c === "MAILBOX_NOT_FOUND")) { message = 'E-mailová schránka neexistuje.'; }
                else if (flags.some(x => x.c === "BAD_SYNTAX")) { message = 'Špatně zadaná e-mailová adresa.'; }
                else if (flags.some(x => x.c === "BAD_DOMAIN")) { message = 'Špatně zadaná doména.'; }
            }
            emailResult.text(message).toggle(!!message);
            if (emailValid) {
                emailResult.removeClass("msg-error").addClass("msg-email-ok");
                $("#email").removeClass("js-error-field");
            } else {
                if (!allowInvalidEmail) { $("#email").addClass("js-error-field"); }
                emailResult.removeClass("msg-email-ok").addClass("msg-error");
            }
        }
    }
    function smartformSetCountry() {
        var country = $("#billCountryId option:selected").attr("data-code");
        if (smartform.getInstance("smartform-instance-1")) { smartform.getInstance("smartform-instance-1").addressControl.setCountry(country); }
        if (smartform.getInstance("smartform-instance-2")) { smartform.getInstance("smartform-instance-2").addressControl.setCountry(country); }
        smartform.getInstanceIds().forEach(el => smartform.getInstance(el).companyControl.setAllSuggestionsEnabled(country === 'CZ'))
    }
