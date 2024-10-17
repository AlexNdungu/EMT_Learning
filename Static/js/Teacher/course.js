import * as Alert from './alert.js';
let alert_section = document.getElementById("alert_section");
let alert_time = 4000;
let course_name = document.getElementById('course_name');
let all_files = document.getElementById('files');
let create_course = document.getElementById('create_course');
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let add_task_btn = document.getElementById('add_task_btn');
let create_course_section = document.getElementById('create_course_section');
let close_crud_button = document.getElementById('close_crud_button');

function upload_course(){
    let formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('course_name',course_name.value);
    formData.append('documents',all_files.files);
    console.log(all_files.files)
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

add_task_btn.addEventListener('click',()=> {
    create_course_section.style.display = 'block';
});

close_crud_button.addEventListener('click',()=>{
    create_course_section.style.display = 'none';
});

create_course.addEventListener('click',()=>{
    upload_course()
})