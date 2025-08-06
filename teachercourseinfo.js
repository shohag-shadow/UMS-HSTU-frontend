function showteacherCourseInfo()
{
    
    function appendToMain(html) {
        document.getElementById("mainContent").appendChild(html);
    }
    let studentsCard=createBodyCard({
        icon:"👨‍🎓👨‍🎓",
        title:"Students",
        subtitle:"See students that are enrolled in this course",
        onClick:createStudentTable
    });
    let assignmentCard=createBodyCard({
        icon:"📕",
        title:"Assignments",
        subtitle:"See information about assignments",
        onClick:showTeacherCoursesAssignmentList
    });
    let materialCard=createBodyCard({
        icon:"📚",
        title:"Materials",
        subtitle:"See and add materials for this course",
        onClick:showTeacherCourseMaterialsPage
    });
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    appendToMain(studentsCard);
    appendToMain(assignmentCard);
    appendToMain(materialCard);
}