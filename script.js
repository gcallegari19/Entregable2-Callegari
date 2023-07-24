// Esta entrega simula un portal de cotizacion de prestamo con amortizacion frances.

// Creo las variables necesarias 
const formulario = document.getElementsByClassName('formulario-cotizador');
const nombreUsuario = document.getElementById('nombre');
const email = document.getElementById('email');
const tipoPrestamo = document.getElementById('tipoPrestamo');
const monto = document.getElementById('montoPrestamo');
const cuotas = document.getElementById('cuotas');
const interes = document.getElementById('tasaInteres');
const btnConsultar = document.getElementById('btnConsultar');
const btnOtraConsul = document.getElementById('btnOtraConsul');
const btnEnvio = document.getElementById('btnEnvio');
const generaTabla = document.querySelector('#genera-tabla tbody');

// Creo el array de tipos de préstamo
function obtenerTiposDePrestamo() {
    return ['Personal', 'Hipotecario', 'Automotriz'];
}

// Función para obtener el tipo de préstamo seleccionado por el usuario
function obtenerTipoPrestamoElegido() {
    const tipoPrestamoSeleccionado = tipoPrestamo.value;
    const tiposDePrestamo = obtenerTiposDePrestamo();
    let tipoPrestamoElegido = null;

    tiposDePrestamo.forEach((tipo) => {
        if (tipo === tipoPrestamoSeleccionado) {
            tipoPrestamoElegido = tipo;
        }
    });
    return tipoPrestamoElegido;
}

// Creo evento de click
btnConsultar.addEventListener('click', () => {
    event.preventDefault();
    // Obtener el tipo de préstamo elegido
    calcularValorCuota(monto.value, interes.value, cuotas.value);
    // Deshabilita el boton una vez clickeado
    btnConsultar.disabled = true;
    return('consulta cotizacion');    
})

// Creo evento de click
btnOtraConsul.addEventListener('click', () => {
    formulario.reset();
    calcularValorCuota(monto.value, interes.value, cuotas.value);
    return('otra consulta cotizacion');
})

// Creo funcion para mostrar el texto de agradecimientp
function mostrarAgredecimiento() {
    // Asigno el texto para mostrar
    const texto = "¡Gracias por utilizar nuestro cotizador!";
    // Obtener el elemento donde queremos mostrar el texto
    const elementoTexto = document.getElementById("texto-agradecimiento");
    elementoTexto.textContent = texto;
}

// Creo evento de click para mensaje de agradecimiento
btnEnvio.addEventListener('click', (event) => {
    event.preventDefault(); // Previene el envío del formulario
    mostrarAgredecimiento(); // Llama a la función de mostrar agradecimiento
});


// Funcion del calculo de la cuota para el prestamo personal
function calcularValorCuota(monto, interes, cuotas){

    const tipoPrestamoElegido = obtenerTipoPrestamoElegido();

    let pagoInteres = 0, pagoCapital = 0, cuota = 0, cuotaId = 1;
    let saldo = monto;

    cuota = monto * (Math.pow(1+((interes/100)/12), cuotas)*((interes/100)/12))/(Math.pow(1+((interes/100)/12), cuotas)-1);

    if(cuotas>=12 && cuotas<=60){
        console.log(cuota.toFixed(2));
    }else{
        return;
    }

    // Realizo un for para que me complete el desarrollo del prestamo y veamos todas las cuotas del prestamo
    for(let i = 1; i <= cuotas; i++) {

        pagoInteres = parseFloat(saldo*((interes/100)/12));
        pagoIva = pagoInteres * 0.21;
        pagoCapital = cuota - pagoInteres;
        saldo = parseFloat(saldo-pagoCapital);
        cuotaTotal = cuota + pagoIva;

        // Genero la informacion que se volcara en la tabla de cuotas del prestamo donde agrego un id cuota para saber que numero de cuota es
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cuotaId}</td>
            <td>${saldo.toFixed(2)}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoCapital.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${pagoIva.toFixed(2)}</td>
            <td>${cuotaTotal.toFixed(2)}</td>
        `;
        generaTabla.appendChild(row);
        cuotaId++;
    }

    // Creo objeto de cotizacion
    const cotizacion = {
        nombre: nombreUsuario.value.toLowerCase(),
        email: email.value.toLowerCase(),
        tipoPrestamo: tipoPrestamoElegido,
        monto: monto,
        cuotas: cuotas,
        interes: interes
    };
            
    // Obtengo cotizaciones almacenadas en el localStorage
    let cotizaciones = localStorage.getItem('cotizaciones');
        if (cotizaciones) {
            cotizaciones = JSON.parse(cotizaciones);
        } else {
            cotizaciones = [];
        }
            
        // Agrega la cotización actual al array de cotizaciones
        cotizaciones.push(cotizacion);
            
        // Almaceno las cotizaciones en el localStorage
        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));   
        
} 



