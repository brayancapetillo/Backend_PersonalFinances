export enum serverErrorStatusCodes {
  INTERNAL_SERVER_ERROR = 500, // El servidor encontró una situación inesperada que le impide completar la solicitud.
  NOT_IMPLEMENTED = 501, // El servidor no reconoce el método de solicitud o carece de la capacidad para completarla.
  BAD_GATEWAY = 502, // El servidor, actuando como un gateway o proxy, recibió una respuesta inválida del servidor upstream.
  SERVICE_UNAVAILABLE = 503, // El servidor no está disponible temporalmente, generalmente debido a mantenimiento o sobrecarga.
  GATEWAY_TIMEOUT = 504, // El servidor, actuando como un gateway o proxy, no recibió una respuesta a tiempo del servidor upstream.
  HTTP_VERSION_NOT_SUPPORTED = 505, // El servidor no soporta la versión del protocolo HTTP utilizada en la solicitud.
  VARIANT_ALSO_NEGOTIATES = 506, // El servidor tiene un error de configuración interna: la negociación de contenido circular.
  INSUFFICIENT_STORAGE = 507, // El servidor no puede almacenar la representación necesaria para completar la solicitud.
  LOOP_DETECTED = 508, // El servidor detectó un bucle infinito al procesar la solicitud.
  NOT_EXTENDED = 510, // Se requiere más extensión para que el servidor complete la solicitud.
  NETWORK_AUTHENTICATION_REQUIRED = 511, // El cliente necesita autenticarse para obtener acceso a la red.
}
