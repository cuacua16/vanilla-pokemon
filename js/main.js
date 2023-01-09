import {Pokemon} from "./Pokemon.class.js";

(function vanillaPokemon() {
  const imagenes = document.querySelectorAll(".imgpokemon");
  const pokemon = document.querySelectorAll(".pokemon");
  const btnattack = document.querySelectorAll(".btn-attack");
  const barra = document.querySelectorAll(".barra");
  const h4s = document.querySelectorAll(".h4");
  const h5s = document.querySelectorAll(".h5");
  const pociones = document.querySelectorAll(".fa-solid");
  const danios = document.querySelectorAll(".danio");
  const danio2 = document.querySelector(".danio2");

  const batalla = (equipo, enemigo) => {
    let hpTemp;
    let pokemonActivo;
    const promesa = new Promise((res, rej) => {
      for (let i = 0; i < equipo.length; i++) {
        barra[i].style.width = `${equipo[i].hp}%`;
        h4s[i].textContent = `${equipo[i].hp}`;
        h5s[i].innerHTML = `<i>${equipo[i].nombre}</i>`;
        pociones[i].addEventListener("click", () => {
          equipo[i].hp = 100;
          barra[i].style.width = `${equipo[i].hp}%`;
          h4s[i].textContent = `${equipo[i].hp}`;
          pociones[i].style.display = "none";
          imagenes[i].classList.add("curado");
        });
        pokemon[i].style.opacity = 0.5;
      }
      for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener("click", (e) => {
          for (const pok of equipo) {
            if (e.target.attributes[0].nodeValue == pok.image) {
              if (pokemonActivo != pok) {
                for (let j = 0; j < imagenes.length; j++) {
                  btnattack[j].setAttribute("disabled", true);
                }
                pokemonActivo = pok;
                btnattack[i].removeAttribute("disabled", true);
                for (let k = 0; k < imagenes.length; k++) {
                  pokemon[k].style.opacity = 0.5;
                }
                pokemon[i].style.opacity = 1;
                btnattack[i].style.opacity = 1;

                if (Math.round(Math.random())) {
                  for (let m = 0; m < imagenes.length; m++) {
                    imagenes[m].style.pointerEvents = "none";
                  }
                  relato.innerHTML = "";
                  btnattack[i].setAttribute("disabled", true);
                  pokemon[i].style.opacity = 0.5;
                  setTimeout(() => {
                    for (let m = 0; m < imagenes.length; m++) {
                      imagenes[m].style.pointerEvents = "auto";
                    }
                    if (pokemonActivo && enemigo.hp > 0) {
                      hpTemp = pokemonActivo.hp;
                      relato.innerHTML = enemigo.ataque(pokemonActivo);
                      imgpokemonenemy1.classList.add("atacante2");
                      if (pokemonActivo.hp > 0) {
                        btnattack[i].removeAttribute("disabled");
                        btnattack[i].style.opacity = 1;
                        barra[i].style.width = `${pokemonActivo.hp}%`;
                        h4s[i].textContent = pokemonActivo.hp;
                        danios[i].textContent = `${hpTemp - pokemonActivo.hp}`;
                        imagenes[i].classList.add("atacado");
                        danios[i].classList.add("dañoRecibido");
                      } else {
                        relato.innerHTML += `<br><b>${pokemonActivo.nombre} ha muerto!</b>`;
                        pokemon[i].style.display = "none";
                        let resto = equipo.filter((e) => e.hp > 0);
                        if (resto.length < 1) {
                          rej("GAME OVER");
                        }
                      }

                      btnattack[i].removeAttribute("disabled");
                      pokemon[i].style.opacity = 1;
                    }
                  }, 500);
                }
                imagenes[i].classList.remove("atacado");
                imgpokemonenemy1.classList.remove("atacado");
                danios[i].classList.remove("dañoRecibido");
                danio2.classList.remove("dañoRecibido");
                imagenes[i].classList.remove("atacante");
                imgpokemonenemy1.classList.remove("atacante2");
                imagenes[i].classList.remove("curado");
              }
            }
          }
        });
      }

      for (let i = 0; i < btnattack.length; i++) {
        btnattack[i].addEventListener("click", () => {
          if (equipo.length && enemigo.hp > 0) {
            hpTemp = enemigo.hp;
            relato.innerHTML = pokemonActivo.ataque(enemigo);
            danio2.textContent = `${hpTemp - enemigo.hp}`;
            imgpokemonenemy1.classList.add("atacado");
            danio2.classList.add("dañoRecibido");
            imagenes[i].classList.add("atacante");

            if (enemigo.hp > 0) {
              barraenemy1.style.width = `${enemigo.hp}%`;
              h4e1.textContent = enemigo.hp;
            } else {
              barraenemy1.style.width = `0%`;
              h4e1.textContent = 0;
              relato.innerHTML += `<br><b>${enemigo.nombre} ha muerto!</b>`;
              if (enemigo.hp < 1) {
                enemy.style.display = "none";
              }
              pokemonActivo = undefined;
              imgpokemonenemy1.classList.remove("atacado");
              danio2.classList.remove("dañoRecibido");
              res(equipo);
            }
          }
          btnattack[i].setAttribute("disabled", "true");
          for (let m = 0; m < imagenes.length; m++) {
            imagenes[m].style.pointerEvents = "none";
          }
          setTimeout(() => {
            for (let m = 0; m < imagenes.length; m++) {
              imagenes[m].style.pointerEvents = "auto";
            }
            if (enemigo.hp > 0) {
              imgpokemonenemy1.classList.remove("atacado");
              danio2.classList.remove("dañoRecibido");
              imagenes[i].classList.remove("atacante");
              hpTemp = pokemonActivo.hp;
              relato.innerHTML += "<br><br>" + enemigo.ataque(pokemonActivo);
              imgpokemonenemy1.classList.add("atacante2");
              danios[i].textContent = `${hpTemp - pokemonActivo.hp}`;
              if (pokemonActivo.hp > 0) {
                btnattack[i].removeAttribute("disabled");
                btnattack[i].style.opacity = 1;
                barra[i].style.width = `${pokemonActivo.hp}%`;
                h4s[i].textContent = pokemonActivo.hp;
                imagenes[i].classList.add("atacado");
                danios[i].classList.add("dañoRecibido");
              } else {
                relato.innerHTML += `<br><b>${pokemonActivo.nombre} ha muerto!</b>`;
                pokemon[i].style.display = "none";
                let resto = equipo.filter((e) => e.hp > 0);
                if (resto.length < 1) {
                  rej("GAME OVER");
                }
              }
            }
          }, 1000);
          imagenes[i].classList.remove("atacado");
          danios[i].classList.remove("dañoRecibido");
          imgpokemonenemy1.classList.remove("atacante2");
          imagenes[i].classList.remove("curado");
        });
      }
    });
    return promesa;
  };

  const chikorita = new Pokemon(
    "Chikorita",
    "hierba",
    "assets/images/chikorita.png"
  );
  const charizard = new Pokemon(
    "Charizard",
    "fuego",
    "assets/images/charizard.png"
  );
  const bulbasaur = new Pokemon(
    "Bulbasaur",
    "hierba",
    "assets/images/bulbasaur.png"
  );
  const squirtle = new Pokemon(
    "Squirtle",
    "agua",
    "assets/images/squirtle.png"
  );
  const butterfree = new Pokemon(
    "Butterfree",
    "volador",
    "assets/images/butterfree.png"
  );
  const pidgeotto = new Pokemon(
    "Pidgeotto",
    "volador",
    "assets/images/pidgeotto.png"
  );
  const rattata = new Pokemon("Ratatta", "normal", "assets/images/rattata.png");
  const pikachu = new Pokemon(
    "Pikachu",
    "electrico",
    "assets/images/pikachu.png"
  );
  const vulpix = new Pokemon("Vulpix", "fuego", "assets/images/vulpix.png");
  const jigglypuff = new Pokemon(
    "Jigglypuff",
    "normal",
    "assets/images/jigglypuff.png"
  );
  const zubat = new Pokemon("Zubat", "veneno", "assets/images/zubat.png");
  const meowth = new Pokemon("Meowth", "normal", "assets/images/meowth.png");
  const psyduck = new Pokemon("Psyduck", "agua", "assets/images/psyduck.png");
  const alakazam = new Pokemon(
    "Alakazam",
    "psiquico",
    "assets/images/alakazam.png"
  );
  const machop = new Pokemon("Machop", "lucha", "assets/images/machop.png");
  const geodude = new Pokemon("Geodude", "roca", "assets/images/geodude.png");
  const ponyta = new Pokemon("Ponyta", "fuego", "assets/images/ponyta.png");
  const gengar = new Pokemon("Gengar", "veneno", "assets/images/gengar.png");
  const onix = new Pokemon("Onix", "roca", "assets/images/onix.png");
  const hypno = new Pokemon("Hypno", "psiquico", "assets/images/hypno.png");
  const electrode = new Pokemon(
    "Electrode",
    "electrico",
    "assets/images/electrode.png"
  );
  const marowak = new Pokemon("Marowak", "tierra", "assets/images/marowak.png");
  const hitmonchan = new Pokemon(
    "Hitmonchan",
    "lucha",
    "assets/images/hitmonchan.png"
  );
  const starmie = new Pokemon("Starmie", "agua", "assets/images/starmie.png");
  const scyther = new Pokemon(
    "Scyther",
    "volador",
    "assets/images/scyther.png"
  );
  const electabuzz = new Pokemon(
    "Electabuzz",
    "electrico",
    "assets/images/electabuzz.png"
  );
  const gyarados = new Pokemon(
    "Gyarados",
    "agua",
    "assets/images/gyarados.png"
  );
  const lapras = new Pokemon("Lapras", "agua", "assets/images/lapras.png");
  const aerodactyl = new Pokemon(
    "Aerodactyl",
    "volador",
    "assets/images/aerodactyl.png"
  );
  const snorlax = new Pokemon("Snorlax", "normal", "assets/images/snorlax.png");
  const articuno = new Pokemon(
    "Articuno",
    "agua",
    "assets/images/articuno.png"
  );
  const zapdos = new Pokemon("Zapdos", "electrico", "assets/images/zapdos.png");
  const moltres = new Pokemon("Moltres", "fuego", "assets/images/moltres.png");
  const dragonite = new Pokemon(
    "Dragonite",
    "volador",
    "assets/images/dragonyte.png"
  );
  const mewtwo = new Pokemon("Mewtwo", "psiquico", "assets/images/mewtwo.png");
  const mew = new Pokemon("Mew", "psiquico", "assets/images/mew.png");
  const scizor = new Pokemon("Scizor", "volador", "assets/images/scizor.png");
  const raikou = new Pokemon("Raikou", "electrico", "assets/images/raikou.png");
  const entei = new Pokemon("Entei", "fuego", "assets/images/entei.png");
  const suicune = new Pokemon("Suicune", "agua", "assets/images/suicune.png");
  const tyranitar = new Pokemon(
    "Tyranitar",
    "roca",
    "assets/images/tyranitar.png"
  );
  const lugia = new Pokemon("Lugia", "psiquico", "assets/images/lugia.png");
  const hooh = new Pokemon("Ho-Oh", "fuego", "assets/images/ho-oh.png");

  const pokemones = [
    chikorita,
    charizard,
    bulbasaur,
    squirtle,
    pidgeotto,
    pikachu,
    vulpix,
    jigglypuff,
    meowth,
    psyduck,
    machop,
    ponyta,
    starmie,
    lapras,
  ];

  const avanzados = [scyther, gyarados, onix, snorlax, dragonite, scizor];

  const salvajes = [
    butterfree,
    rattata,
    zubat,
    geodude,
    alakazam,
    gengar,
    onix,
    hypno,
    electrode,
    marowak,
    hitmonchan,
    scyther,
    gyarados,
    aerodactyl,
    snorlax,
    dragonite,
    mewtwo,
    mew,
    scizor,
    tyranitar,
  ];

  const legendarios = [
    articuno,
    zapdos,
    moltres,
    raikou,
    entei,
    suicune,
    lugia,
    hooh,
  ];

  const select1 = document.getElementById("select1");
  const select2 = document.getElementById("select2");
  const select3 = document.getElementById("select3");
  const selects = [select1, select2, select3];

  for (const select of selects) {
    const fragment = document.createDocumentFragment();
    const image = document.createElement("IMG");
    const data = document.createElement("P");
    data.classList.add("data");
    const tipo = document.createElement("SPAN");
    data.append(tipo);
    for (const pokemon of pokemones) {
      const option = document.createElement("OPTION");
      option.textContent = pokemon.nombre;
      option.value = pokemon.nombre;
      option.classList.add("option");
      fragment.append(option);
    }
    select.append(fragment);
    select.selectedIndex = -1;
    select.addEventListener("change", () => {
      for (const pokemon of pokemones) {
        if (select.value == pokemon.nombre) {
          image.src = pokemon.image;

          tipo.textContent = `Tipo: ${pokemon.tipo}`;

          select.after(data);
        }
      }
      image.classList.add("image");
      select.after(image);
    });
  }

  let equipo = [];
  const btnReady = document.getElementById("btn-ready");
  btnReady.addEventListener("click", () => {
    if (
      selects[0].value == "" ||
      selects[1].value == "" ||
      selects[2].value == ""
    ) {
      alert("elegime 3 pokemones porfi, que se me buguea el jueguito :D");
      return false;
    }
    if (
      selects[0].value == selects[1].value ||
      selects[1].value == selects[2].value ||
      selects[2].value == selects[0].value
    ) {
      alert("eeee no vale repetirlos");
      return false;
    }

    for (const select of selects) {
      for (const pokemon of pokemones) {
        if (select.value == pokemon.nombre) {
          equipo.push(pokemon);
        }
      }
    }

    container1.style.display = "none";
    container2.style.display = "block";
    imgpokemon1.src = equipo[0].image;
    imgpokemon1.setAttribute("title", `Tipo ${equipo[0].tipo}`);
    h41.textContent = `${equipo[0].hp}`;
    imgpokemon2.src = equipo[1].image;
    imgpokemon2.setAttribute("title", `Tipo ${equipo[1].tipo}`);
    h42.textContent = `${equipo[1].hp}`;
    imgpokemon3.src = equipo[2].image;
    imgpokemon3.setAttribute("title", `Tipo ${equipo[2].tipo}`);
    h43.textContent = `${equipo[2].hp}`;
    nextLevel(nivel, contadorEnemigo);
  });

  let nivel = 1;
  let contadorEnemigo = 0;

  function nextLevel() {
    h3.textContent = `Nivel ${nivel}`;
    if (nivel > 1) {
      btnReady2.style.display = "none";
    }
    enemy.style.display = "flex";
    for (const cokemon of equipo) {
      for (let i = 0; i < 25; i++) {
        if (cokemon.hp < 100 && cokemon.hp > 0) {
          cokemon.hp++;
        }
      }
    }
    const enemigo = salvajes[Math.round(Math.random()) + contadorEnemigo];
    imgpokemonenemy1.src = enemigo.image;
    imgpokemonenemy1.setAttribute("title", `Tipo ${enemigo.tipo}`);
    h4e1.textContent = `${enemigo.hp}`;
    h5e1.innerHTML = `<i>${enemigo.nombre}</i>`;
    barraenemy1.style.width = `${enemigo.hp}%`;
    pokemonenemy1.style.opacity = 1;

    nivel++;
    batalla(equipo, enemigo)
      .then((eq) => {
        equipo = eq;
        contadorEnemigo += 2;
        btnReady2.style.display = "block";
      })
      .catch((e) => {
        console.log(e);
        gameOver();
      });
  }

  btnReady2.addEventListener("click", () => {
    if (nivel == 10) {
      nivel10();
    } else {
      nextLevel();
    }
  });

  const nivel10 = () => {
    h3.textContent = "Nivel FINAL";
    btnReady2.style.display = "none";
    enemy.style.display = "flex";
    for (const cokemon of equipo) {
      for (let i = 0; i < 25; i++) {
        if (cokemon.hp < 100 && cokemon.hp > 0) {
          cokemon.hp++;
        }
      }
    }
    const enemigo = legendarios[Math.floor(Math.random() * 8)];
    imgpokemonenemy1.src = enemigo.image;
    imgpokemonenemy1.setAttribute("title", `Tipo ${enemigo.tipo}`);
    h4e1.textContent = `${enemigo.hp}`;
    h5e1.innerHTML = `<i>${enemigo.nombre}</i>`;
    barraenemy1.style.width = `${enemigo.hp}%`;
    pokemonenemy1.style.opacity = 1;

    batalla(equipo, enemigo)
      .then(() => {
        win();
      })
      .catch((e) => {
        console.log(e);
        gameOver();
      });
  };

  const win = () => {
    const gifs = ["assets/images/win.gif ", "assets/images/win2.gif"];
    container2.style.display = "none";
    container3.style.display = "block";
    container3.style.backgroundColor = "#1a3c7d";
    finalTitle.textContent = "¡¡¡GANASTEEE!!!";
    finalImage.src = gifs[Math.round(Math.random())];
    btnReset.style.display = "block";
    btnReset.addEventListener("click", () => {
      location.reload();
    });
  };
  const gameOver = () => {
    const gifs = ["assets/images/gameover.gif", "assets/images/gameover2.gif"];
    container2.style.display = "none";
    container3.style.display = "block";
    finalImage.src = gifs[Math.round(Math.random())];
    btnReset.style.display = "block";
    btnReset.addEventListener("click", () => {
      location.reload();
    });
  };
})();
