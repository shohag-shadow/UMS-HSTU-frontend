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
function showTeacherCoursesAssignmentList() {


    path = `${path}/assignments`;
    fetchWithAuth(`${api}/${path}`, true).then(assignments => {
        if (!assignments) return;
        console.log(assignments);
        const main = document.getElementById("mainContent");
        main.innerHTML = "";// Clear main content

        const wrapper = document.createElement("div");
        wrapper.style = `
            padding: 2rem;
            max-width: 800px;
            margin: auto;
            color: white;
        `;

        const heading = document.createElement("h2");
        heading.textContent = "📚 Assignment List";
        heading.style = "font-size: 2rem; margin-bottom: 1.5rem;";
        wrapper.appendChild(heading);

        assignments.forEach(assignment => {
            const item = document.createElement("div");
            item.style = `
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 8px;
                background-color: #2c2c2c;
                cursor: pointer;
                transition: background-color 0.2s ease;
            `;

            item.addEventListener("mouseenter", () => {
                item.style.backgroundColor = "#3a3a3a";
            });
            item.addEventListener("mouseleave", () => {
                item.style.backgroundColor = "#2c2c2c";
            });

            item.addEventListener("click", () => {
                // Handle assignment click here
                path=`${path}/${assignment.id}`;
                viewAssignmentDetails();
            });

            item.innerHTML = `
                <strong>Assignment ${assignment.number}:</strong> ${assignment.title}<br>
                <span style="color: #ccc;">Deadline: ${assignment.deadline}</span>
            `;

            wrapper.appendChild(item);
        });

        // ✅ Create New Assignment Button
        const createButton = document.createElement("button");
        createButton.textContent = "➕ Create New Assignment";
        createButton.style = `
            margin-top: 2rem;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        `;
        createButton.addEventListener("mouseenter", () => {
            createButton.style.backgroundColor = "#45a049";
        });
        createButton.addEventListener("mouseleave", () => {
            createButton.style.backgroundColor = "#4caf50";
        });

        createButton.addEventListener("click", () => {
            createAssignmentForm(); 
        });

        wrapper.appendChild(createButton);
        appendToMain(wrapper);
    });
}