// ==UserScript==
// @name         Itau dolares a pesos
// @version      1
// @description  Convertir saldo de USD a UYU y mostrar
// @author       Avi
// @match        https://www.itaulink.com.uy/*
// @grant        none
// ==/UserScript==

function mostrarPesos() {
    let cuentaDolares = document.querySelectorAll('.zebra-row')[0];
    
    let columnaSaldo = cuentaDolares.querySelectorAll('.col-sm-4')[2];
    let selectorSaldoDolares = columnaSaldo.querySelector('.saldo-valor');
    
    let tablaCambios = document.querySelector('.table-cambio > tbody');
    let selectorCompraDolares = tablaCambios.querySelectorAll('tr')[1].querySelectorAll('td')[1];
    
    let saldoDolares = parseFloat(selectorSaldoDolares.innerHTML.replace(/,/g, ".").replace(/\.(?=.*\.)/g, ""));
    let cotizacionDolares = parseFloat(selectorCompraDolares.innerHTML.replace(/,/g, '.').replace(/\$/g,''));
    
    let saldoPesos = parseFloat((saldoDolares * cotizacionDolares).toFixed(2));
    
    selectorSaldoDolares.innerHTML = saldoDolares.toLocaleString('es-AR', {style: 'currency', currency:'USD'});
    
    let elementoSaldoPesos = document.createElement('p');
    elementoSaldoPesos.innerHTML = saldoPesos.toLocaleString('es-AR', {style: 'currency', currency:'UYU'})
    elementoSaldoPesos.className = 'saldo-valor'
    columnaSaldo.appendChild(elementoSaldoPesos);    
}

window.onload = mostrarPesos;
