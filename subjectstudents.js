function createStudentTable() {
    const wrapper = document.createElement("div");
    wrapper.style.maxWidth = "1000px";
    wrapper.style.margin = "2rem auto";
    wrapper.style.overflowX = "auto";

    const heading = document.createElement("h2");
    heading.textContent = "Student List";
    heading.style.textAlign = "center";
    heading.style.marginBottom = "1rem";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.border = "1px solid #ddd";
    table.style.boxShadow = "0 0 10px rgba(0,0,0,0.05)";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Student ID", "Name", "Email"];

    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.padding = "0.75rem";
        th.style.backgroundColor = "#0831ffff";
        th.style.borderBottom = "2px solid #ccc";
        th.style.textAlign = "left";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    fetchWithAuth(`${api}/${path}?include=students`)
        .then(students => {
            console.log(students);
            if (!students || students.length === 0) {
                const emptyRow = document.createElement("tr");
                const td = document.createElement("td");
                td.colSpan = headers.length;
                td.textContent = "No students found.";
                td.style.padding = "1rem";
                td.style.textAlign = "center";
                emptyRow.appendChild(td);
                tbody.appendChild(emptyRow);
            } else {
                students.forEach(student => {
                    const tr = document.createElement("tr");

                    const values = [
                        student.studentid,
                        student.user?.name || "—",
                        student.user?.email || "—",
                    ];

                    values.forEach(value => {
                        const td = document.createElement("td");
                        td.textContent = value;
                        td.style.padding = "0.75rem";
                        td.style.borderBottom = "1px solid #eee";
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });
            }

            table.appendChild(tbody);
            wrapper.append(heading, table);
            pushToMain(wrapper);
        })
        .catch(error => {
            console.error("Error loading students:", error);
            showError("Failed to load student data.");
        });
}
