const $form = document.querySelector("#form_search");
const $moneda = document.querySelector("#moneda");
const $criptos = document.querySelector("#criptomonedas");
const $containerForm = document.querySelector(".cotizador__form");
let containerAnswer = document.querySelector("#cripto__respuesta");
const $objSearch = { moneda: "", criptomonedas: "" };

let urlData =
  "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

document.addEventListener("DOMContentLoaded", () => {
  dataCripto();

  $form.addEventListener("submit", btnForm);
  $moneda.addEventListener("change", getValue);
  $criptos.addEventListener("change", getValue);
});

function btnForm(e) {
  e.preventDefault();
  const { moneda, criptomonedas } = $objSearch;

  if (moneda === "" || criptomonedas === "") {
    mostrarError("Selecciones la informacion para realizar la corizacion...");
    return;
  }
  consultarAPI(moneda, criptomonedas);
  //console.log(moneda);
  //console.log(criptomonedas);
}

function consultarAPI(moneda, criptomonedas) {
  let urlSymbol = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${moneda}`;

  fetch(urlSymbol)
    .then((res) => res.json())
    .then((resJSON) => {
      mostrarCotizacion(resJSON.DISPLAY[criptomonedas][moneda]);
      //console.log(resJSON.DISPLAY[criptomonedas][moneda]);
    })
    .catch(err => console.log(err));
}

function mostrarCotizacion(data){
  clearHTML();
  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = data;
  const answer = document.createElement('div');
  answer.classList.add('display-info');
  const textnode = document.createTextNode('hola')
  answer.innerHTML = `
  <p class="main-price">Precio: <span>${PRICE}</span></p>
  <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
  <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
  <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
  <p>Última Actualización: <span>${LASTUPDATE}</span></p>
  `;
  textnode.appendChild(containerAnswer, containerAnswer.childNodes[0]);
  answer.appendChild(textnode);
  console.log(answer);
}

function mostrarError(message) {
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = message;
  $containerForm.appendChild(error);

  setTimeout(() => error.remove(), 3000);
}

function getValue(e) {
  $objSearch[e.target.name] = e.target.value;
  //console.log($objSearch);
}

function dataCripto() {
  fetch(urlData)
    .then((res) => res.json())
    .then((resJSON) => {
      selectCripto(resJSON.Data);
      //console.log(resJSON.Data);
    })
    .catch((err) => console.log(err));
}

function selectCripto(cripto) {
  cripto.forEach((e) => {
    const { FullName, Name } = e.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    $criptos.appendChild(option);
  });
}

function clearHTML() {
  containerAnswer.appendChild = "";
}
