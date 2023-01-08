class Pokemon {
  constructor(nombre, tipo, image, hp = 100) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.hp = hp;
    this.image = image;
  }

  ataque(enemigo) {
    let daño = 4 + Math.round(Math.random() * 18);
    let critico;
    if (Math.random() * 20 >= 17 && daño > 18) {
      critico = true;
      daño += 18;
      if (this.tipo == "agua") {
        if (enemigo.tipo == "fuego" || enemigo.tipo == "roca") {
          daño += 5;
        }
      }
      if (this.tipo == "fuego") {
        if (enemigo.tipo == "hierba") {
          daño += 5;
        }
      }
      if ((this.tipo = "electrico")) {
        if (enemigo.tipo == "agua" || enemigo.tipo == "volador") {
          daño += 5;
        }
      }
      if ((this.tipo = "hierba")) {
        if (enemigo.tipo == "agua" || enemigo.tipo == "electrico") {
          daño += 5;
        }
      }
      if ((this.tipo = "psiquico")) {
        if (enemigo.tipo == "lucha" || enemigo.tipo == "volador") {
          daño += 5;
        }
      }
      if ((this.tipo = "roca")) {
        if (enemigo.tipo == "hierba" || enemigo.tipo == "fuego") {
          daño += 5;
        }
      }
      if ((this.tipo = "volador")) {
        if (enemigo.tipo == "lucha" || enemigo.tipo == "hierba") {
          daño += 5;
        }
      }
    }
    enemigo.hp -= daño;
    if (critico) {
      return `<b>¡Golpe Crítico!</b> q culo.. ${this.nombre} hizo un daño de <b>${daño}</b> con su ataque de tipo ${this.tipo} a ${enemigo.nombre}!`;
    } else {
      return `${this.nombre} hizo un daño de <b>${daño}</b> con su ataque de tipo ${this.tipo} a ${enemigo.nombre}!`;
    }
  }
}

export {Pokemon};
