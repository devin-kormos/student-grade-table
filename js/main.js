var token = "AFa2yKPP"
var urlA = "https://sgt.lfzprototypes.com/api/grades/"
var $grudes = $("#grudes")
var $name = $("#name")
var $course = $("#course")
var $grade = $("#grade")
function addGrade(grade) {
    $grudes.append(`<tr><td>${grade.id}</td><td>${grade.name}</td>
    <td>${grade.course}</td><td>${grade.grade}</td><td>
    <a class="btn btn-danger btn-sm" grade-id="${grade.id}" id="deleteBtn" role="button"><span aria-hidden="true">×</span></a>
    <a class="btn btn-primary btn-sm" grade-id="${grade.id}" onclick="document.getElementById('id01').style.display='block'" id="editBtn" role="button"><span aria-hidden="true">&#8635</span></a>
    </td>`
)}

//Create Table
$.ajax({
    type: "GET",
    url: urlA,
    headers: {"x-access-token": token},
    success: function(grades) {
        $.each(grades, function(i, grade) {
            addGrade(grade)
            })
    },
    error: function() {
        console.log("error")
    }
})

//Add Grade
$("#addGrade").on("click", function (){
    var build = {
        name: $name.val(),
        course: $course.val(),
        grade: $grade.val()
    }
    $.ajax({
        type: "POST",
        url: urlA,
        headers: {"x-access-token": token},
        data: build,
        success: function(newGrade) {
            addGrade(newGrade)
        },
        error: function() {
            console.log("error adding grade")
        } 
    })
})

//Delete Grade
$grudes.delegate("#deleteBtn", "click", function() {
    var $tr = this
    $.ajax({
        type: "DELETE",
        url: urlA + $(this).attr("grade-id"),
        headers: {"x-access-token": token},
        success: function() {
            $tr.parentNode.parentNode.remove()
        },
        error: function() {
            console.log("error deleting grade")
        } 
    })
})