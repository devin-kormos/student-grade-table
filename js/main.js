var token = "AFa2yKPP"
var urlA = "https://sgt.lfzprototypes.com/api/grades/"
var $grudes = $("#grudes")
var $name = $("#name")
var $course = $("#course")
var $grade = $("#grade")
function addGrade(grade) {
    $grudes.append(`
<tr grade-id="${grade.id}">
    <td>${grade.id}</td><td><span class="noedit name">${grade.name}</span><input class="form-control edit name"></td>
    <td><span class="noedit course">${grade.course}</span><input class="form-control edit course"></td>
    <td><span class="noedit grade">${grade.grade}</span><input class="form-control edit grade"></td>
    <td>
    <a class="btn btn-danger btn-sm noedit" grade-id="${grade.id}" id="deleteBtn" role="button">
        <span aria-hidden="true">&#120;</span>
    </a>
    <a class="btn btn-danger btn-sm edit" grade-id="${grade.id}" id="cancelEdit" role="button">
        <span aria-hidden="true">C</span>
    </a>
    <a class="btn btn-primary btn-sm noedit" grade-id="${grade.id}" id="editOrder" role="button">
        <span aria-hidden="true">&#8635;</span>
    </a>
    <a class="btn btn-primary btn-sm edit" grade-id="${grade.id}" id="saveEdit" role="button">
        <span aria-hidden="true">&#128427;</span>
    </a>
    </td>
`
)}
// onclick="document.getElementById('id01').style.display='block'"
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

//Update Grade
$grudes.delegate("#editOrder", "click", function() {
    var $tr = $(this).closest("tr")
    $tr.find("input.name").val( $tr.find("span.name").html() )
    $tr.find("input.course").val( $tr.find("span.course").html() )
    $tr.find("input.grade").val( $tr.find("span.grade").html() )
    $tr.addClass("edit")
})

$grudes.delegate("#cancelEdit", "click", function() {
    $(this).closest("tr").removeClass("edit")
})

$grudes.delegate("#saveEdit", "click", function() {
    var $tr = $(this).closest("tr")
    var build = {
        name: $tr.find("input.name").val(),
        course: $tr.find("input.course").val(),
        grade: $tr.find("input.grade").val()
    }

    $.ajax({
        type: "PATCH",
        url: urlA + $(this).attr("grade-id"),
        data: build,
        headers: {"x-access-token": token},
        success: function() {
            $tr.find("input.name").html(build.name)
            $tr.find("input.course").html(build.course)
            $tr.find("input.grade").html(build.grade)
            $tr.removeClass("edit")
        },
        error: function() {
            console.log("error updating grade")
        } 
    })
})
