function studentYourCources()
{
    fetchWithAuth(`${api}/${path}?include=course`,1).then(courses=>{
        if(courses)
        {
            const main = document.getElementById("mainContent");
            main.innerHTML = "";
            courses.forEach(course => {
                console.log(course.course["code"]);
                appendToMain(
                    createBodyCard({
                        icon:course.course["code"],
                        title:course.course["title"],
                        onClick:function (){
                            
                            path = path.split("/").slice(0, 5).join("/");
                            console.log(path); // Output: faculties/1/departments/1/c
                            path=`${path}/${course.id}/teachercourses/${course.course.id}`;
                            showStudentCourseInfo()
                        }
                    })
                );
            });
        }
    });
}

// icon, title, subtitle, onClick