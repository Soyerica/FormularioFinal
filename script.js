function mostrarAlerta() {
    alert("¡Recuerda registrarte!");
}

function validarTelefono(codigoArea, numero) {
    return /^([0-9]{3})$/.test(codigoArea) && /^([0-9]{8})$/.test(numero);
}

function validarCorreo(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validarEdad(edad) {
    var edadValue = parseInt(edad);
    return !isNaN(edadValue) && edadValue >= 18;
}

function validarFechaNacimiento(fechaNacimiento, edad) {
    var fechaNacimientoValue = new Date(fechaNacimiento);
    var hoy = new Date();
    var edadCalculada = hoy.getFullYear() - fechaNacimientoValue.getFullYear();
    var mes = hoy.getMonth() - fechaNacimientoValue.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoValue.getDate())) {
        edadCalculada--;
    }
    return edadCalculada === edad;
}

document.addEventListener("DOMContentLoaded", function() {
    mostrarAlerta();

    var form = document.getElementById("employeeForm");
    var codigoAreaFijo = form.codigoAreaFijo;
    var numeroFijo = form.numeroFijo;
    var codigoAreaMovil = form.codigoAreaMovil;
    var numeroMovil = form.numeroMovil;
    var email = form.email;
    var edad = form.edad;
    var fechaNacimiento = form.fechaNacimiento;

    var registroBtn = document.getElementById("registroBtn");
    registroBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var errores = [];

        if (!validarTelefono(codigoAreaFijo.value, numeroFijo.value)) {
            errores.push("Por favor, ingrese un código de área y número de teléfono fijo válidos (formato: 011 12345678).");
        }

        if (!validarTelefono(codigoAreaMovil.value, numeroMovil.value)) {
            errores.push("Por favor, ingrese un código de área y número de teléfono móvil válidos (formato: 011 12345678).");
        }

        if (!validarCorreo(email.value)) {
            errores.push("Por favor, ingrese un correo electrónico válido.");
        }

        if (!validarEdad(edad.value)) {
            errores.push("Debes tener al menos 18 años para registrarte.");
        }

        if (!validarFechaNacimiento(fechaNacimiento.value, parseInt(edad.value))) {
            errores.push("La fecha de nacimiento no coincide con la edad proporcionada.");
        }

        if (errores.length > 0) {
            alert("Por favor, corrija los siguientes errores:\n\n" + errores.join("\n"));
        } else {
            alert("¡Registro exitoso!");
            form.submit();
        }
    });
});
