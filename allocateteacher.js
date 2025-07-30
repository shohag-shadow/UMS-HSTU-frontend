function createTeacherCourseForm(facultyId, departmentId) {
    console.log(path);
    const $teacherpath = path.replace("courses", "teachers");
    let allCourses = []; // store all courses once

    const form = document.createElement("form");
    form.className = "teacher-course-form";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "400px";
    form.style.margin = "auto";

    // --- Utility to create label + select combo ---
    function createSelectField(labelText, name) {
        const label = document.createElement("label");
        label.textContent = labelText;
        const select = document.createElement("select");
        select.name = name;
        select.required = true;
        return { label, select };
    }

    const { label: levelLabel, select: levelSelect } = createSelectField("Level", "level_id");
    const { label: semesterLabel, select: semesterSelect } = createSelectField("Semester", "semester_id");
    const { label: courseLabel, select: courseSelect } = createSelectField("Course", "course_id");
    courseSelect.disabled = true;

    const { label: teacherLabel, select: teacherSelect } = createSelectField("Teacher", "teacher_id");
    const { label: examiner1Label, select: examiner1Select } = createSelectField("Internal Examiner 1", "internal_examiner1");
    const { label: examiner2Label, select: examiner2Select } = createSelectField("Internal Examiner 2", "internal_examiner2");
    const { label: scrutinizerLabel, select: scrutinizerSelect } = createSelectField("Scrutinizer", "scrutinizer");

    // --- Exam Year Input ---
    const yearLabel = document.createElement("label");
    yearLabel.textContent = "Exam Year";
    const yearInput = document.createElement("input");
    yearInput.type = "number";
    yearInput.name = "exam_year";
    yearInput.required = true;
    yearInput.value = new Date().getFullYear();

    // --- Submit Button ---
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Assign Course";

    form.append(
        levelLabel, levelSelect,
        semesterLabel, semesterSelect,
        courseLabel, courseSelect,
        teacherLabel, teacherSelect,
        examiner1Label, examiner1Select,
        examiner2Label, examiner2Select,
        scrutinizerLabel, scrutinizerSelect,
        yearLabel, yearInput,
        submitButton
    );

    // --- Populate Level & Semester ---
    fetchWithAuth(`${api}/levels`, true).then(data => {
        if (!data) return;
        levelSelect.innerHTML = "<option value=''>Select Level</option>";
        data.forEach(level => {
            const opt = document.createElement("option");
            opt.value = level.id;
            opt.textContent = level.id;
            levelSelect.appendChild(opt);
        });
    });

    fetchWithAuth(`${api}/semesters`, true).then(data => {
        if (!data) return;
        semesterSelect.innerHTML = "<option value=''>Select Semester</option>";
        data.forEach(sem => {
            const opt = document.createElement("option");
            opt.value = sem.id;
            opt.textContent = sem.code;
            semesterSelect.appendChild(opt);
        });
    });

    // --- Load all courses first ---
    fetchWithAuth(`${api}/${path}`, true).then(data => {
        if (!data) return;
        allCourses = data; // store for later filter
        updateCourseOptions();
    });

    // --- Filter and update course dropdown based on level + semester ---
    function updateCourseOptions() {
        const levelId = levelSelect.value;
        const semesterId = semesterSelect.value;

        if (levelId && semesterId) {
            const filtered = allCourses.filter(course =>
                course.level_id == levelId && course.semester_id == semesterId
            );

            courseSelect.disabled = false;
            courseSelect.innerHTML = "<option value=''>Select Course</option>";
            filtered.forEach(course => {
                const opt = document.createElement("option");
                opt.value = course.id;
                opt.textContent = course.code;
                courseSelect.appendChild(opt);
            });
        } else {
            courseSelect.disabled = true;
            courseSelect.innerHTML = "<option value=''>Select Course</option>";
        }
    }

    levelSelect.addEventListener("change", updateCourseOptions);
    semesterSelect.addEventListener("change", updateCourseOptions);

    // --- Populate teacher options ---
    fetchWithAuth(`${api}/${$teacherpath}?include=user`, true).then(data => {
        if (!data) return;
        [teacherSelect, examiner1Select, examiner2Select, scrutinizerSelect].forEach(select => {
            select.innerHTML = "<option value=''>Select</option>";
        });
        data.forEach(teacher => {
            const opt = document.createElement("option");
            opt.value = teacher.id;
            opt.textContent = teacher.user.name;
            teacherSelect.appendChild(opt.cloneNode(true));
            examiner1Select.appendChild(opt.cloneNode(true));
            examiner2Select.appendChild(opt.cloneNode(true));
            scrutinizerSelect.appendChild(opt.cloneNode(true));
        });
    });

    // --- Submit Handler ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const body = {
            teacher_id: teacherSelect.value,
            internal_examiner1: examiner1Select.value,
            internal_examiner2: examiner2Select.value,
            scruitinizer: scrutinizerSelect.value,
            exam_year: yearInput.value
        };
        const courseId = courseSelect.value;

        postWithAuth(`${api}/${path}/${courseId}/teachercourses`, body, true)
            .then(response => {
                if (response) {
                    alert("Course assignment successful!");
                    loadDashboard();
                }
            });
    });

    pushToMain(form);
}
