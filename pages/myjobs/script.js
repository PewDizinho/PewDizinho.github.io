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
            longerDescription: "Liderei o \"Grupo 1\" para a realização desse site, que até a data de hoje, continua algo WIP",
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
    {
        title: "Pixel Bot",
        description: "A Pixel foi um projeto que utilizei NodeJs junto com a API do DiscordJs para criar um bot para realizar vendas",
        imgUrl: "../../assets/PixelIcon.png",
        imgBackgroundColor: "#0059b3",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Um bot de discord que vendedores poderiam se aplicar como vendedores e realizar anúncios de seus serviços relacionados a minecraft, o bot também utilizava um sistema integrado ao MercadoPago para realização de transações e verificação de pagamento via Pix",
            link: "https://www.youtube.com/watch?v=LgA7vtoYWZE&list=PLqA3MEVjb0lUd-WYDKAIVymnB2vJjsNhJ"
        }
    },
    {
        title: "Script de Status",
        description: "Um sistema de atributos via script para minecraft na versão 1.12.2, recriando sistemas de força e vida do jogo",
        imgUrl: "../../assets/OldPewsCavern.png",
        imgBackgroundColor: "#0059b3",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Esse script foi uma tentativa de recriação do sistema de atributos do mod \"Dragon Block C\", utilizando a até então nova função de Custom GUIs do CustomNPC, por motivos de limtações de salvamento de data pela API, o projeto não foi concluído",
            link: "https://www.youtube.com/watch?v=Ozy7Qz7N7eE&list=PLqA3MEVjb0lVxMvrbmXtQebX20L8bEJ0V"
        }
    },
    {
        title: "Scripts CustomNPC 1.7.10",
        description: "Uma coletânea dos meus códigos da versão mais antiga do minecraft, sendo meus primeiros projetos de programação",
        imgUrl: "../../assets/OldPewsCavern.png",
        imgBackgroundColor: "#0059b3",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Scripts feitos na 1.7.10, usando a versão padrão do Custom NPC",
            link: "https://www.youtube.com/watch?v=Bpa06AVjaSE&list=PLqA3MEVjb0lUupLdDz8r2Hr2t2DP-oCTD"
        }
    },
    {
        title: "Scripts CustomNPC 1.12.2",
        description: "Códigos realizados na versão mais atual do CustomNPC, 1.12.2",
        imgUrl: "../../assets/OldPewsCavern.png",
        imgBackgroundColor: "#0059b3",
        backgroundColor: "#262626",
        site: {
            longerDescription: "Scripts feitos na 1.12.2, algumas coisas mais complexas",
            link: "https://www.youtube.com/watch?v=sS-QgfqRD4w&list=PLqA3MEVjb0lVqSyTTikJuh5lGLbgNMaED&index=4"
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
    cardTitle.classList.add('text-center');

    cardText.classList.add('card-text');
    cardText.classList.add('text-center');
    cardButton.classList.add('btn', 'btn-outline-primary');

    cardButton.addEventListener('click', function () {
        window.location.href = 'http://PewDizinho.github.io/pages/myjobs/jobInfo.html?title='
            + encodeURIComponent(myCard.title)
            + '&description='
            + encodeURIComponent(myCard.description)
            + '&imgUrl='
            + encodeURIComponent(myCard.imgUrl)
            + '&longerDescription='
            + encodeURIComponent(myCard.site.longerDescription)
            + '&url='
            + encodeURIComponent(myCard.site.link);
    });
    cardBody.appendChild(cardImg);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(spacer);

    cardBody.appendChild(cardButton);

    card.appendChild(cardBody);
    document.getElementById("myDiv").appendChild(card);
}
