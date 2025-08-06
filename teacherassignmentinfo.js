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
function viewAssignmentDetails() {
    fetchWithAuth(`${api}/${path}`)
        .then(assignment => {
            if (!assignment) return;
            console.log(assignment);

            const container = document.createElement("div");
            container.style = `
                width: 100%;
                height: 100%;
                padding: 20px;
                
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
            // Deadline
            const deadlineEl = document.createElement("p");
            deadlineEl.innerHTML = `<strong>Deadline:</strong> ${assignment.deadline || "No deadline set."}`;
            deadlineEl.style = "margin-bottom: 20px;";
            container.appendChild(deadlineEl);

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

            // Submission Table
            const table = document.createElement("table");
            table.style = "width: 100%; margin-top: 2rem; border-collapse: collapse;";
            table.innerHTML = `
                <thead>
                    <tr style="background-color: #444; color: white;">
                        <th style="padding: 8px; border: 1px solid #666;">Student ID</th>
                        <th style="padding: 8px; border: 1px solid #666;">Submitted</th>
                        <th style="padding: 8px; border: 1px solid #666;">Download</th>
                    </tr>
                </thead>
                <tbody id="submissionRows"></tbody>
            `;
            container.appendChild(table);

            const tbody = table.querySelector("#submissionRows");

            if (assignment.studentassignments && assignment.studentassignments.length > 0) {
                assignment.studentassignments.forEach(sub => {
                    const tr = document.createElement("tr");

                    const downloadBtn = sub.file_path
                        ? `<a href="${fileapi}/storage/${sub.file_path}" target="_blank" style="
                            display: inline-block;
                            padding: 6px 12px;
                            background-color: #007BFF;
                            color: white;
                            text-decoration: none;
                            border-radius: 4px;
                            font-size: 0.9rem;
                        ">Download</a>`
                        : "-";

                    tr.innerHTML = `
                        <td style="padding: 8px; border: 1px solid #666;">${sub.student?.studentid || "-"}</td>
                        <td style="padding: 8px; border: 1px solid #666;">${sub.submitted ? "✅" : "❌"}</td>
                        <td style="padding: 8px; border: 1px solid #666;">${downloadBtn}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                const emptyRow = document.createElement("tr");
                emptyRow.innerHTML = `<td colspan="3" style="text-align:center;padding:8px;">No submissions yet.</td>`;
                tbody.appendChild(emptyRow);
            }

            pushToMain(container);
        });
}