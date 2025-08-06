const api = "http://127.0.0.1:8000/api";
const fileapi="http://127.0.0.1:8000"
let path = "";
let currentActivePanel = null;

// =================== Reusable DOM Functions ===================
function pushToMain(html) {
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    main.appendChild(html);
}
function pushToSidePanel(html="") {
    const side = document.getElementById("sidePanel");
    side.appendChild(html);
}
function appendToMain(html) {
    document.getElementById("mainContent").appendChild(html);
}
function appendToSidePanel(html) {
    document.getElementById("sidePanel").appendChild(html);
}

// =================== Form Loader ===================
function whichToload(id, p) {
    if (id === 1) return createTeacherRegistrationForm;
    if (id === 2) return createStudentRegistrationForm;
    if (id === 3) return createFacultyForm;
    if (id === 4) return createDepartmentForm;
    if (id === 5) return allocateSpecialRoleForm;
    if (id === 6) return createCourseForm;
    if (id === 7) return createSessionForm;
    if (id === 8) return teacherYourCources;
    if (id === 9) return createTeacherCourseForm;
    if (id === 10) return studentYourCources;

    if (id === 99) return myAccount;
    return null;
}

// =================== Highlight Active Panel ===================
function handlePanelClick(element, handler,p) {
    path=p;
    if (currentActivePanel) {
        currentActivePanel.style.backgroundColor = "#2c2c2c";
    }
    element.style.backgroundColor = "#0d47a1";
    currentActivePanel = element;
    handler();
}

// =================== Dashboard Renderer ===================
function loadDashboard() {
    document.getElementById("mainContent").innerHTML = "";
    document.getElementById("mainContent").style.justifyContent = "flex-start";
    document.getElementById("sidePanel").innerHTML = "";

    const dashboardCard = createSidePanelCard({
        title: "Dashboard",
        icon: "📁",
        onClick: () => handlePanelClick(dashboardCard, loadDashboard)
    });

    appendToSidePanel(dashboardCard);
    currentActivePanel = dashboardCard;
    dashboardCard.style.backgroundColor = "#0d47a1";

    fetchWithAuth(`${api}/carddetails`).then(cards => {
        if (cards) {
            cards.forEach(element => {
                const handler = whichToload(element.id, element.path);

                const sideItem = createSidePanelCard({
                    icon: element.icon,
                    title: element.title,
                    onClick: () => handlePanelClick(sideItem, handler,element.path)
                });
                appendToMain(createBodyCard({
                    icon: element.icon,
                    title: element.title,
                    subtitle: element.subtitle,
                    onClick: () => handlePanelClick(sideItem, handler,element.path)
                }));

                appendToSidePanel(sideItem);
            });
        }
    }).finally(() => {
        const logoutCard = createSidePanelCard({
            title: "Logout",
            icon: "📤",
            onClick: logout
        });
        appendToSidePanel(logoutCard);
    });
}

// =================== Initial Layout ===================
document.getElementById("body").innerHTML = `
    <div style="display: flex; flex-direction: column; height: 100vh; font-family: sans-serif; margin:0;">
        <!-- Navbar -->
        <nav id="navbar" style="
            background-color: #0d47a1;
            color: white;
            padding: 15px 20px;
            font-size: 20px;
            font-weight: bold;
            display: flex;
            align-items: center;
        ">
            <img src="hstu_logo_.png" alt="Logo" style="height: 30px; margin-right: 10px;">
            <a href="./index.html" style="text-decoration: none; color: inherit;">HSTU-University Management System</a>
        </nav>

        <!-- Content Area -->
        <div style="display: flex; flex: 1; overflow: hidden;">
            <!-- Side Panel -->
            <aside id="sidePanel" style="
                background-color: #1e1e1e;
                color: white;
                width: 220px;
                padding: 0.5vw;
                box-sizing: border-box;
                overflow-y: auto;
                max-height: 100vh;
            "></aside>

            <!-- Main Content -->
            <main id="mainContent" style="
                flex: 1;
                padding: 0.5vw;
                background-color: #121212;
                color: white;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                align-content: flex-start;
                overflow-y: auto;
                max-height: 100vh;
            "></main>
        </div>
    </div>
`;

loadDashboard();
