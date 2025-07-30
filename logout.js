
async function logout() {
    //  document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const token = getCookie("TOKEN");

    if (!token) {
        console.warn("No token found in cookies.");
        clearSessionAndReload();
        return;
    }

    try {
        const response = await fetch(`${api}/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("logout failed");
            }
            return response.json();
        })
        .then(data => {
         document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.reload();
        })
        
    } catch (error) {
        showError("Error while logout ,please check if you are connected to the internet");
        console.error("Error during logout:", error);
    } 
}
