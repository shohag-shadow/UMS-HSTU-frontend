api = "http://127.0.0.1:8000/api";

if (hasCookie("TOKEN")) {
    const dashboardScript = document.createElement("script");
    dashboardScript.src = "dashboard.js";
    dashboardScript.id = "mainScript";
    document.body.appendChild(dashboardScript);
} else {
    document.getElementById("body").innerHTML = `
        <h2 style="text-align:center; color:white; font-family:sans-serif;">Login Page</h2>
        <form onsubmit="login(event)" style="
            background-color: #1e1e1e;
            color: #ffffff;
            padding: 30px;
            max-width: 350px;
            margin: 40px auto;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.6);
            font-family: sans-serif;
            text-align: center;
        ">
            <img src="hstu_logo_.png" alt="Logo" style="
                max-width: 120px;
                max-height:120px;
                margin-bottom: 20px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            ">

            <label for="email" style="display:block; margin-bottom:8px; text-align:left;">Email</label>
            <input type="email" id="email" placeholder="Email" required style="
                width: 100%;
                padding: 10px;
                margin-bottom: 20px;
                border: none;
                border-radius: 6px;
                background-color: #2c2c2c;
                color: #fff;
            ">

            <label for="password" style="display:block; margin-bottom:8px; text-align:left;">Password</label>
            <input type="password" id="password" placeholder="Password" required style="
                width: 100%;
                padding: 10px;
                margin-bottom: 20px;
                border: none;
                border-radius: 6px;
                background-color: #2c2c2c;
                color: #fff;
            ">

            <button type="submit" style="
                width: 100%;
                padding: 12px;
                background-color: #4caf50;
                border: none;
                border-radius: 6px;
                color: white;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s;
            ">Login</button>
        </form>
    `;
}
