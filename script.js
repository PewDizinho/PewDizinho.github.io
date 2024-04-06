let init = async () => {
    let details = {
        email: "pewdizinho@hotmail.com",
        password: "************"
    };
    let emailInput = document.getElementsByTagName("input")[0];
    let passwordInput = document.getElementsByTagName("input")[1];
    emailInput.value = "";
    var audio = new Audio('./assets/typing.mp3');
    await delay(5500);
    audio.play();
    for (var letter of details.email.split("")) {
        await delay(100);
        emailInput.value += letter;
    }
    for (var letter of details.password.split("")) {
        await delay(100);
        passwordInput.value += letter;
    }
    audio.pause();
    audio.currentTime = 0;
    await delay(5000);
    sendEmail();
};
const delay = ms => new Promise(res => setTimeout(res, ms));
const changeIt = () => {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainPage").style.display = "";
    var audio = new Audio('./assets/startup.mp3');
    audio.play();

    init();
}
const sendEmail = () => {
    location.href = "./homeScreen/index.html";
}