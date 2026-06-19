// -------------------------------------------------------------------
// 1) Se obtiene una copia del formulario por su identificador (ID)
//    para poder "escuchar" su evento de envio (submit).
const formulario_1 = document.getElementById("form_registro");



// 2) Se adiciona el formulario a la escucha del evento "submit".
//    Nota: a validar_campos NO se le colocan parentesis (), porque de
//    lo contrario se ejecutaria de inmediato en vez de quedar a la
//    espera del evento.
formulario_1.addEventListener("submit", validar_campos);



// 3) La barra de peso (input type="range") queda a la escucha del
//    evento "input" para mostrar su valor en pantalla.
const barra_peso = document.getElementById("peso_perro");
barra_peso.addEventListener("input", mostrar_peso);


// mostrar_peso(): muestra en pantalla el valor actual de la barra de
// peso del perro cada vez que el usuario la mueve.
function mostrar_peso() {
    let valor = document.getElementById("peso_perro").value;
    document.getElementById("valor_peso").textContent = valor;
}


// mostrar_error(): escribe un mensaje de error dentro del <span>
// indicado por su IdN. Usa textContent como se vio en clase.
function mostrar_error(id_mensaje, texto) {
    document.getElementById(id_mensaje).textContent = texto;
}


// limpiar_error(): borra el mensaje de error del <span> indicado.
function limpiar_error(id_mensaje) {
    document.getElementById(id_mensaje).textContent = "";
}


