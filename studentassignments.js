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
function showStudentCoursesAssignmentList() {
    fetchWithAuth(`${api}/${path}`, true).then(assignments => {
        if (!assignments) return;
        console.log(assignments);
        const main = document.getElementById("mainContent");
        main.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.style = `
            padding: 2rem;
            max-width: 900px;
            margin: auto;
            color: white;
        `;

        const heading = document.createElement("h2");
        heading.textContent = "📚 Assignment List";
        heading.style = "font-size: 2rem; margin-bottom: 1.5rem;";
        wrapper.appendChild(heading);

        const table = document.createElement("table");
        table.style = `
            width: 100%;
            border-collapse: collapse;
            background-color: #2c2c2c;
            border-radius: 10px;
            overflow: hidden;
        `;

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr style="background-color: #1e1e1e; color: white;">
                <th style="padding: 10px; text-align: left;">Number</th>
                <th style="padding: 10px; text-align: left;">Title</th>
                <th style="padding: 10px; text-align: left;">Deadline</th>
                <th style="padding: 10px; text-align: left;">Submitted</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        assignments.forEach(assignment => {
            const tr = document.createElement("tr");
            tr.style.cursor = "pointer";
            tr.addEventListener("mouseenter", () => {
                tr.style.backgroundColor = "#3a3a3a";
            });
            tr.addEventListener("mouseleave", () => {
                tr.style.backgroundColor = "#2c2c2c";
            });

            tr.addEventListener("click", () => {
                path = `${path}/${assignment.assignment.id}/studentassignments/${assignment.id}`;
                viewStudentAssignmentDetails();
                // viewAssignmentDetails(); // Uncomment when ready
            });

            // Determine submitted status (you may need to update this field)
            const submitted = assignment.submitted ? "✅" : "❌";

            tr.innerHTML = `
                <td style="padding: 10px;">${assignment.assignment.number}</td>
                <td style="padding: 10px;">${assignment.assignment.title}</td>
                <td style="padding: 10px;">${assignment.assignment.deadline}</td>
                <td style="padding: 10px;">${submitted}</td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        wrapper.appendChild(table);
        appendToMain(wrapper);
    });
}
