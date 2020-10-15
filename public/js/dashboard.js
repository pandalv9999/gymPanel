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

function onRegisterCourseClicked(courseId) {
    const url = "./course";
    const data = JSON.stringify({
        username: document.getElementById("user-info").innerText,
        courseId: courseId
    });

    ajax('PUT', url, data, () => {
        const currEnrolled = parseInt(document.getElementById("curr-enrolled" + courseId).innerText);
        document.getElementById("info-holder" + courseId).innerText = "Registered course successfully!";
        document.getElementById("curr-enrolled" + courseId).innerText = (currEnrolled + 1).toString();
        document.getElementById("button-placeholder" + courseId).innerHTML =
            "<button onclick=onUnregisterCourseClicked(" + courseId + ")>Unregister</button>";
        setTimeout(() => document.getElementById("info-holder" + courseId).innerText = "", 5000);
    }, () => {
        document.getElementById("info-holder" + courseId).innerText = "Registered course failed!";
        setTimeout(() => document.getElementById("info-holder" + courseId).innerText = "", 5000);
    });


}

function onUnregisterCourseClicked(courseId) {
    const url = "./course";
    const data = JSON.stringify({
        username: document.getElementById("user-info").innerText,
        courseId: courseId
    });

    ajax('DELETE', url, data, () => {
        const currEnrolled = parseInt(document.getElementById("curr-enrolled" + courseId).innerText);
        document.getElementById("info-holder" + courseId).innerText = "Unregistered course successfully!";
        document.getElementById("curr-enrolled" + courseId).innerText = (currEnrolled - 1).toString();
        document.getElementById("button-placeholder" + courseId).innerHTML =
            "<button onclick=onRegisterCourseClicked(" + courseId + ")>Register</button>";
        setTimeout(() => document.getElementById("info-holder" + courseId).innerText = "", 5000);
    }, () => {
        document.getElementById("info-holder" + courseId).innerText = "Unregister course failed!";
        setTimeout(() => document.getElementById("info-holder" + courseId).innerText = "", 5000);
    });

}

