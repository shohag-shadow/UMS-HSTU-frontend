function createCourseForm() {
    const form = document.createElement("form");
    form.className = "registration-form";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "500px";
    form.style.margin = "auto";

    // --------- Offering Faculty & Department ---------
    const offeringFacultyLabel = document.createElement("label");
    offeringFacultyLabel.textContent = "Offering Faculty";
    const offeringFacultySelect = document.createElement("select");
    offeringFacultySelect.required = true;

    const offeringDeptLabel = document.createElement("label");
    offeringDeptLabel.textContent = "Offering Department";
    const offeringDeptSelect = document.createElement("select");
    offeringDeptSelect.required = true;

    // --------- Receiving Faculty & Department ---------
    const receivingFacultyLabel = document.createElement("label");
    receivingFacultyLabel.textContent = "Receiving Faculty";
    const receivingFacultySelect = document.createElement("select");
    receivingFacultySelect.required = true;

    const receivingDeptLabel = document.createElement("label");
    receivingDeptLabel.textContent = "Receiving Department";
    const receivingDeptSelect = document.createElement("select");
    receivingDeptSelect.required = true;

    // --------- Course Name ---------
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Course Name";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.required = true;

    // --------- Course Code ---------
    const codeLabel = document.createElement("label");
    codeLabel.textContent = "Course Code";
    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.required = true;

    // --------- Credit ---------
    const creditLabel = document.createElement("label");
    creditLabel.textContent = "Credit";
    const creditInput = document.createElement("input");
    creditInput.type = "number";
    creditInput.step = "0.01";
    creditInput.min = "0";
    creditInput.required = true;

    // --------- Level ---------
    const levelLabel = document.createElement("label");
    levelLabel.textContent = "Level";
    const levelSelect = document.createElement("select");
    levelSelect.required = true;

    // --------- Semester ---------
    const semesterLabel = document.createElement("label");
    semesterLabel.textContent = "Semester";
    const semesterSelect = document.createElement("select");
    semesterSelect.required = true;

    // --------- Submit Button ---------
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create Course";

    // --------- Form Submit Handler ---------
    form.addEventListener("submit", e => {
        e.preventDefault();
        const data = {
            title: nameInput.value.trim(),
            code: codeInput.value.trim(),
            credit: creditInput.value,
            level_id: levelSelect.value,
            semester_id: semesterSelect.value,
            offered_by_department_id: offeringDeptSelect.value,
            offered_to_department_id: receivingDeptSelect.value
        };

        postWithAuth(`${api}/faculties/${offeringFacultySelect.value}/departments/${offeringDeptSelect.value}/courses`, data, true).then(response => {
            if (response) {
                alert("Course created successfully!");
                loadDashboard();
            }
        });
    });

    // --------- Load Faculties for Both Faculty Selects ---------
    fetchWithAuth(`${api}/faculties`, true).then(faculties => {
        if (!faculties) return;
        const defaultOption = "<option value=''>Select Faculty</option>";
        offeringFacultySelect.innerHTML = defaultOption;
        receivingFacultySelect.innerHTML = defaultOption;

        faculties.forEach(fac => {
            const option1 = new Option(fac.name, fac.id);
            const option2 = new Option(fac.name, fac.id);
            offeringFacultySelect.appendChild(option1);
            receivingFacultySelect.appendChild(option2);
        });
    });

    // --------- Load Departments When Faculty Changes ---------
    function setupDeptLoading(facultySelect, deptSelect) {
        facultySelect.addEventListener("change", () => {
            const facultyId = facultySelect.value;
            deptSelect.innerHTML = "<option>Loading...</option>";
            if (!facultyId) return;

            fetchWithAuth(`${api}/faculties/${facultyId}/departments`, true).then(depts => {
                deptSelect.innerHTML = "<option value=''>Select Department</option>";
                if (!depts) return;
                depts.forEach(dept => {
                    const opt = new Option(dept.name, dept.id);
                    deptSelect.appendChild(opt);
                });
            });
        });
    }

    setupDeptLoading(offeringFacultySelect, offeringDeptSelect);
    setupDeptLoading(receivingFacultySelect, receivingDeptSelect);

    // --------- Load Levels & Semesters ---------
    fetchWithAuth(`${api}/levels`, true).then(levels => {
        levelSelect.innerHTML = "<option value=''>Select Level</option>";
        if (!levels) return;
        levels.forEach(level => {
            const opt = new Option(level.id, level.id);
            levelSelect.appendChild(opt);
        });
    });

    fetchWithAuth(`${api}/semesters`, true).then(semesters => {
        semesterSelect.innerHTML = "<option value=''>Select Semester</option>";
        if (!semesters) return;
        semesters.forEach(sem => {
            const opt = new Option(sem.code, sem.id);
            semesterSelect.appendChild(opt);
        });
    });

    // --------- Append All to Form ---------
    form.append(
        offeringFacultyLabel, offeringFacultySelect,
        offeringDeptLabel, offeringDeptSelect,
        receivingFacultyLabel, receivingFacultySelect,
        receivingDeptLabel, receivingDeptSelect,
        nameLabel, nameInput,
        codeLabel, codeInput, 
        creditLabel, creditInput,
        levelLabel, levelSelect,
        semesterLabel, semesterSelect,
        submitButton
    );

    pushToMain(form);
}
