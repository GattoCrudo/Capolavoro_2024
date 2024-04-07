function randomInt(min, max) {
    return (Math.floor(Math.random() * 10000000 ) % max) + min
}

const scelta_btn = document.getElementById("scelta-btn");
const persone_div = document.getElementById("persone-div");
const domande_div = document.getElementById("domande-div");
const risposta_div = document.getElementById("risposta-div");

class Domanda {
    constructor(testo, proprieta, categoria, catDaEliminareSI, catDaEliminareNO) {
        this.testo = testo;
        this.proprieta = proprieta;
        this.categoria = categoria;
        this.catDaEliminareSI = catDaEliminareSI;
        this.catDaEliminareNO = catDaEliminareNO;
    }
}

const domandeOriginali = [
    new Domanda("È un'artista?", "Artista", "professione", "professione"),
    new Domanda("È un matematico?", "Matematico", "professione", "professione"),
    new Domanda("È un ingegnere?", "Ingegnere", "professione", "professione"),
    new Domanda("È uno/a scienziato/a?", "Scienziato", "professione", "professione"),
    new Domanda("ha la barba?", "barba", "peli"),
    new Domanda("ha i baffi?", "baffi", "peli"),
    new Domanda("ha il pizzetto?", "pizzetto", "peli"),
    new Domanda("È una donna?", "F", "sesso"),
    new Domanda("È italiano/a?", "Italia", "nazionalità", "nazionalità"),
    new Domanda("È francese?", "Francia", "nazionalità", "nazionalità"),
    new Domanda("È tedesco?", "Germania", "nazionalità", "nazionalità"),
    new Domanda("Ha vinto un premio Nobel?", "Nobel", "nobel"),
    // new Domanda("È nato/a dopo il 1800?", "dopo1800", "nascita", "nascita"),
    // new Domanda("È nato/a dopo il 1700?", "dopo1700", "nascita", "", "nascita"),
]

let proprietà = {}

domandeOriginali.forEach(domanda => {
    proprietà[domanda.categoria] = undefined;
});

let domande = domandeOriginali.slice(0);

// classe per persone
class Persona {
    constructor(nome, nascita, nobel, professione = String(), peli = String(), sesso = String(), nazionalità = String()){
        this.nome = nome;
        this.nascita = nascita;
        this.nobel = nobel; 
        this.professione = professione;
        this.nazionalità = nazionalità;
        this.peli = peli;
        this.sesso = sesso;
    }
}

// array di persone
const Originali = [
    new Persona("Fibonacci", 1170, "", "Matematico", "", "M", "Italia"),
    new Persona("Cartesio", 1596, "", "Matematico", "barba, baffi", "M", "Francia"),
    new Persona("Eulero", 1707, "", "Matematico", "", "M", "Francia"),
    new Persona("Carl Gauss", 1777, "", "Matematico", "", "M", "Germania"),
    new Persona("Galileo Galilei", 1564, "", "Scienziato, Ingegnere", "barba, baffi", "M", "Italia"),
    new Persona("Isaac Newton", 1642, "", "Scienziato", "", "M", "Inghilterra"),
    new Persona("Nikola Tesla", 1856, "", "Scienziato, Ingegnere", "baffi", "M", "Croazia"),
    new Persona("Marie Curie", 1867, "Nobel", "Scienziato", "", "F", "Polonia"),
    new Persona("Albert Einstein", 1879, "Nobel", "Scienziato", "baffi", "M", "Germania"),
    new Persona("Enrico Fermi", 1901, "Nobel", "Scienziato", "", "M", "Italia"),
    new Persona("James Watt", 1736, "", "Ingegnere", "", "M", "Inghilterra"),
    new Persona("Alexander Graham Bell", 1847, "", "Ingegnere", "barba, baffi", "M", "Inghilterra"),
    new Persona("Thomas Edison", 1847, "", "Ingegnere", "", "M", "USA"),
    new Persona("Guglielmo Marconi", 1874, "", "Ingegnere", "", "M", "Italia"),
    new Persona("Leonardo Da Vinci", 1452, "", "Scienziato, Ingegnere, Artista", "barba, baffi", "M", "Italia"),
    new Persona("Michelangelo Buonarroti", 1475, "", "Artista, Scultore", "barba, baffi", "M", "Italia"),
    new Persona("Caravaggio", 1571, "", "Artista", "barba, baffi, pizzetto", "M", "Italia"),
    new Persona("Vincent Van Gogh", 1853, "", "Artista", "barba, baffi", "M", "Paesi Bassi"),
    new Persona("Pablo Picasso", 1888, "", "Artista", "", "M", "Spagna"),
    new Persona("Frida Kahlo", 1907, "", "Artista", "", "F", "Messico"),
]

