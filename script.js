let shouldKeepGoing = false;
var typing = new Audio('./assets/typing.mp3');
let init = async () => {
    let details = {
        email: "pewdizinho@hotmail.com",
        password: "************"
    };
    let emailInput = document.getElementsByTagName("input")[0];
    let passwordInput = document.getElementsByTagName("input")[1];
    emailInput.value = "";
    passwordInput.value = "";
    if (!shouldKeepGoing) return;
    await delay(3000);
    if (!shouldKeepGoing) return;
    typing.play();
    for (var letter of details.email.split("")) {
        await delay(100);
        if (!shouldKeepGoing) return;
        emailInput.value += letter;
    }
    for (var letter of details.password.split("")) {
        await delay(100);
        if (!shouldKeepGoing) return;
        passwordInput.value += letter;
    }
    if (!shouldKeepGoing) return;
    typing.pause();
    typing.currentTime = 0;
    await delay(5000);
    if (!shouldKeepGoing) return;
    sendEmail();
};
const delay = ms => new Promise(res => setTimeout(res, ms));
const changeIt = () => {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainPage").style.display = "";
    var audio = new Audio('./assets/startup.mp3');
    audio.play();
    //mouseAnimation();

}
const sendEmail = () => {
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
    setTimeout(() => {

        clickMyMsn()
    }, 1000)

};
const clickMyMsn = () => {

    const myMsn = document.getElementById("aboutMeMsn");
    if (myMsn.style.display == "none") {
        myMsn.style.display = "";
        msnTaskBar.style.backgroundColor = "rgba(255, 255, 255, .3)";
        msnTaskBar.style.borderBottom = "1px solid rgba(255, 255, 255, .3)";
        clickMsn();
        init();
    } else {
        msnTaskBar.style.backgroundColor = "rgba(0, 0, 0, 0)";
        msnTaskBar.style.borderBottom = "1px solid rgba(0, 0, 0, 0)";
        myMsn.style.display = "none";
        typing.pause();
        typing.currentTime = 0;
    }
};
const clickMsn = () => {
    const msn = document.getElementById("msn");
    const msnTaskBar = document.getElementById("msnTaskBar")
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
    setTimeout(() => {
        if (msn.style.display == "none") {
            msn.style.display = "";
            msnTaskBar.style.backgroundColor = "rgba(255, 255, 255, .3)";
            msnTaskBar.style.borderBottom = "1px solid rgba(255, 255, 255, .3)";
            shouldKeepGoing = true;
            init();

        } else {
            msnTaskBar.style.backgroundColor = "rgba(0, 0, 0, 0)";
            msnTaskBar.style.borderBottom = "1px solid rgba(0, 0, 0, 0)";
            msn.style.display = "none";
            typing.pause();
            typing.currentTime = 0;
            shouldKeepGoing = false;

        }
    }, 100); //TODO: Diminuir o tamanho do audio de click

};

const openIe = () => {
    const ieTaskBar = document.getElementById("ieTaskBar")
    const ie = document.getElementById("iexplorer-wiki");
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
    if (ie.style.display == "none") {
        ie.style.display = "";
        ieTaskBar.style.backgroundColor = "rgba(255, 255, 255, .3)";
        ieTaskBar.style.borderBottom = "1px solid rgba(255, 255, 255, .3)";
    } else {
        ieTaskBar.style.backgroundColor = "rgba(0, 0, 0, 0)";
        ieTaskBar.style.borderBottom = "1px solid rgba(0, 0, 0, 0)";
        ie.style.display = "none";
    }
}
const closeTab = (tabId) => {

    const tab = document.getElementById(tabId);
    tab.style.display = "none";
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
    document.getElementById("ieTaskBar").style.backgroundColor = "rgba(0, 0, 0, 0)";
    document.getElementById("ieTaskBar").style.borderBottom = "1px solid rgba(0, 0, 0, 0)";
};

const clickText = () => {
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
    document.getElementById("text-block").style.display = "";
}

const mouseAnimation = () => {
    const mouse = document.getElementById("cursor");
    mouse.style.display = "";

    document.getElementsByTagName("body")[0].style.cursor = 'url(".//assets//cursor-inv.png"), auto';


    setTimeout(() => {
        mouse.style.animation = 'goToEdge 2.5s infinite linear';
        setTimeout(() => {
            document.getElementById('edgeIcon').classList.add('iconHover');

            document.getElementById("cursor-img").setAttribute("src", "./assets/cursors/link.cur");
            mouse.style.animation = 'none';
            mouse.style.left = "45px";
            mouse.style.top = "165px";

            setTimeout(() => {
                document.getElementById('edgeIcon').classList.remove('iconHover');

                openIe();
                mouse.style.display = "none";
                document.getElementsByTagName("body")[0].style.cursor = 'url("./assets//cursors//arrow.cur"), auto';
            }, 2000);

        }, 2500);
    }, 1000);



};

const changeWiki = (title) => {
    const validTitles = ['Sobre', 'Carreira', 'Projetos'];
    if(validTitles.indexOf(title) == -1) return;
    for(let titles of validTitles){
        document.getElementById(titles).style.display = "none";
    }
    document.getElementById(title).style.display = "";
}