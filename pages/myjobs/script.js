const cards = [
    {
        title: "Pew's Cavern",
        description: "Uma loja que usei como mediadora para meu trabalho de freelancer",
        imgUrl: "../../assets/PewsCavernIcon.png",
        imgBackgroundColor: "#ffff80",
        backgroundColor: "#262626"
    },
    {
        title: "Produtos do Futuro",
        description: "O Produtos do Futuro é o Projeto Integrador da faculdade, obrigatório para a conclusão do ensino superior",
        imgUrl: "https://raw.githubusercontent.com/PewDizinho/PI1/main/assets/icon.png",
        imgBackgroundColor: "rgb(17, 34, 17)",
        backgroundColor: "#262626"
    }, {
        title: "SchoolApp",
        description: "SchoolApp foi um projeto mobile que eu fiz durante alguns meses",
        imgUrl: "../../assets/SchoolAppIcon.png",
        imgBackgroundColor: "#00ffff",
        backgroundColor: "#262626"
    },
];






for (let myCard of cards) {
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardImg = document.createElement('img');
    var cardTitle = document.createElement('h5');
    var cardText = document.createElement('p');
    var cardButton = document.createElement('a');
    var spacer = document.createElement('div');
    cardTitle.textContent = myCard.title;
    cardText.textContent = myCard.description;
    cardImg.src = myCard.imgUrl;
    cardButton.innerText = "Veja Mais";

    card.classList.add('card');
    card.style = `width: 17rem; background-color: ${myCard.backgroundColor}; color: white; margin: 5px`;
    spacer.style = "flex: 1;";
    cardImg.classList.add('card-img-top');
    cardImg.style = `background-color: ${myCard.imgBackgroundColor}; height: 200px; object-fit: cover;`;
    cardTitle.style = "margin-top:8px";

    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center'); // Added classes for flex layout
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    cardText.classList.add('text-center');
    cardButton.classList.add('btn', 'btn-primary');

    cardButton.addEventListener('click', function () {
        // Pass data to the new HTML file
        var titleParam = encodeURIComponent(myCard.title);
        var descriptionParam = encodeURIComponent(myCard.description);
        var imgUrlParam = encodeURIComponent(myCard.imgUrl);

        // Construct the URL with the parameters
        var url = 'newpage.html?title=' + titleParam + '&description=' + descriptionParam + '&imgUrl=' + imgUrlParam;

        // Navigate to the new HTML file
        window.location.href = url;
    });
    cardBody.appendChild(cardImg);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(spacer);

    cardBody.appendChild(cardButton);

    card.appendChild(cardBody);
    document.getElementById("myDiv").appendChild(card);
}
