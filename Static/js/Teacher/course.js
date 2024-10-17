import * as Alert from './alert.js';
let alert_section = document.getElementById("alert_section");
let alert_time = 4000;
let course_name = document.getElementById('course_name');
let all_files = document.getElementById('files');
let create_course = document.getElementById('create_course');
let csrf = document.getElementsByName('csrfmiddlewaretoken');

function upload_course(){
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('course_name',files);
    formData.append('documents',all_files.files);
    $.ajax({
        type:'POST',
        url:'/createcourse/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
        },
        error: function(error){
            new Alert.Alert('error','Fatal Error Occured. Try Again Later!',alert_time,alert_section);
        }
    });
}

create_course.addEventListener('click',()=>{
    upload_course()
})