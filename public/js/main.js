(() => {
    function init() {
        document.getElementById("login-button").addEventListener("click", onLoginClicked);
    }

    function onLoginClicked() {
        location.href = "./" + document.getElementById("username").value;
    }

    init()

})();