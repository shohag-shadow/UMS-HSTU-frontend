function createCourseMaterialForm() {
    const container = document.createElement("div");
    container.style = `
        max-width: 600px;
        margin: auto;
        padding: 2rem;
        color: white;
    `;

    const heading = document.createElement("h2");
    heading.textContent = "📤 Upload Course Material";
    heading.style = "font-size: 1.8rem; margin-bottom: 1.5rem;";
    container.appendChild(heading);

    // Form element
    const form = document.createElement("form");
    form.enctype = "multipart/form-data";

    // Title input
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.style = "display:block; margin-bottom:5px;";
    form.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.required = true;
    titleInput.style = `
        width: 100%;
        padding: 10px;
        margin-bottom: 1.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    `;
    form.appendChild(titleInput);

    // File input
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Choose a File";
    fileLabel.style = "display:block; margin-bottom:5px;";
    form.appendChild(fileLabel);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.required = true;
    fileInput.accept = "*/*";
    fileInput.style = `
        margin-bottom: 1.5rem;
        display: block;
    `;
    form.appendChild(fileInput);

    // Submit Button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Material";
    submitBtn.style = `
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    `;
    submitBtn.onmouseover = () => submitBtn.style.backgroundColor = "#218838";
    submitBtn.onmouseout = () => submitBtn.style.backgroundColor = "#28a745";

    form.appendChild(submitBtn);

    // Form submit event
    form.onsubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", titleInput.value);
        formData.append("file", fileInput.files[0]);

        postWithAuth(`${api}/${path}`, formData, true).then(success => {
            if (success) {
                //showCourseMaterialsPage(); // Reload materials list
                alert("Creating successfull");
                loadDashboard();
            }
        });
    };

    container.appendChild(form);

    pushToMain(container);
}
