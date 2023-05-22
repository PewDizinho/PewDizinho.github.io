const cards = [
    {
        title: "Pew's Cavern",
        description: "Uma loja que usei como mediadora para meu trabalho de freelancer",
        imgUrl: "../../assets/PewsCavernIcon.png",
        imgBackgroundColor: "#ffff80",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Pew's Cavern foi fundada em 2019, sendo o lugar onde eu realizava vendas diversas, foi um lugar muito importante para o meu desenvolvimento como programador e profissional",
            link: "https://discord.gg/tvdDHwC"
        }
    },
    {
        title: "Produtos do Futuro",
        description: "O Produtos do Futuro é o Projeto Integrador da faculdade, obrigatório para a conclusão do ensino superior",
        imgUrl: "https://raw.githubusercontent.com/PewDizinho/PI1/main/assets/icon.png",
        imgBackgroundColor: "rgb(17, 34, 17)",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Liderei o \"Grupo 1\" para a realização desse site, que até a data de hoje, continua algo WIP,",
            link: "https://PewDizinho.github.io/PI1"
        }
    }, {
        title: "SchoolApp",
        description: "SchoolApp foi um projeto mobile que eu fiz durante alguns meses",
        imgUrl: "../../assets/SchoolAppIcon.png",
        imgBackgroundColor: "#00ffff",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Um aplicativo que ajudaria estudantes a se organizar com datas e notas de uma maneira simplificada",
            link: "https://youtu.be/SBDACF9arCw"
        }
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
    cardButton.classList.add('btn', 'btn-outline-primary');

    cardButton.addEventListener('click', function () {




        var url = 'http://PewDizinho.github.io/pages/myjobs/jobInfo.html?title='
            + encodeURIComponent(myCard.title)
            + '&description='
            + encodeURIComponent(myCard.description)
            + '&imgUrl='
            + encodeURIComponent(myCard.imgUrl)
            + '&longerDescription='
            + encodeURIComponent(myCard.site.longerDescription)
            + '&url='
            + encodeURIComponent(myCard.site.link);

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
