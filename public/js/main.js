(() => {
    function init() {
        document.getElementById("login-button").addEventListener("click", onLoginClicked)
    }

    function onLoginClicked() {
        const username = document.getElementById("username").value;
        const req = JSON.stringify({
            username : username
        });
        const url = "./login";

        ajax('POST', url, req, (res) => {
            // simply print the result right now
            console.log(res)
        }, () => {
            document.getElementById("login-error").innerText = "User does not exist!"
        })
    }

    init()

})();