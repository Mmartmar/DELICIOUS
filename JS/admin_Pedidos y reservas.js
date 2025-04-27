// ---------- VARIABLES GLOBALES ----------
let pedidos = []; // Lista de pedidos
let reservas = []; // Lista de reservas
const mesas = Array.from({ length: 20 }, (_, i) => `Mesa ${i + 1}`); // Genera 20 mesas numeradas

// ---------- FUNCIONES PARA PEDIDOS ----------

/**
 * Abre el modal para agregar un nuevo pedido.
 * Resetea el formulario y limpia el índice del pedido.
 */
function abrirModalAgregar() {
    document.getElementById("formPedido").reset();
    document.getElementById("pedidoIndex").value = "";
    const modal = new bootstrap.Modal(document.getElementById("modalPedido"));
    modal.show();
}

/**
 * Guarda un pedido nuevo o modifica uno existente.
 * Valida los campos antes de proceder.
 */
function guardarPedido() {
    const cliente = document.getElementById("cliente").value.trim();
    const detalle = document.getElementById("detalle").value.trim();
    const index = document.getElementById("pedidoIndex").value;

    if (!cliente || !detalle) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevoPedido = { cliente, detalle };

    if (index === "") {
        // Agregar nuevo pedido
        pedidos.push(nuevoPedido);
        agregarATablero("Agregados", cliente);
    } else {
        // Modificar pedido existente
        pedidos[index] = nuevoPedido;
        agregarATablero("Modificados", cliente);
    }

    actualizarTabla();
    bootstrap.Modal.getInstance(document.getElementById("modalPedido")).hide();
}

/**
 * Carga los datos de un pedido en el formulario para editarlo.
 * @param {number} index - Índice del pedido a editar.
 */
function editarPedido(index) {
    const pedido = pedidos[index];
    document.getElementById("cliente").value = pedido.cliente;
    document.getElementById("detalle").value = pedido.detalle;
    document.getElementById("pedidoIndex").value = index;
    const modal = new bootstrap.Modal(document.getElementById("modalPedido"));
    modal.show();
}

/**
 * Elimina un pedido de la lista y actualiza la tabla.
 * @param {number} index - Índice del pedido a eliminar.
 */
function eliminarPedido(index) {
    const pedido = pedidos[index];
    agregarATablero("Eliminados", pedido.cliente);
    pedidos.splice(index, 1);
    actualizarTabla();
}

/**
 * Actualiza la tabla de pedidos en la interfaz.
 */
function actualizarTabla() {
    const tbody = document.querySelector("#tablaPedidos tbody");
    tbody.innerHTML = "";

    pedidos.forEach((pedido, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${pedido.cliente}</td>
            <td>${pedido.detalle}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarPedido(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarPedido(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

/**
 * Agrega un registro al tablero de cambios (agregados, modificados, eliminados).
 * @param {string} tipo - Tipo de cambio ("Agregados", "Modificados", "Eliminados").
 * @param {string} cliente - Nombre del cliente asociado al pedido.
 */
function agregarATablero(tipo, cliente) {
    const lista = {
        Agregados: document.getElementById("listaAgregados"),
        Modificados: document.getElementById("listaModificados"),
        Eliminados: document.getElementById("listaEliminados")
    }[tipo];

    const item = document.createElement("li");
    item.textContent = `Pedido de ${cliente}`;
    lista.appendChild(item);
}

/**
 * Vacía el tablero de cambios.
 */
function vaciarTablero() {
    document.getElementById("listaAgregados").innerHTML = "";
    document.getElementById("listaModificados").innerHTML = "";
    document.getElementById("listaEliminados").innerHTML = "";
}

/**
 * Genera un reporte (simulado).
 */
function generarReporte() {
    alert("Reporte generado exitosamente (simulado).");
}

// ---------- FUNCIONES PARA RESERVAS ----------

/**
 * Muestra las mesas disponibles para realizar una reserva.
 */
document.getElementById("btnNuevaReserva").addEventListener("click", mostrarMesas);

function mostrarMesas() {
    const contenedor = document.getElementById("seleccionMesas");
    contenedor.classList.remove("oculto");

    const lista = document.getElementById("listaMesas");
    lista.innerHTML = "";

    mesas.forEach(mesa => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>
                <button class="btn btn-outline-success btn-sm" onclick="agregarReserva('${mesa}')">${mesa}</button>
            </td>
        `;
        lista.appendChild(fila);
    });
}

/**
 * Agrega una reserva para una mesa específica.
 * @param {string} mesa - Nombre de la mesa a reservar.
 */
function agregarReserva(mesa) {
    const yaReservada = reservas.find(r => r.mesa === mesa);
    if (yaReservada) {
        alert("Esa mesa ya está reservada.");
        return;
    }

    reservas.push({ mesa, estado: "Reservada" });
    actualizarTablaReservas();
}

/**
 * Actualiza la tabla de reservas en la interfaz.
 */
function actualizarTablaReservas() {
    const tbody = document.querySelector("#tablaReservas tbody");
    tbody.innerHTML = "";

    reservas.forEach((reserva, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${reserva.mesa}</td>
            <td>${reserva.estado}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

/**
 * Elimina una reserva de la lista y actualiza la tabla.
 * @param {number} index - Índice de la reserva a eliminar.
 */
function eliminarReserva(index) {
    reservas.splice(index, 1);
    actualizarTablaReservas();
}