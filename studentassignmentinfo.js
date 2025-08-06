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

function viewStudentAssignmentDetails() {
    fetchWithAuth(`${api}/${path}`)
        .then(assignment => {
            if (!assignment) return;
            console.log(assignment);

            const user = JSON.parse(localStorage.getItem("authUser"));
            const studentId = user?.id;

            const container = document.createElement("div");
            container.style = `
                width: 100%;
                height: 100%;
                padding: 20px;
                color: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            `;

            // Title
            const titleEl = document.createElement("h2");
            titleEl.textContent = `Title: ${assignment.title}`;
            titleEl.style = "margin-bottom: 10px;";
            container.appendChild(titleEl);
            // Description
            const descEl = document.createElement("p");
            descEl.innerHTML = `<strong>Description:</strong> ${assignment.description || "No description provided."}`;
            descEl.style = "margin-bottom: 20px;";
            container.appendChild(descEl);

            // Download button if file exists
            if (assignment.file_path) {
                const fileBtn = document.createElement("a");
                fileBtn.href = `${fileapi}/storage/${assignment.file_path}`;
                fileBtn.target = "_blank";
                fileBtn.textContent = "📥 Download Attached File";
                fileBtn.style = `
                    display: inline-block;
                    margin-bottom: 20px;
                    padding: 10px 16px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    transition: background 0.3s ease;
                `;
                fileBtn.onmouseover = () => fileBtn.style.backgroundColor = "#45a049";
                fileBtn.onmouseout = () => fileBtn.style.backgroundColor = "#4CAF50";
                container.appendChild(fileBtn);
            }

            // Check submission
            const submission = assignment.student_assignments?.find(s => s.student_id === studentId);

            if (submission) {
                const submittedMsg = document.createElement("p");
                submittedMsg.textContent = "✅ You have already submitted this assignment.";
                submittedMsg.style = "margin-top: 30px; color: lightgreen; font-weight: bold;";
                container.appendChild(submittedMsg);
            } else {
                // Show form
                const form = document.createElement("form");
                form.style = "margin-top: 30px;";
                form.enctype = "multipart/form-data";

                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = ".pdf,.doc,.docx,.zip,.rar,.txt"; // adjust types if needed
                fileInput.required = true;
                fileInput.style = "margin-bottom: 10px; display: block;";
                form.appendChild(fileInput);

                const submitBtn = document.createElement("button");
                submitBtn.textContent = "📤 Submit Assignment";
                submitBtn.type = "submit";
                submitBtn.style = `
                    padding: 10px 16px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                `;
                submitBtn.onmouseover = () => submitBtn.style.backgroundColor = "#0069d9";
                submitBtn.onmouseout = () => submitBtn.style.backgroundColor = "#007bff";

                form.appendChild(submitBtn);

                form.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const file = fileInput.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await fetchWithAuth(`${api}/student/submit/${assignment.id}`, false, {
                        method: "POST",
                        body: formData
                    });

                    if (res) {
                        alert("✅ Assignment submitted successfully!");
                        viewStudentAssignmentDetails(); // refresh view
                    }
                });

                container.appendChild(form);
            }

            pushToMain(container);
        });
}
