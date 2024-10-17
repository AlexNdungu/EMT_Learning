import * as Alert from './alert.js';
let alert_section = document.getElementById("alert_section");
let alert_time = 4000;
let create_user_btn = document.getElementById('create_user_btn')
let show_pass_btn_1 = document.getElementById('signup_form_input_show_pass_1');
let show_pass_btn_2 = document.getElementById('signup_form_input_show_pass_2')
let email_signup_input = document.getElementById('email_signup_input')
let pass_1 = document.getElementById('pass_1');
let pass_2 = document.getElementById('pass_2');
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let choosen_user = document.getElementById('choosen_user');
let choose_check_box_containers = document.getElementsByClassName('choose_check_box_container');
let choose_check_boxs = document.getElementsByClassName('choose_check_box');
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const lengthRegex = /.{8,}/; 
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /\d/;
const specialRegex = /[^A-Za-z0-9]/;

let open_eye_component = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
`
let closed_eye_componet = `
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z" fill-rule="nonzero"/></svg>
`

function show_password(input,button_svg){
    if(input.type == 'password'){
        input.type = 'text';
        button_svg.innerHTML = closed_eye_componet;
    }
    else{
        input.type = 'password';
        button_svg.innerHTML = open_eye_component;
    }
};

for (let i = 0; i < choose_check_box_containers.length; i++) {
    choose_check_box_containers[i].addEventListener('click',()=> {
        if(i == 0){
            choose_check_boxs[0].style.display = 'block';
            choose_check_boxs[1].style.display = 'none';
            choosen_user.value = 'student';
        }
        else if(i == 1){
            choose_check_boxs[0].style.display = 'none';
            choose_check_boxs[1].style.display = 'block';
            choosen_user.value = 'teacher';
        }
    });
}

function create_new_user(){
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('email',email_signup_input.value);
    formData.append('password',pass_1.value);
    formData.append('role',choosen_user.value);
    $.ajax({
        type:'POST',
        url:'/createNewUser/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
           if(response.status == 'exists'){
                new Alert.Alert('error','User Already Exists!',alert_time,alert_section);
           }
            else if(response.status == 'created'){
                window.location.href = "/Course";
            }
        },
        error: function(error){
            new Alert.Alert('error','Fatal Error Occured. Try Again Later!',alert_time,alert_section);
        }
    });    
}

function check_choosen_user_group(){
    if(choosen_user.value == ''){
        new Alert.Alert('error','Kindly Choose The Role!',alert_time,alert_section);
    }
    else{
        create_new_user();
    }
}

function check_password_strength(pass1){
    if(!lengthRegex.test(pass1.value)){
        new Alert.Alert('error','Password Is Too Short!',alert_time,alert_section);
    }
    else if(!uppercaseRegex.test(pass1.value) || !lowercaseRegex.test(pass1.value) || !numberRegex.test(pass1.value) || !specialRegex.test(pass1.value)){
        new Alert.Alert('error','Require Atleast One (UpperCase, LowerCase, Number, Special Character)!',alert_time,alert_section);
    }
    else{
        check_choosen_user_group();
    }
}

function compare_passwords(pass1,pass2){
    if(pass1.value == '' || pass2.value == '' ){
        new Alert.Alert('error','Password Is Empty!',alert_time,alert_section);
    }
    else if(pass1.value != pass2.value){
        new Alert.Alert('error','Passwords Are Not The Same!',alert_time,alert_section);
    }
    else{
        check_password_strength(pass1)
    }
}

function check_signin_input(email,pass1,pass2){
    if(email.value == ''){
        new Alert.Alert('error','Email Is Empty!',alert_time,alert_section);
    }
    else{
        if(!email_signup_input.value.match(mailformat)){
            new Alert.Alert('error','Email Is Invalid!',alert_time,alert_section);
        }
        else{
            compare_passwords(pass1,pass2);
        }
    }
}

show_pass_btn_1.addEventListener('click', ()=> {
    show_password(pass_1,show_pass_btn_1)
});

show_pass_btn_2.addEventListener('click', ()=> {
    show_password(pass_2,show_pass_btn_2)
});

create_user_btn.addEventListener('click',()=>{
    check_signin_input(email_signup_input,pass_1,pass_2)
});