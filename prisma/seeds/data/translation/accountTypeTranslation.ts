import { accountTypeTranslation } from '@prisma/client'

export const dataAccountTTranslation: Array<Pick<accountTypeTranslation, 'idAccountType' | 'idLenguage' | 'name'>> = [
  // Español
  { idAccountType: 1, idLenguage: 1, name: 'Débito' },
  { idAccountType: 2, idLenguage: 1, name: 'Crédito' },
  { idAccountType: 3, idLenguage: 1, name: 'Efectivo' },

  // Inglés
  { idAccountType: 1, idLenguage: 2, name: 'Debit' },
  { idAccountType: 2, idLenguage: 2, name: 'Credit' },
  { idAccountType: 3, idLenguage: 2, name: 'Cash' },

  // Francés
  { idAccountType: 1, idLenguage: 3, name: 'Débit' },
  { idAccountType: 2, idLenguage: 3, name: 'Crédit' },
  { idAccountType: 3, idLenguage: 3, name: 'Espèces' }
]