let persone = Originali.slice(0);

function creaPersona(persona = new Persona) {
    const persona_div = document.createElement("div");
    persona_div.className = "persona";

    const persona_nome = document.createElement("h3");
    persona_nome.innerHTML = persona.nome + " <br> (" + persona.nascita + ") <br> " +persona.nazionalità + " <br> " + persona.professione;

    const persona_img_div = document.createElement("div");
    persona_img_div.id = persona.nome + "_img_div";
    persona_img_div.className = "img_div";

    const persona_img = document.createElement("img");
    persona_img.setAttribute("src", "img/"+persona.nome+".jpg");
    persona_img.setAttribute("alt", persona.nome+" img");
    persona_img.className = "persona-img";

    persone_div.appendChild(persona_div);
    persona_div.appendChild(persona_nome);
    persona_div.appendChild(persona_img_div);
    persona_img_div.appendChild(persona_img);
}

Originali.forEach(person => {
    creaPersona(person);
});

function prossimaDomanda(domanda = new Domanda, daEliminare) {
    if (persone.length == 1) {
        mostraRisultato(persone[0]);
    }
    else if(persone.length == 0) {
        risposta_div.innerText = "Personaggio non trovato";
    }
    else
    {
        domande.splice(domande.indexOf(domanda), 1);

        domande.forEach(domand => {
            if (domand.categoria == daEliminare) {
                domande.splice(domande.indexOf(domand), 1);
            }
        });

        let prossima = new Domanda();
        let aventi;
        
        do {
            prossima = domande[randomInt(0, domande.length)];
            console.log('prossima :>> ', prossima);
            // console.log('prossima :>> ', prossima);
            aventi = 0;

            if(prossima == undefined) {
                let personaTentativo = persone[randomInt(0, persone.length)];
                proprietà[personaTentativo.nome] = undefined;
                domande.push(new Domanda("Si chiama "+ personaTentativo.nome+"?", personaTentativo.nome, "nome"));
                creaDomanda(domande[0]);
                break;
            }
            else {

                persone.forEach(person => {
                    if (person[prossima.categoria].includes(prossima.proprieta)) 
                        aventi++;
                })
                
                if (aventi > 0 && aventi < persone.length) {
                    creaDomanda(prossima);
                }
                else {
                    domande.splice(domande.indexOf(prossima), 1);
                }
            }
        } while (aventi == 0 || aventi == persone.length);
    }
}

function calcolaTentativo() {
    for (let i = 0; i < persone.length; ) {
        let person = persone[i];
        let daEliminare = false;
        
        domande.forEach(domanda => {
            if (proprietà[domanda.proprieta] == !person[domanda.categoria].includes(domanda.proprieta))
                daEliminare = true;
        });
        
        if (daEliminare){
            persone.splice(i, 1);
            const person_img_div = document.getElementById(person.nome + "_img_div");
            const x_img = document.createElement("img");
            x_img.className = "x_img";
            x_img.setAttribute("src", "img/X.png");
            
            person_img_div.appendChild(x_img);
        }
        else
            i++;
    }
}

