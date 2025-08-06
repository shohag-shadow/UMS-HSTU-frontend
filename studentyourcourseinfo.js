function showStudentCourseInfo()
{
    console.log(path);
    function appendToMain(html) {
        document.getElementById("mainContent").appendChild(html);
    }
    let assignmentCard=createBodyCard({
        icon:"📕",
        title:"Assignments",
        subtitle:"See information about assignments",
        onClick:function(){
            path = `${path}/assignments`;
            showStudentCoursesAssignmentList();
        }
    });
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    appendToMain(assignmentCard);
}