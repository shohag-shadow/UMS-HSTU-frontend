function showError(message) {
    const existing = document.getElementById("errorOverlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "errorOverlay";
    overlay.innerText = message;

    overlay.style.position = "fixed";
    overlay.style.top = "1vh";
    overlay.style.left = "50%";
    overlay.style.transform = "translateX(-50%)";
    overlay.style.background = "rgba(255, 0, 0, 0.45)"; // more transparent
    overlay.style.color = "white";
    overlay.style.padding = "5px 20px";
    overlay.style.borderRadius = "12px";
    overlay.style.boxShadow = `
        0 0 8px rgba(255, 0, 0, 0.4), 
        0 0 16px rgba(255, 0, 0, 0.2)
    `; // fading glow around edges
    overlay.style.backdropFilter = "blur(4px)";
    overlay.style.fontSize = "16px";
    overlay.style.fontWeight = "600";
    overlay.style.opacity = "1";
    overlay.style.zIndex = "9999";
    overlay.style.transition = "opacity 0.5s ease";

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 500);
    }, 5000);
}
