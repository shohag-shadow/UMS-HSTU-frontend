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
     let courseMaterialsCard=createBodyCard({
        icon:"📚",
        title:"Course Materials",
        subtitle:"See the materials given for this coutse",
        onClick:function(){
            //path = `${path}/coursematerials`;
            showStudentCourseMaterialsPage();
        }
    });
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    appendToMain(assignmentCard);
    appendToMain(courseMaterialsCard);
}