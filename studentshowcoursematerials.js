function showStudentCourseMaterialsPage() {
    path=`${path}/coursematerials`;
    fetchWithAuth(`${api}/${path}`, true).then(materials => {
        if (!materials) return;
        console.log(materials);
        const container = document.createElement("div");
        container.style = `
            max-width: 900px;
            margin: auto;
            padding: 2rem;
            color: white;
        `;

        const heading = document.createElement("h2");
        heading.textContent = "📚 Course Materials";
        heading.style = "font-size: 2rem; margin-bottom: 1.5rem;";
        container.appendChild(heading);

        const table = document.createElement("table");
        table.style = `
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2rem;
        `;

        // Table header
        table.innerHTML = `
            <thead>
                <tr style="background-color: #444; color: white;">
                    <th style="padding: 10px; border: 1px solid #666;">#</th>
                    <th style="padding: 10px; border: 1px solid #666;">Title</th>
                    <th style="padding: 10px; border: 1px solid #666;">Download</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        materials.forEach((material, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="padding: 10px; border: 1px solid #666; text-align:center;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #666;">${material.title}</td>
                <td style="padding: 10px; border: 1px solid #666; text-align:center;">
                    <a href="${fileapi}/storage/${material.file_path}" target="_blank" style="
                        color: #4ad;
                        text-decoration: underline;
                        font-weight: bold;
                    ">📥 Download</a>
                </td>
            `;
            tbody.appendChild(row);
        });

        container.appendChild(table);

        pushToMain(container);
    });
}
