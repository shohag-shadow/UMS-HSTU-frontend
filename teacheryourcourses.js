function teacherYourCources()
{
    fetchWithAuth(`${api}/${path}?include=course`,1).then(courses=>{
        if(courses)
        {
            console.log(courses);
            const main = document.getElementById("mainContent");
            main.innerHTML = "";
            courses.forEach(course => {
                appendToMain(
                    createBodyCard({
                        icon:course.course["code"],
                        title:course.course["title"],
                        onClick:()=>showteacherCourseInfo(`${path}/${course["id"]}`),
                    })
                );
            });
        }
    });
}

// icon, title, subtitle, onClick