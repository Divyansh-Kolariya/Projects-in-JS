const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confrimPassword = document.getElementById("confrimPassword");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isRequired = checkRequired([username,email,password,confrimPassword])

    let isFormValid = isRequired;
    if(isRequired){
        const isUsername = checkLength(username, 3, 15)
        const isEmail = checkEmail()
    }
});

function checkRequired(e){
    let isValid = true

    e.forEach((ele)=> {
        if(ele.value.trim() === ""){
            showError(ele, `${getFieldName(ele)} is required`)
            isValid = false
        } else {
            showSuccess(ele)
        }
    });
    return isValid
}

function getFieldName(e){
    return e.id.charAt(0).toUpperCase() + e.id.slice(1)
}

function showError(input, message){
    const formGroup = input.parentElement
    formGroup.className = "form-group error"
    const small = formGroup.querySelector("small")
    small.innerText = message
}

function showSuccess(e){
    const formGroup = e.parentElement;
    formGroup.className = "form-group success"
}