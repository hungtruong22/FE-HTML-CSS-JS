// Đối tượng 'Validator'
function Validator(options){

    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule){
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        // Lấy giá trị input: inputElement.value;
        //console.log(inputElement.value);
        // lấy hàm để kiểm tra: rule.test();
            // var errorMessage = rule.test(inputElement.value);
        //console.log(errorMessage);
        var errorMessage;
    
        // Lấy giá trị các rule của selector
        var rules = selectorRules[rule.selector];
        // console.log(rules);

        // Lặp qua từng rule và kiểm tra 
        for(var i = 0 ; i < rules.length ; ++i){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                    break;
                default:    
                    errorMessage = rules[i](inputElement.value);
            }
           
            // Nếu có lỗi thì dừng việc kiểm tra
            if(errorMessage){
                break;
            } 
        }
                    
            if(errorMessage){
                errorElement.innerText = errorMessage;
                getParent(inputElement, options.formGroupSelector).classList.add('invalid');
            }
            else{
                errorElement.innerText = '';
                getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
            }

            return !errorMessage; // !! trà về kiểu boolean 
    }


    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement){
       // console.log(formElement);
       formElement.onsubmit = function(e){
            // khi submit form
            e.preventDefault(); // Bỏ qua hành vi mặc định của nút button

            var isFormValid = true;

            // Lặp qua từng rule và validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector); 
               var isValid =  validate(inputElement,rule);
               if(!isValid){
                    isFormValid = false;
               }
            });

           

            if(isFormValid){
                //console.log('khong co loi');
                // Trường hợp submit với javascript
                if(typeof options.onSubmit === 'function'){
                     // var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var enableInputs = formElement.querySelectorAll('[name]');
                    // console.log(enableInputs);

                    var formValues = Array.from(enableInputs).reduce(function (values, input){
                        switch(input.type){
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')){
                                    values[input.name] = '';
                                    return values;
                                }
            
                                if(!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default: 
                                values[input.name] = input.value;
                                break;
                        }
                        
                        return values;
                    }, {}); // Array.from: đổi enableInputs từ NoteList sang kiểu Array

                    //console.log(formValues);

                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else{
                    formElement.submit();
                }
            }
            else{
                console.log('co loi');  
            }
       }


       // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function(rule){
            //console.log(rule.selector);

            // Lưu lại các rule cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }
            else{
                // Nếu không phải là mảng thì gán cho một cái mảng vói phần tử rule đầu tiên
                selectorRules[rule.selector] = [rule.test];
            }
             // selectorRules[rule.selector] = rule.test;

            var inputElements = formElement.querySelectorAll(rule.selector); 

            Array.from(inputElements).forEach(function(inputElement){
                //if(inputElement){

                    // Xử lý trường hợp blur khỏi input
                    inputElement.onblur = function(){
                        // console.log('blur'+ rule.selector);
                        //console.log(inputElement.parentElement.querySelector('.form-message'));
                        validate(inputElement,rule);
                    }
                    
                    // Xử lý mỗi khi người dùng nhpaaj vào input
                    inputElement.oninput = function(){
                        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                        errorElement.innerText = '';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                    }
               // }
            })
           
            //console.log(inputElement);

        });

        //console.log(selectorRules);
    }
}


// Định nghĩa rules

// Nguyên tắc của rules:
/**
 * 1. Khi có lỗi => Trả ra message lỗi
 * 2. Khi hợp lệ(không có lỗi) => không trả ra cái gì cả(undefined)
 */
Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function(selector, min, message){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : message || `Vui lòng nhập ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        } 
    };
}