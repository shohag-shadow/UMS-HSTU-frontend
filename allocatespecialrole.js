function allocateSpecialRoleForm() {
    const main = document.getElementById("mainContent");
    main.innerHTML = "";

    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "500px";
    form.style.margin = "auto";
    form.style.padding = "1rem";

    const selected = {
        roleType: "", facultyId: "", departmentId: "",
        userId: "", specialRoleId: "", startDate: "", endDate: ""
    };

    // ---- Role Type ----
    const roleTypeLabel = document.createElement("label");
    roleTypeLabel.textContent = "Select Role Type:";
    const roleTypeSelect = document.createElement("select");
    roleTypeSelect.innerHTML = `
        <option value="">-- Select Role Type --</option>
        <option value="0">Teacher Taking Department Role</option>
        <option value="1">Staff Taking Department Role</option>
        <option value="2">Teacher Taking Faculty Role</option>
        <option value="3">Staff Taking Faculty Role</option>
    `;

    // ---- Faculty ----
    const facultyLabel = document.createElement("label");
    facultyLabel.textContent = "Select Faculty:";
    const facultySelect = document.createElement("select");
    facultySelect.disabled = true;

    // ---- Department ----
    const departmentLabel = document.createElement("label");
    departmentLabel.textContent = "Select Department:";
    const departmentSelect = document.createElement("select");
    departmentSelect.disabled = true;

    // ---- User ----
    const userLabel = document.createElement("label");
    userLabel.textContent = "Select User (Teacher/Staff):";
    const userSelect = document.createElement("select");
    userSelect.disabled = true;

    // ---- Special Role ----
    const specialRoleLabel = document.createElement("label");
    specialRoleLabel.textContent = "Select Special Role:";
    const specialRoleSelect = document.createElement("select");
    specialRoleSelect.disabled = true;

    // ---- Start Date ----
    const startDateLabel = document.createElement("label");
    startDateLabel.textContent = "Start Date:";
    const startDateInput = document.createElement("input");
    startDateInput.type = "date";
    startDateInput.disabled = true;

    // ---- End Date ----
    const endDateLabel = document.createElement("label");
    endDateLabel.textContent = "End Date:";
    const endDateInput = document.createElement("input");
    endDateInput.type = "date";
    endDateInput.disabled = true;

    // ---- Submit ----
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Allocate Role";
    submitBtn.type = "submit";
    submitBtn.disabled = true;

    form.append(
        roleTypeLabel, roleTypeSelect,
        facultyLabel, facultySelect,
        departmentLabel, departmentSelect,
        userLabel, userSelect,
        specialRoleLabel, specialRoleSelect,
        startDateLabel, startDateInput,
        endDateLabel, endDateInput,
        submitBtn
    );

    // ---- Handlers ----
    roleTypeSelect.onchange = () => {
        selected.roleType = roleTypeSelect.value;
        resetValues();
        if (!selected.roleType) return;

        facultySelect.disabled = false;
        facultySelect.innerHTML = "<option value=''>-- Select Faculty --</option>";
        fetchWithAuth(`${api}/faculties`).then(data => {
            data.forEach(f => {
                facultySelect.innerHTML += `<option value="${f.id}">${f.name}</option>`;
            });
        });
    };

    facultySelect.onchange = () => {
        selected.facultyId = facultySelect.value;
        resetFrom("faculty");

        const isDepartmentRole = selected.roleType === "0" || selected.roleType === "1";

        if (isDepartmentRole) {
            departmentSelect.disabled = false;
            departmentSelect.innerHTML = "<option value=''>-- Select Department --</option>";
            fetchWithAuth(`${api}/faculties/${selected.facultyId}/departments`).then(data => {
                data.forEach(dep => {
                    departmentSelect.innerHTML += `<option value="${dep.id}">${dep.name}</option>`;
                });
            });
        } else {
            loadUsersAndRoles(); // faculty-level
        }
    };

    departmentSelect.onchange = () => {
        selected.departmentId = departmentSelect.value;
        resetFrom("department");
        if (!selected.departmentId) return;
        loadUsersAndRoles();
    };

    userSelect.onchange = () => {
        selected.userId = userSelect.value;
        if (selected.userId) {
            specialRoleSelect.disabled = false;
        }
    };

    specialRoleSelect.onchange = () => {
        selected.specialRoleId = specialRoleSelect.value;
        if (selected.specialRoleId) {
            startDateInput.disabled = false;
            endDateInput.disabled = false;
        }
    };

    startDateInput.onchange = () => {
        selected.startDate = startDateInput.value;
        checkAllReady();
    };

    endDateInput.onchange = () => {
        selected.endDate = endDateInput.value;
        checkAllReady();
    };

    function checkAllReady() {
        if (selected.userId && selected.specialRoleId && selected.startDate && selected.endDate) {
            submitBtn.disabled = false;
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!selected.userId || !selected.specialRoleId || !selected.startDate || !selected.endDate) {
            alert("Please fill all required fields.");
            return;
        }

        const response = await postWithAuth(`${api}/${path}`, {
            user_id: selected.userId,
            special_role_id: selected.specialRoleId,
            start_date: selected.startDate,
            end_date: selected.endDate
        }, false);

        if (response) {
            alert("Role allocated successfully!");
            loadDashboard();
        }
    });

    // ---- Helpers ----
    function loadUsersAndRoles() {
        userSelect.disabled = false;
        specialRoleSelect.disabled = true;
        startDateInput.disabled = true;
        endDateInput.disabled = true;
        submitBtn.disabled = true;

        userSelect.innerHTML = "<option value=''>-- Select User --</option>";
        specialRoleSelect.innerHTML = "<option value=''>-- Select Special Role --</option>";

        const isTeacher = selected.roleType === "0" || selected.roleType === "2";
        let url = "";

        if (selected.roleType === "0" || selected.roleType === "1") {
            url = isTeacher
                ? `${api}/faculties/${selected.facultyId}/departments/${selected.departmentId}/teachers?include=user`
                : `${api}/faculties/${selected.facultyId}/departments/${selected.departmentId}/staffs?include=user`;
        } else {
            url = isTeacher
                ? `${api}/faculties/${selected.facultyId}/departments/0/teachers?include=user`
                : `${api}/faculties/${selected.facultyId}/staffs?include=user`;
        }

        fetchWithAuth(url, true).then(users => {
            users.forEach(u => {
                userSelect.innerHTML += `<option value="${u.user.id}">${u.user.name}</option>`;
            });
        });

        fetchWithAuth(`${api}/specialroles/${selected.roleType}`).then(roles => {
            roles.forEach(r => {
                specialRoleSelect.innerHTML += `<option value="${r.id}">${r.name}</option>`;
            });
        });
    }

    function resetFrom(step) {
        if (step === "faculty") {
            departmentSelect.disabled = true;
            departmentSelect.innerHTML = "";
        }

        userSelect.disabled = true;
        userSelect.innerHTML = "";
        specialRoleSelect.disabled = true;
        specialRoleSelect.innerHTML = "";

        startDateInput.disabled = true;
        startDateInput.value = "";
        endDateInput.disabled = true;
        endDateInput.value = "";

        submitBtn.disabled = true;
    }

    function resetValues() {
        Object.assign(selected, {
            facultyId: "", departmentId: "", userId: "",
            specialRoleId: "", startDate: "", endDate: ""
        });

        facultySelect.disabled = true;
        departmentSelect.disabled = true;
        userSelect.disabled = true;
        specialRoleSelect.disabled = true;
        startDateInput.disabled = true;
        endDateInput.disabled = true;
        submitBtn.disabled = true;

        facultySelect.innerHTML = "";
        departmentSelect.innerHTML = "";
        userSelect.innerHTML = "";
        specialRoleSelect.innerHTML = "";

        startDateInput.value = "";
        endDateInput.value = "";
    }

    pushToMain(form);
}