function mostraRisultato(risposta = new Persona) {
    let risposta_img_div = document.getElementById(risposta.nome+"_img_div");
    risposta_img_div.style.borderStyle = "solid";
    risposta_img_div.style.borderColor = "red";
	
	const persona_div = document.createElement("div");
    persona_div.className = "persona";

    const persona_nome = document.createElement("h3");
    persona_nome.innerHTML = risposta.nome + " <br> (" + risposta.nascita + ")";

    const persona_img_div = document.createElement("div");
    persona_img_div.id = risposta.nome + "_img_div";
    persona_img_div.className = "img_div";

    const persona_img = document.createElement("img");
    persona_img.setAttribute("src", "img/"+risposta.nome+".jpg");
    persona_img.setAttribute("alt", risposta.nome+" img");
    persona_img.className = "persona-img";
	
	risposta_div.appendChild(persona_div);
    persona_div.appendChild(persona_nome);
    persona_div.appendChild(persona_img_div);
    persona_img_div.appendChild(persona_img);
}

// crea la div della domanda con testo e tasti
function creaDomanda(domanda = new Domanda) {
    let domanda_div = document.createElement("div"); 
    domanda_div.className = "domanda";
    let domanda_btn_div = document.createElement("div");
    domanda_btn_div.className = "btn-div";

    let domanda_text = document.createTextNode(domanda.testo);
    
    let yes_btn = document.createElement("button");
    yes_btn.className = "risposta-btn"
    yes_btn.innerText = "SI";
    let no_btn = document.createElement("button");
    no_btn.className = "risposta-btn"
    no_btn.innerText = "NO";

    yes_btn.onclick = function() {
        if (proprietà[domanda.proprieta] == undefined) {
            proprietà[domanda.proprieta] = true;

            yes_btn.className += " activated";
            calcolaTentativo();
            prossimaDomanda(domanda, domanda.catDaEliminareSI);
        }
    };
    no_btn.onclick = function() {
        if (proprietà[domanda.proprieta] == undefined) {
            proprietà[domanda.proprieta] = false;
            
            no_btn.className += " activated";
            calcolaTentativo();
            prossimaDomanda(domanda, domanda.catDaEliminareNO);
        }
    };

    domande_div.appendChild(domanda_div);

    domanda_div.appendChild(domanda_text);
    
    domanda_div.appendChild(domanda_btn_div);
    domanda_btn_div.appendChild(yes_btn);
    domanda_btn_div.appendChild(no_btn);
}

function ricarica() {
    const persona_x_img_divs = document.querySelectorAll(".x_img");
    persona_x_img_divs.forEach(img_div => {
        img_div.remove();
    });

    const btns = document.querySelectorAll("button");
    btns.forEach(btn => {
        btn.className = "";
    });

    persone = Originali.slice(0);
    domande = domandeOriginali.slice(0);

    risposta_div.innerText = "";
    for (const x in proprietà) {
        proprietà[x] = undefined;
    }

    const domande_divs = document.querySelectorAll(".domanda")
    domande_divs.forEach(domanda => {
        domanda.remove();
    });

    creaDomanda(domande[randomInt(0, domande.length)]);

    const persona_img_divs = document.querySelectorAll(".img_div")
    persona_img_divs.forEach(img_div => {
        img_div.style.borderStyle = "none";
    });
    
}

// tasto "Scelto!" rimuove se stesso e lista personaggi e crea prima domanda
function scelto() {
    scelta_btn.remove();
    document.querySelector(".desc").remove();

    creaDomanda(domande[randomInt(0, domande.length)]);
    
    let reload_btn = document.createElement("button");
    reload_btn.id = "reload-btn"
    reload_btn.innerText = "Ricarica";
    reload_btn.onclick = function(){ricarica()};
    document.querySelector("#reload-div").appendChild(reload_btn);
}