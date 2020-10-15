(() => {
    const userInfo = document.getElementById("user-info").innerText;
    function init() {
        document.getElementById("schedule-ref").addEventListener("click", onScheduleRefClicked);
        document.getElementById("profile-ref").addEventListener("click", onProfileRefClicked);
        document.getElementById("courses-ref").addEventListener("click", onCoursesRefClicked);
        document.getElementById("trainers-ref").addEventListener("click", onTrainersRefClicked);
    }

    function onScheduleRefClicked() {
        const url = "./" + userInfo + "/schedule";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load your current schedule!";

        })
    }

    function onProfileRefClicked() {
        const url = "./" + userInfo + "/profile";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load your current profile!";
        })
    }

    function onCoursesRefClicked() {
        const url = "./" + userInfo + "/courses";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load courses!";
        })
    }

    function onTrainersRefClicked() {
        const url = "./" + userInfo + "/trainers";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load trainers!";
        })
    }

    init();

})();