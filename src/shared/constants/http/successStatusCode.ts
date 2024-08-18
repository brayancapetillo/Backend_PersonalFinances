export enum successStatusCodes {
  OK = 200, // La solicitud ha sido exitosa.
  CREATED = 201, // La solicitud ha sido exitosa y se ha creado un nuevo recurso.
  ACCEPTED = 202, // La solicitud ha sido aceptada para procesamiento, pero no ha sido completada.
  NON_AUTHORITATIVE_INFORMATION = 203, // El servidor ha procesado la solicitud, pero devuelve información de otra fuente.
  NO_CONTENT = 204, // La solicitud ha sido exitosa, pero no se devuelve contenido.
  RESET_CONTENT = 205, // La solicitud ha sido exitosa, pero requiere que el cliente restablezca la vista.
  PARTIAL_CONTENT = 206, // El servidor está enviando una parte del recurso debido a un rango de encabezado de solicitud.
}
