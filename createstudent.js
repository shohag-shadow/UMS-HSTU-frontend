function createStudentRegistrationForm() {
    const form = document.createElement("form");
    form.className = "registration-form";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "400px";
    form.style.margin = "auto";

    // --- Faculty Dropdown ---
    const facultyLabel = document.createElement("label");
    facultyLabel.textContent = "Faculty";
    const facultySelect = document.createElement("select");
    facultySelect.name = "faculty";
    facultySelect.required = true;

    // --- Department Dropdown ---
    const departmentLabel = document.createElement("label");
    departmentLabel.textContent = "Department";
    const departmentSelect = document.createElement("select");
    departmentSelect.name = "department";
    departmentSelect.required = true;

    // --- Name Input ---
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.required = true;


    // --- Email Input ---
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;

    // --- Password Input ---
    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Password";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.required = true;

    // --- Verify Password Input ---
    const verifyPasswordLabel = document.createElement("label");
    verifyPasswordLabel.textContent = "Verify Password";
    const verifyPasswordInput = document.createElement("input");
    verifyPasswordInput.type = "password";
    verifyPasswordInput.name = "verify_password";
    verifyPasswordInput.required = true;

    // --- Password Error Message ---
    const passwordError = document.createElement("div");
    passwordError.style.color = "red";
    passwordError.style.fontSize = "0.9rem";

    verifyPasswordInput.addEventListener("input", () => {
        if (verifyPasswordInput.value !== passwordInput.value) {
            passwordError.textContent = "Passwords do not match.";
        } else {
            passwordError.textContent = "";
        }
    });

    // --- Submit Button ---
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Register";

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (passwordInput.value !== verifyPasswordInput.value) {
            passwordError.textContent = "Passwords do not match.";
            return;
        }

        const faculty = facultySelect.value;
        const department = departmentSelect.value;

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            password_confirmation: verifyPasswordInput.value
        };

        postWithAuth(`${api}/faculties/${faculty}/departments/${department}/students`, formData, true)
            .then(response => {
                if (response) {
                    alert(`Student registration successful!\nStudent id ${response["studentid"]}`);
                    loadDashboard();
                }
            });
    });

    // --- Append All Fields to Form ---
    form.append(
        facultyLabel, facultySelect,
        departmentLabel, departmentSelect,
        nameLabel, nameInput,
        emailLabel, emailInput,
        passwordLabel, passwordInput,
        verifyPasswordLabel, verifyPasswordInput,
        passwordError,
        submitButton
    );

    // --- Load Faculties ---
    fetchWithAuth(`${api}/faculties`, true).then(faculties => {
        if (!faculties) return;
        facultySelect.innerHTML = "<option value=''>Select Faculty</option>";
        faculties.forEach(faculty => {
            const option = document.createElement("option");
            option.value = faculty.id;
            option.textContent = faculty.name;
            facultySelect.appendChild(option);
        });
    });

    // --- Load Departments on Faculty Change ---
    facultySelect.addEventListener("change", () => {
        const facultyId = facultySelect.value;
        departmentSelect.innerHTML = "<option>Loading...</option>";
        if (!facultyId) return;

        fetchWithAuth(`${api}/faculties/${facultyId}/departments`, true).then(departments => {
            departmentSelect.innerHTML = "<option value=''>Select Department</option>";
            if (!departments) return;
            departments.forEach(dept => {
                const option = document.createElement("option");
                option.value = dept.id;
                option.textContent = dept.name;
                departmentSelect.appendChild(option);
            });
        });
    });

    pushToMain(form);
}
