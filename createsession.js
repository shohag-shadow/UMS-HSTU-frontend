function createSessionForm() {
    const form = document.createElement("form");
    form.className = "faculty-form";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    form.style.maxWidth = "400px";
    form.style.margin = "auto";

    // --- Faculty Name field ---
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Session Year";

    const nameInput = document.createElement("input");
    nameInput.type = "number";
    nameInput.name = "session";
    nameInput.placeholder = "Enter session year";
    nameInput.required = true;

    // --- Faculty code field ---
    const codeLabel = document.createElement("label");
    codeLabel.textContent = "Session code";

    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.name = "session_code";
    codeInput.placeholder = "Enter session code";
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
        const sessionYear = nameInput.value.trim();
        const sessionCode=codeInput.value.trim();
        if (!sessionYear) {
            alert("Faculty name cannot be empty");
            return;
        }
        if (!sessionCode) {
            alert("Faculty code cannot be empty");
            return;
        }
        postWithAuth(`${api}/sessions`, { year: sessionYear, code:sessionCode})
            .then(response => {
                if (response) {
                    alert("Creating successful!");
                    loadDashboard();
                }
            });
    });

    pushToMain(form);
}
