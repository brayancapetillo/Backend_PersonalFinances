export enum redirectionStatusCodes {
  MULTIPLE_CHOICES = 300, // Hay múltiples opciones para el recurso solicitado.
  MOVED_PERMANENTLY = 301, // El recurso solicitado ha sido movido de forma permanente a una nueva URL.
  FOUND = 302, // El recurso solicitado ha sido temporalmente movido a una nueva URL.
  SEE_OTHER = 303, // El cliente debe utilizar una URL diferente para acceder al recurso.
  NOT_MODIFIED = 304, // El recurso no ha sido modificado desde la última solicitud.
  TEMPORARY_REDIRECT = 307, // El recurso solicitado ha sido temporalmente movido a una nueva URL, utilizando el mismo método HTTP.
  PERMANENT_REDIRECT = 308, // El recurso solicitado ha sido permanentemente movido a una nueva URL, utilizando el mismo método HTTP.
}
