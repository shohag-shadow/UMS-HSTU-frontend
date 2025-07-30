function createFacultyForm() {
    const form = document.createElement("form");
    form.className = "faculty-form";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "400px";
    form.style.margin = "auto";

    // --- Faculty Name field ---
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Faculty Name";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "faculty";
    nameInput.placeholder = "Enter faculty name";
    nameInput.required = true;

    // --- Faculty code field ---
    const codeLabel = document.createElement("label");
    codeLabel.textContent = "Faculty code";

    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.name = "faculty_code";
    codeInput.placeholder = "Enter faculty code";
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

    form.append(nameLabel, nameInput,codeLabel,codeInput, submitBtn);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const facultyName = nameInput.value.trim();
        const facultyCode=codeInput.value.trim();
        if (!facultyName) {
            alert("Faculty name cannot be empty");
            return;
        }
        if (!facultyCode) {
            alert("Faculty code cannot be empty");
            return;
        }
        postWithAuth(`${api}/faculties`, { name: facultyName, code:facultyCode})
            .then(response => {
                if (response) {
                    alert("Creating successful!");
                    loadDashboard();
                }
            });
    });

    pushToMain(form);
}
