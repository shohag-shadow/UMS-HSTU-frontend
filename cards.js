function createSidePanelCard({ title, icon = "📁", onClick = null }) {
    const card = document.createElement("div");

    card.style = `
        width: 100%;
        background-color: #2a2a2a;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        margin: 5px auto;
        border-radius: 8px;
        cursor: pointer;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;
        transform-origin: center;
    `;

    card.innerHTML = `
        <div style="font-size: 20px;">${icon}</div>
        <div style="font-size: 16px;">${title}</div>
    `;

    if (typeof onClick === "function") {
        card.addEventListener("click", onClick);
    }

    // Only apply hover effect if this is not the current active panel
    card.addEventListener("mouseenter", () => {
        if (card !== currentActivePanel) {
            card.style.backgroundColor = "#3a3a3a";
            card.style.transform = "scale(1.02)";
        }
    });

    card.addEventListener("mouseleave", () => {
        if (card !== currentActivePanel) {
            card.style.backgroundColor = "#2a2a2a";
            card.style.transform = "scale(1)";
        }
    });

    return card;
}

function createBodyCard({ icon="🗃️", title="title", subtitle=null, onClick=null }) {
    const card = document.createElement("div");

    card.style = `
        width: 30vh;
        height: 30vh;
        margin: 10px 10px 0 0;
        padding: 1rem;
        border-radius: 10px;
        background-color: #1e1e1e;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        transform-origin: center;
    `;

    if (typeof onClick === "function") {
        card.addEventListener("click", onClick);
    }

    const iconSpan = document.createElement("span");
    iconSpan.textContent = icon || "📦";
    iconSpan.style.fontSize = "2rem";

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;
    titleEl.style.margin = "0.5rem 0 0 0";

    const subtitleEl = document.createElement("p");
    subtitleEl.textContent = subtitle;
    subtitleEl.style.margin = "0";

    card.addEventListener("mouseenter", () => {
        card.style.backgroundColor = "#3a3a3a";
        card.style.transform = "scale(1.02)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.backgroundColor = "#1e1e1e";
        card.style.transform = "scale(1)";
    });

    card.append(iconSpan, titleEl, subtitleEl);
    return card;
}
