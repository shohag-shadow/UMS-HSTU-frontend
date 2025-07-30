function createDepartmentForm() {
    const form = document.createElement("form");
    form.className = "department-form";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "400px";
    form.style.margin = "auto";

    // --- Department Name ---
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Department Name";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "department";
    nameInput.placeholder = "Enter department name";
    nameInput.required = true;

    // --- Faculty Dropdown ---
    const facultyLabel = document.createElement("label");
    facultyLabel.textContent = "Select Faculty";

    const facultySelect = document.createElement("select");
    facultySelect.name = "faculty_id";
    facultySelect.required = true;

    // Placeholder while loading
    const loadingOption = document.createElement("option");
    loadingOption.text = "Loading faculties...";
    facultySelect.add(loadingOption);

        // --- Faculty code field ---
    const codeLabel = document.createElement("label");
    codeLabel.textContent = "Department code";

    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.name = "department_code";
    codeInput.placeholder = "Enter department code";
    codeInput.required = true;

    // --- Submit Button ---
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    submitBtn.style.padding = "0.5rem";
    submitBtn.style.backgroundColor = "#1e90ff";
    submitBtn.style.color = "white";
    submitBtn.style.border = "none";
    submitBtn.style.borderRadius = "5px";
    submitBtn.style.cursor = "pointer";

    // Add elements to form
    form.append( facultyLabel, facultySelect, nameLabel, nameInput,codeLabel,codeInput,submitBtn);

    // Fetch faculties and populate dropdown
    fetchWithAuth(`${api}/faculties`)
        .then(data => {
            facultySelect.innerHTML = "<option value=''>Select Faculty</option>";
            data.forEach(faculty => {
                const option = document.createElement("option");
                option.value = faculty.id;
                option.textContent = faculty.name;
                facultySelect.appendChild(option);
            });
        });

    // Handle submit
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const departmentName = nameInput.value.trim();
        const facultyId = facultySelect.value;
        const departmentCode=codeInput.value;
        if (!departmentName || !facultyId) {
            alert("Please fill out all fields.");
            return;
        }
        postWithAuth(`${api}/faculties/${facultyId}/departments`, { name: departmentName ,code:departmentCode})
            .then(response => {
                if (response) {
                    alert("Creating successful!");
                    loadDashboard();
                }
            });
    });
    pushToMain(form);
}
