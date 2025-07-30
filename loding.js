function showLoadingOverlay(targetMainContentOnly = false) {
    // Avoid duplicate overlays
    if (document.getElementById('loadingOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';

    const styles = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999',
    };

    if (!targetMainContentOnly) {
        styles.position = 'fixed';
        styles.width = '100vw';
        styles.height = '100vh';
    }

    Object.assign(overlay.style, styles);

    overlay.innerHTML = `
        <div style="
            width: 40px;
            height: 40px;
            border: 4px solid #fff;
            border-top: 4px solid #4caf50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <p style="color: white; margin-top: 10px; font-family: sans-serif;">Loading...</p>
    `;

    if (targetMainContentOnly) {
        const target = document.getElementById('mainContent');
        target.style.position = 'relative'; // ensure positioning
        target.appendChild(overlay);
    } else {
        document.body.appendChild(overlay);
    }

    // Add keyframes once
    if (!document.getElementById('spinnerStyle')) {
        const style = document.createElement('style');
        style.id = 'spinnerStyle';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}
