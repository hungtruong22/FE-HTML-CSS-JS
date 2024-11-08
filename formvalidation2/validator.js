function Validator(formSelector, options){
    
    // gán giá trị mặc định cho tham số (ES5)
    if(!options){
        options = {};
    }


    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    //console.log(formSelector);
    /**
     * Quy uoc tao rules
     * co loi : return error message
     * khong co loi : return undefined
     */
    var formRules = {
        // fullname: 'required',
        // email: 'required|email',
    };

    var validatorRules = {
        required: function(value){
            return value ? undefined : 'Vui lòng nhập trường này!';
        },
        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email!';
        },
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },
        max: function(max){
            return function(value){
                return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
            }
        }
    };

    // var ruleName = 'required';
    // console.log(validatorRules[ruleName]);

    // Lấy ra formelement trong DOM theo formSelector
    var formElement = document.querySelector(formSelector);
    // console.log(formElement);

    // Chỉ xử lý khi có elemnt trong DOM
    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');
       // console.log(inputs);
       for(var input of inputs){
            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules){
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');
                if(isRuleHasValue){
                    ruleInfo = rule.split(':');
                    // console.log(ruleInfo); 
                    rule = ruleInfo[0];
                   // console.log(validatorRules[rule](ruleInfo[1]));
                }

                var ruleFunc = validatorRules[rule];

                if(isRuleHasValue){
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                // console.log(rule);
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }
                else{
                    formRules[input.name] = [ruleFunc];
                }
            }
            //console.log(input.getAttribute('rules'));

            // formRules[input.name] = input.getAttribute('rules');

            // Lắng nghe sự kiện để Validate(blur, change,...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
             
       }
       // hàm thực hiện Validate 
       function handleValidate(event){
            // console.log(event.target.value);
            // console.log(formRules[event.target.name]);

            var rules = formRules[event.target.name];
            var errorMessage;
           rules.find(function(rule){
                errorMessage = rule(event.target.value);
                return errorMessage;
            });

            // Nếu có lỗi thì hiển thị Message lỗi ra UI
            if(errorMessage){
                var formGroup = getParent(event.target, '.form-group');

                // console.log(formGroup);
                if(formGroup){
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage){
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
            console.log(errorMessage);
       }

       // hàm clear message lỗi
       function handleClearError(event){
            var formGroup = getParent(event.target, '.form-group');
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');
                if(formMessage){
                    formMessage.innerText = '';
                }
            }
       }
    }
    // Xử lý hành vi submit-form
    formElement.onSubmit = function(event){
        event.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;
        for(var input of inputs){
           // console.log(input.value);
           if(!handleValidate({ target: input })){ // nếu có lỗi thì gán bằng false
                isValid = false;
           }
        }
        console.log(isValid);

        // khi không có lỗi thì submit form
        if(isValid){
            formElement.submit();
            if(typeof options.onSubmit === 'function'){
                 options.onSubmit();
            }
            else{
                formElement.submit();
            }   
        }
    }

    console.log(formRules);   
} 