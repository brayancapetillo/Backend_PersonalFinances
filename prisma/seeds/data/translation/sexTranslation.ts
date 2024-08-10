import { sexTranslationCreate } from '@application/dtos/sexTranslation.dto'

export const dataSexTranslation: sexTranslationCreate[] = [
  // Español
  { idSex: 1, idLenguage: 1, name: 'Ninguno' },
  { idSex: 2, idLenguage: 1, name: 'Masculino' },
  { idSex: 3, idLenguage: 1, name: 'Femenino' },

  // Inglés
  { idSex: 1, idLenguage: 2, name: 'None' },
  { idSex: 2, idLenguage: 2, name: 'Male' },
  { idSex: 3, idLenguage: 2, name: 'Female' },

  // Francés
  { idSex: 1, idLenguage: 3, name: 'Aucun' },
  { idSex: 2, idLenguage: 3, name: 'Homme' },
  { idSex: 3, idLenguage: 3, name: 'Femme' }
]