// validar_campos(evento_enviar): revisa cada campo del formulario.
// Se ejecuta cuando el usuario oprime el boton [Registrar paseo]
// (evento "submit"). Con preventDefault() se evita que la pagina se
// recargue, de modo que JavaScript maneja toda la validacion.
function validar_campos(evento_enviar) {

    // Evita que la pagina se recargue y los datos se envien de forma
    // tradicional; asi JavaScript controla todo el envio.
    evento_enviar.preventDefault();

    // Bandera (booleano) que indica si todo el formulario es valido.
    let formulario_valido = true;

    // Expresiones regulares para validar el formato de los datos.
    const regex_nombre = /^[a-zA-ZÀ-ÿ]+(\s+[a-zA-ZÀ-ÿ]+)*$/;                  // solo letras (una o mas palabras)
    const regex_cedula = /^\d{6,10}$/;                                        // 6 a 10 digitos
    const regex_telefono = /^\d{10}$/;                                        // 10 digitos (celular Colombia)
    const regex_correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;  // texto@texto.texto
    const regex_password = /^.{7,20}$/;                                       // entre 7 y 20 caracteres
    const regex_archivo = /\.(jpg|jpeg|png|gif|pdf)$/i;                       // imagen o PDF


    // ===================== Datos del dueño =========================

    // 1. NOMBRES -------------------------------------------------------
    let nombres = document.getElementById("nombres").value;
    if (nombres === "") {
        mostrar_error("error_nombres", "El nombre es obligatorio.");
        formulario_valido = false;
    } else if (regex_nombre.test(nombres) === false) {
        mostrar_error("error_nombres", "El nombre solo puede contener letras.");
        formulario_valido = false;
    } else {
        limpiar_error("error_nombres");
    }

    // 2. APELLIDOS -----------------------------------------------------
    let apellidos = document.getElementById("apellidos").value;
    if (apellidos === "") {
        mostrar_error("error_apellidos", "El apellido es obligatorio.");
        formulario_valido = false;
    } else if (regex_nombre.test(apellidos) === false) {
        mostrar_error("error_apellidos", "El apellido solo puede contener letras.");
        formulario_valido = false;
    } else {
        limpiar_error("error_apellidos");
    }

    // 3. CEDULA --------------------------------------------------------
    let cedula = document.getElementById("cedula").value;
    if (cedula === "") {
        mostrar_error("error_cedula", "La cedula es obligatoria.");
        formulario_valido = false;
    } else if (regex_cedula.test(cedula) === false) {
        mostrar_error("error_cedula", "La cedula debe tener entre 6 y 10 digitos.");
        formulario_valido = false;
    } else {
        limpiar_error("error_cedula");
    }

    // 4. TELEFONO ------------------------------------------------------
    let telefono = document.getElementById("telefono").value;
    if (telefono === "") {
        mostrar_error("error_telefono", "El telefono es obligatorio.");
        formulario_valido = false;
    } else if (regex_telefono.test(telefono) === false) {
        mostrar_error("error_telefono", "El telefono debe tener 10 digitos.");
        formulario_valido = false;
    } else {
        limpiar_error("error_telefono");
    }

    // 5. CORREO ELECTRONICO --------------------------------------------
    let correo = document.getElementById("correo").value;
    if (correo === "") {
        mostrar_error("error_correo", "El correo es obligatorio.");
        formulario_valido = false;
    } else if (regex_correo.test(correo) === false) {
        mostrar_error("error_correo", "El correo no tiene un formato valido.");
        formulario_valido = false;
    } else {
        limpiar_error("error_correo");
    }

    // 6. CONTRASENA ----------------------------------------------------
    let clave = document.getElementById("clave").value;
    if (clave === "") {
        mostrar_error("error_clave", "La contrasena es obligatoria.");
        formulario_valido = false;
    } else if (regex_password.test(clave) === false) {
        mostrar_error("error_clave", "La contrasena debe tener entre 7 y 20 caracteres.");
        formulario_valido = false;
    } else {
        limpiar_error("error_clave");
    }

    // 7. BARRIO (datalist) ---------------------------------------------
    let barrio = document.getElementById("barrio").value;
    if (barrio === "") {
        mostrar_error("error_barrio", "Debe indicar el barrio de recogida.");
        formulario_valido = false;
    } else {
        limpiar_error("error_barrio");
    }


    // ===================== DATOS DE LA MASCOTA =======================

    // 8. NOMBRE DEL PERRO ----------------------------------------------
    let nombre_perro = document.getElementById("nombre_perro").value;
    if (nombre_perro === "") {
        mostrar_error("error_nombre_perro", "El nombre del perro es obligatorio.");
        formulario_valido = false;
    } else {
        limpiar_error("error_nombre_perro");
    }

    // 9. EDAD DEL PERRO ------------------------------------------------
    // Se convierte el texto a numero (casting con Number) y se revisa el rango.
    let edad = document.getElementById("edad_perro").value;
    let edad_numero = Number(edad);
    if (edad === "") {
        mostrar_error("error_edad_perro", "La edad del perro es obligatoria.");
        formulario_valido = false;
    } else if (edad_numero < 0) {
        mostrar_error("error_edad_perro", "La edad no puede ser negativa.");
        formulario_valido = false;
    } else if (edad_numero > 25) {
        mostrar_error("error_edad_perro", "La edad debe ser menor o igual a 25.");
        formulario_valido = false;
    } else {
        limpiar_error("error_edad_perro");
    }

    // 10. PESO DEL PERRO (range): siempre tiene un valor valido por el min/max.

    // 11. FECHA DE NACIMIENTO ------------------------------------------
    let fecha_nac = document.getElementById("fecha_nac").value;
    if (fecha_nac === "") {
        mostrar_error("error_fecha_nac", "Debe ingresar la fecha de nacimiento.");
        formulario_valido = false;
    } else {
        limpiar_error("error_fecha_nac");
    }

    // 12. SEXO (radio) -------------------------------------------------
    // Se revisa una por una las opciones para saber si alguna esta marcada.
    let sexo_seleccionado = false;
    if (document.getElementById("sexo_m").checked === true) {
        sexo_seleccionado = true;
    }
    if (document.getElementById("sexo_h").checked === true) {
        sexo_seleccionado = true;
    }
    if (sexo_seleccionado === false) {
        mostrar_error("error_sexo", "Debe seleccionar el sexo del perro.");
        formulario_valido = false;
    } else {
        limpiar_error("error_sexo");
    }

    // 13. TAMANO (select) ----------------------------------------------
    let tamano = document.getElementById("tamano").value;
    if (tamano === "") {
        mostrar_error("error_tamano", "Debe seleccionar un tamano.");
        formulario_valido = false;
    } else {
        limpiar_error("error_tamano");
    }

    // 14. RAZA (datalist) ----------------------------------------------
    let raza = document.getElementById("raza").value;
    if (raza === "") {
        mostrar_error("error_raza", "Debe indicar la raza.");
        formulario_valido = false;
    } else {
        limpiar_error("error_raza");
    }

    // 15. SERVICIOS DESEADOS (varias casillas) -------------------------
    // Se cuenta cuantas casillas estan marcadas; debe haber al menos una.
    let total_servicios = 0;
    if (document.getElementById("serv_individual").checked === true) {
        total_servicios = total_servicios + 1;
    }
    if (document.getElementById("serv_grupal").checked === true) {
        total_servicios = total_servicios + 1;
    }
    if (document.getElementById("serv_guarderia").checked === true) {
        total_servicios = total_servicios + 1;
    }
    if (document.getElementById("serv_bano").checked === true) {
        total_servicios = total_servicios + 1;
    }
    if (total_servicios === 0) {
        mostrar_error("error_servicios", "Seleccione al menos un servicio.");
        formulario_valido = false;
    } else {
        limpiar_error("error_servicios");
    }

    // 16. COLOR del collar: siempre tiene un valor valido por defecto.
    // 0. OBSERVACIONES (textarea): es opcional y el largo se limita con
    //    el atributo maxlength del HTML, por eso no requieren validacion aqui.

    // 17. CARNE DE VACUNACION (file) - es opcional ---------------------
    // Si el usuario eligio un archivo, se revisa que sea imagen o PDF.
    let carne = document.getElementById("carne").value;
    if (carne === "") {
        limpiar_error("error_carne");
    } else if (regex_archivo.test(carne) === false) {
        mostrar_error("error_carne", "El archivo debe ser una imagen (jpg, png, gif) o un PDF.");
        formulario_valido = false;
    } else {
        limpiar_error("error_carne");
    }

    // 18. VACUNAS AL DIA (verdadero/falso) -----------------------------
    if (document.getElementById("vacunas").checked === false) {
        mostrar_error("error_vacunas", "Debe declarar que el perro tiene las vacunas al dia.");
        formulario_valido = false;
    } else {
        limpiar_error("error_vacunas");
    }

    // 19. TERMINOS Y CONDICIONES (verdadero/falso) ---------------------
    if (document.getElementById("terminos").checked === false) {
        mostrar_error("error_terminos", "Debe aceptar los terminos y condiciones.");
        formulario_valido = false;
    } else {
        limpiar_error("error_terminos");
    }


    // ---------------------------------------------------------------
    // Resultado final de la validacion (Web API: window.alert)
    // ---------------------------------------------------------------
    if (formulario_valido === true) {
        window.alert("Registro exitoso. " + nombre_perro + " ya esta listo para su paseo. Gracias " + nombres + "!");
        // Aqui, ya validados los datos, se podrian enviar al servidor.
    } else {
        window.alert("El formulario tiene errores. Por favor revise los campos marcados en rojo.");
    }
}
