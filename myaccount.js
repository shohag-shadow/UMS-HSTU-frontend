function myAccount() {
    fetchWithAuth(`${api}/user`, true).then(user => {
        if (!user) return;

        const main = document.getElementById("mainContent");
        main.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.style = `
            padding: 3rem;
            max-width: 800px;
            margin: auto;
            color: white;
            line-height: 1.8;
            font-size: 1.2rem;
        `;

        const heading = document.createElement("h1");
        heading.textContent = "👤 My Account";
        heading.style = "margin-bottom: 2rem; font-size: 2rem;";
        wrapper.appendChild(heading);

        const addField = (label, value) => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${label}:</strong> ${value}`;
            wrapper.appendChild(p);
        };

        // Basic info
        addField("Name", user.name || "-");
        addField("Email", user.email || "-");
        addField("User ID", user.id || "-");

        // Type mapping
        const accountTypes = {
            0: "Admin",
            1: "Teacher",
            2: "Student",
            3: "Department Staff",
            4: "Faculty Staff"
        };

        addField("Account Type", accountTypes[user.type] || "Unknown");

        appendToMain(wrapper);
    });
}
