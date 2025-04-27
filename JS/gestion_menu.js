// ---------- VARIABLES GLOBALES ----------
const form = document.getElementById('form-platillo'); // Formulario para agregar/modificar platillos
const tabla = document.getElementById('tabla-platillos'); // Tabla donde se muestran los platillos
const btnAgregar = document.getElementById('btn-agregar'); // Botón para agregar un nuevo platillo
const btnModificar = document.getElementById('btn-modificar'); // Botón para modificar un platillo existente
const btnCancelar = document.getElementById('btn-cancelar'); // Botón para cancelar la edición

let filaSeleccionada = null; // Variable para almacenar la fila seleccionada en caso de edición

// ---------- EVENTOS ----------

/**
 * Maneja el evento de envío del formulario.
 * Valida los datos y decide si agregar o modificar un platillo.
 */
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    let precio = document.getElementById('precio').value.trim();

    // Asegurarse de que el precio tenga el formato con el símbolo $
    if (precio && !precio.startsWith('$')) {
        precio = '$' + precio;
    }

    if (filaSeleccionada) {
        // Modificar el platillo existente
        filaSeleccionada.cells[0].textContent = nombre;
        filaSeleccionada.cells[1].textContent = descripcion;
        filaSeleccionada.cells[2].textContent = precio;
        resetForm();
    } else {
        // Agregar un nuevo platillo
        const nuevaFila = tabla.insertRow();
        nuevaFila.innerHTML = `
            <td>${nombre}</td>
            <td>${descripcion}</td>
            <td>${precio}</td>
            <td>
                <button type="button" class="btn btn-warning" onclick="editarPlatillo(this)">Editar</button>
                <button type="button" class="btn btn-danger" onclick="eliminarPlatillo(this)">Eliminar</button>
            </td>
        `;
        form.reset();
    }
});

/**
 * Maneja el evento del botón "Cancelar".
 * Resetea el formulario y oculta los botones de edición.
 */
btnCancelar.addEventListener('click', function () {
    resetForm();
});

// ---------- FUNCIONES ----------

/**
 * Permite editar un platillo seleccionado.
 * Llena el formulario con los datos del platillo y muestra los botones de edición.
 * @param {HTMLElement} boton - Botón "Editar" que fue presionado.
 */
function editarPlatillo(boton) {
    filaSeleccionada = boton.parentElement.parentElement; // Obtener la fila seleccionada
    document.getElementById('nombre').value = filaSeleccionada.cells[0].textContent;
    document.getElementById('descripcion').value = filaSeleccionada.cells[1].textContent;
    document.getElementById('precio').value = filaSeleccionada.cells[2].textContent.replace('$', ''); // Eliminar el símbolo '$' temporalmente

    // Mostrar botones de edición y ocultar el de agregar
    btnAgregar.style.display = 'none';
    btnModificar.style.display = 'inline-block';
    btnCancelar.style.display = 'inline-block';
}

/**
 * Elimina un platillo de la tabla.
 * @param {HTMLElement} boton - Botón "Eliminar" que fue presionado.
 */
function eliminarPlatillo(boton) {
    const fila = boton.parentElement.parentElement; // Obtener la fila a eliminar
    tabla.deleteRow(fila.rowIndex); // Eliminar la fila de la tabla
    resetForm(); // Resetear el formulario
}

/**
 * Resetea el formulario y los botones a su estado inicial.
 */
function resetForm() {
    filaSeleccionada = null; // Limpiar la fila seleccionada
    form.reset(); // Limpiar los campos del formulario

    // Mostrar el botón de agregar y ocultar los de edición
    btnAgregar.style.display = 'inline-block';
    btnModificar.style.display = 'none';
    btnCancelar.style.display = 'none';
}