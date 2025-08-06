async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch(`${api}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Server responded with Unauthorized (wrong credentials)
                showError("The credentials are incorrect");
            } else {
                // Other server-side error
                const errorBody = await response.text();
                console.error("Login failed, status:", response.status, "| body:", errorBody);
                showError(`Login failed. Server responded with status ${response.status}`);
            }
            return;
        }

        // Successful login
        const data = await response.json();
        const token = data.token;
        setCookie("TOKEN", token, 7);
        location.reload();

    } catch (error) {
        // Network or fetch-level failure
        console.error("Fetch failed:", error);

        if (error.message.includes("Failed to fetch")) {
            showError("Network error: Could not connect to the server. Please try again.");
        } else {
            showError("Something went wrong: " + (error.message || "Unknown error"));
        }
    }
}




async function fetchWithAuth(url, targetMainContentOnly = false) {
    try {
        showLoadingOverlay(targetMainContentOnly);

        const token = getCookie("TOKEN");
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Remove TOKEN if unauthorized
                document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            const errorData = await response.json();
            throw new Error(errorData.message || "Request failed");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        showError(error.message || "An unknown error occurred.");
        return null;
    } finally {
        hideLoadingOverlay();
    }
}



async function postWithAuth(url, bodyObject, targetMainContentOnly = false) {
    showLoadingOverlay(targetMainContentOnly);

    try {
        const isFormData = bodyObject instanceof FormData;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getCookie("TOKEN")}`,
                "Accept": "application/json",
                ...(isFormData ? {} : { "Content-Type": "application/json" }) // Do NOT set Content-Type for FormData
            },
            body: isFormData ? bodyObject : JSON.stringify(bodyObject)
        });

        if (!response.ok) {
            if (response.status === 401) {
                deleteCookie("TOKEN");
                location.reload();
            }
            const errorData = await response.json();
            throw new Error(errorData.message || "Request failed");
        }

        return await response.json();
    } catch (error) {
        showError(error.message || "An unknown error occurred.");
        return null;
    } finally {
        hideLoadingOverlay();
    }
}

