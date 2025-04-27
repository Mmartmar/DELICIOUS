// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {

    // Agrega un evento al formulario de inicio de sesión para manejar el envío
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Credenciales válidas para el inicio de sesión
        const usuarioValido = "admin@delicious.co";
        const contrasenaValida = "Asdf123**";

        // Obtiene los valores ingresados por el usuario en los campos del formulario
        const usuario = document.getElementById("usuario").value;
        const contrasena = document.getElementById("contrasena").value;

        // Verifica si las credenciales ingresadas coinciden con las válidas
        if (usuario === usuarioValido && contrasena === contrasenaValida) {
            // Muestra un mensaje de éxito utilizando SweetAlert2
            Swal.fire({
                icon: 'success', // Icono de éxito
                title: '¡Bienvenido!', // Título del mensaje
                text: 'Accediendo al panel de gestión...', // Texto del mensaje
                showConfirmButton: false, // Oculta el botón de confirmación
                timer: 2000 // Duración del mensaje en milisegundos
            });

            // Redirige al usuario al panel de gestión después de 1 segundo
            setTimeout(() => {
                window.location.href = "gestion_menu.html";
            }, 1000);
        } else {
            // Muestra un mensaje de error si las credenciales son incorrectas
            Swal.fire({
                icon: 'error', // Icono de error
                title: 'Oops...', // Título del mensaje
                text: 'Usuario o contraseña incorrectos.', // Texto del mensaje
                confirmButtonColor: '#d33', // Color del botón de confirmación
                confirmButtonText: 'Intentar de nuevo' // Texto del botón de confirmación
            });
        }
    });
});