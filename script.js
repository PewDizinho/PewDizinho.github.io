let init = async () => {

    let details = {
        email: "pewdizinho@hotmail.com",
        password: "************"
    };

    let emailInput = document.getElementsByTagName("input")[0];
    let passwordInput = document.getElementsByTagName("input")[1];
    emailInput.value = ""
    for (var letter of details.email.split("")) {
        await delay(100);
        emailInput.value += letter;
    }
    for (var letter of details.password.split("")) {
        await delay(100);
        passwordInput.value += letter;
    }

    await delay(5000);
    sendEmail();
};
const delay = ms => new Promise(res => setTimeout(res, ms));

const sendEmail = () => {
    location.href = "./homeScreen/index.html";
}