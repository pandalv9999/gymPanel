(() => {
    function init() {
        document.getElementById("login-button").addEventListener("click", onLoginClicked);
        document.getElementById("register-button").addEventListener("click", onRegisterClicked);
    }

    function onLoginClicked() {
        location.href = "./" + document.getElementById("username").value;
    }

    function onRegisterClicked() {
        location.href = "./register";
    }

    init()

})();