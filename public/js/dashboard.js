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
            document.getElementById("error-holder").innerText = "";
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load your current schedule!";
            document.getElementById("data-holder").innerText = "";
        })
    }

    function onProfileRefClicked() {
        const url = "./" + userInfo + "/profile";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
            document.getElementById("error-holder").innerText = "";
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load your current profile!";
            document.getElementById("data-holder").innerText = ""
        })
    }

    function onCoursesRefClicked() {
        const url = "./" + userInfo + "/courses";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
            document.getElementById("error-holder").innerText = "";
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load courses!";
            document.getElementById("data-holder").innerText = ""
        })
    }

    function onTrainersRefClicked() {
        const url = "./" + userInfo + "/trainers";
        ajax('GET', url, null, (res) => {
            document.getElementById("data-holder").innerHTML = res;
            document.getElementById("error-holder").innerText = "";
        }, () => {
            document.getElementById("error-holder").innerText = "Cannot load trainers!";
            document.getElementById("data-holder").innerText = ""
        })
    }



    init();

})();

function onRegisterCourseClicked(course) {
    console.log("Register!")
}

function onUnregisterCourseClicked(course) {
    console.log("Unregister!")
}

