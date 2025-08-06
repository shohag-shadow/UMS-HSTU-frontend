function pushToMain(html) {
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    main.appendChild(html);
}
function pushToSidePanel(html = "") {
    const side = document.getElementById("sidePanel");
    side.appendChild(html);
}
function appendToMain(html) {
    document.getElementById("mainContent").appendChild(html);
}
function appendToSidePanel(html) {
    document.getElementById("sidePanel").appendChild(html);
}

function createAssignmentForm() {
    const main = document.getElementById("mainContent");
    main.innerHTML = ""; // Clear existing content

    const formWrapper = document.createElement("div");
    formWrapper.style = `
        padding: 2rem;
        max-width: 600px;
        margin: auto;
        color: white;
    `;

    const heading = document.createElement("h2");
    heading.textContent = "📝 Create New Assignment";
    heading.style = "font-size: 1.8rem; margin-bottom: 1.5rem;";
    formWrapper.appendChild(heading);

    const form = document.createElement("form");
    form.enctype = "multipart/form-data";

    const fields = [
        { label: "Assignment Title", type: "text", name: "title", required: true },
        { label: "Description", type: "textarea", name: "description", required: false },
        { label: "Deadline", type: "date", name: "deadline", required: true },
        { label: "Upload File (PDF, DOC, DOCX)", type: "file", name: "file", required: false }
    ];

    const inputs = {};

    fields.forEach(field => {
        const group = document.createElement("div");
        group.style = "margin-bottom: 1.2rem;";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.style = "display: block; margin-bottom: 0.5rem;";
        group.appendChild(label);

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
            input.rows = 4;
        } else {
            input = document.createElement("input");
            input.type = field.type;
        }

        input.name = field.name;
        input.required = field.required;
        input.style = `
            width: 100%;
            padding: 0.6rem;
            border-radius: 6px;
            border: none;
            outline: none;
        `;

        if (field.type === "file") {
            input.accept = ".pdf,.doc,.docx";
        }

        inputs[field.name] = input;
        group.appendChild(input);
        form.appendChild(group);
    });

    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Assignment";
    submitBtn.style = `
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
    `;

    form.appendChild(submitBtn);
    formWrapper.appendChild(form);
    appendToMain(formWrapper);

    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", inputs.title.value);
        formData.append("deadline", inputs.deadline.value);

        if (inputs.description.value.trim()) {
            formData.append("description", inputs.description.value);
        }

        if (inputs.file.files.length > 0) {
            formData.append("file", inputs.file.files[0]);
        }

        postWithAuth(`${api}/${path}`, formData, true).then(response => {
            if (response) {
                alert("✅ Assignment created successfully!");
                loadDashboard(); // Return to assignment list
            }
        });
    });
}
