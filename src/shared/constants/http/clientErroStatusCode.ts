export enum clientErrorStatusCodes {
  BAD_REQUEST = 400, // La solicitud no se puede procesar debido a una sintaxis incorrecta.
  UNAUTHORIZED = 401, // La autenticación es necesaria y ha fallado o aún no ha sido proporcionada.
  PAYMENT_REQUIRED = 402, // Reservado para futuros usos.
  FORBIDDEN = 403, // El servidor entiende la solicitud, pero se niega a autorizarla.
  NOT_FOUND = 404, // El recurso solicitado no se ha encontrado.
  METHOD_NOT_ALLOWED = 405, // El método HTTP utilizado no está permitido para el recurso solicitado.
  NOT_ACCEPTABLE = 406, // El recurso solicitado no es capaz de generar el contenido aceptado por el cliente.
  PROXY_AUTHENTICATION_REQUIRED = 407, // El cliente debe autenticarse con el proxy.
  REQUEST_TIMEOUT = 408, // El cliente tardó demasiado tiempo en enviar la solicitud.
  CONFLICT = 409, // La solicitud no pudo ser procesada debido a un conflicto en la solicitud.
  GONE = 410, // El recurso solicitado ya no está disponible y no se sabe si volverá.
  LENGTH_REQUIRED = 411, // El servidor rechaza la solicitud porque no se ha definido la longitud de contenido.
  PRECONDITION_FAILED = 412, // Las condiciones previas dadas en los encabezados de la solicitud fueron evaluadas como falsas por el servidor.
  PAYLOAD_TOO_LARGE = 413, // El servidor se niega a procesar la solicitud porque es demasiado grande.
  URI_TOO_LONG = 414, // El URI proporcionado era demasiado largo para que el servidor lo procesara.
  UNSUPPORTED_MEDIA_TYPE = 415, // El formato de medios solicitado no es compatible con el servidor.
  RANGE_NOT_SATISFIABLE = 416, // El rango especificado por el encabezado Range no puede ser cumplido.
  EXPECTATION_FAILED = 417, // El servidor no puede cumplir con los requisitos del encabezado Expect de la solicitud.
  IM_A_TEAPOT = 418, // Un código de error HTTP de broma que indica que el servidor es un hervidor de agua.
}
