import { categoryTranslation } from '@prisma/client'

export const dataCategoryTranslation: Array<Pick<categoryTranslation, 'idCategory' | 'idLenguage' | 'name'>> = [
  // Español
  { idCategory: 1, idLenguage: 1, name: 'Salario' },
  { idCategory: 2, idLenguage: 1, name: 'Inversiones' },
  { idCategory: 3, idLenguage: 1, name: 'Bonificaciones' },
  { idCategory: 4, idLenguage: 1, name: 'Reembolsos' },
  { idCategory: 5, idLenguage: 1, name: 'Otros Ingresos' },
  { idCategory: 6, idLenguage: 1, name: 'Alquiler/Hipoteca' },
  { idCategory: 7, idLenguage: 1, name: 'Agua' },
  { idCategory: 8, idLenguage: 1, name: 'Electricidad' },
  { idCategory: 9, idLenguage: 1, name: 'Gas' },
  { idCategory: 10, idLenguage: 1, name: 'Internet y Teléfono' },
  { idCategory: 11, idLenguage: 1, name: 'Salud' },
  { idCategory: 12, idLenguage: 1, name: 'Hogar' },
  { idCategory: 13, idLenguage: 1, name: 'Auto' },
  { idCategory: 14, idLenguage: 1, name: 'Pagos de Préstamos' },
  { idCategory: 15, idLenguage: 1, name: 'Comida' },
  { idCategory: 16, idLenguage: 1, name: 'Transporte' },
  { idCategory: 17, idLenguage: 1, name: 'Entretenimiento' },
  { idCategory: 18, idLenguage: 1, name: 'Comidas Fuera' },
  { idCategory: 19, idLenguage: 1, name: 'Ropa' },
  { idCategory: 20, idLenguage: 1, name: 'Compras' },
  { idCategory: 21, idLenguage: 1, name: 'Ahorros de Emergencia' },
  { idCategory: 22, idLenguage: 1, name: 'Fondo de Jubilación' },
  { idCategory: 23, idLenguage: 1, name: 'Inversiones en Acciones' },
  { idCategory: 24, idLenguage: 1, name: 'Ahorros para Vacaciones' },
  { idCategory: 25, idLenguage: 1, name: 'Tarjetas de Crédito' },
  { idCategory: 26, idLenguage: 1, name: 'Préstamos Estudiantiles' },
  { idCategory: 27, idLenguage: 1, name: 'Préstamos Personales' },
  { idCategory: 28, idLenguage: 1, name: 'Mantenimiento' },
  { idCategory: 29, idLenguage: 1, name: 'Reparaciones' },
  { idCategory: 30, idLenguage: 1, name: 'Decoración' },
  { idCategory: 31, idLenguage: 1, name: 'Suministros' },
  { idCategory: 32, idLenguage: 1, name: 'Consultas Médicas' },
  { idCategory: 33, idLenguage: 1, name: 'Medicamentos' },
  { idCategory: 34, idLenguage: 1, name: 'Gimnasio' },
  { idCategory: 35, idLenguage: 1, name: 'Terapia' },
  { idCategory: 36, idLenguage: 1, name: 'Matrícula y Cuotas' },
  { idCategory: 37, idLenguage: 1, name: 'Material Escolar' },
  { idCategory: 38, idLenguage: 1, name: 'Cursos y Talleres' },
  { idCategory: 39, idLenguage: 1, name: 'Comida' },
  { idCategory: 40, idLenguage: 1, name: 'Cuidado Veterinario' },
  { idCategory: 41, idLenguage: 1, name: 'Juguetes y Accesorios' },
  { idCategory: 42, idLenguage: 1, name: 'Donaciones a ONGs' },
  { idCategory: 43, idLenguage: 1, name: 'Apoyo a Familia/Amigos' },
  { idCategory: 44, idLenguage: 1, name: 'Impuestos sobre la Renta' },
  { idCategory: 45, idLenguage: 1, name: 'Impuestos sobre Propiedades' },
  { idCategory: 46, idLenguage: 1, name: 'Viajes' },
  { idCategory: 47, idLenguage: 1, name: 'Escapadas de Fin de Semana' },
  { idCategory: 48, idLenguage: 1, name: 'Actividades Recreativas' },
  { idCategory: 49, idLenguage: 1, name: 'Netflix' },
  { idCategory: 50, idLenguage: 1, name: 'Disney+' },
  { idCategory: 51, idLenguage: 1, name: 'Amazon Prime Video' },
  { idCategory: 52, idLenguage: 1, name: 'HBO Max' },
  { idCategory: 53, idLenguage: 1, name: 'Apple TV+' },
  { idCategory: 54, idLenguage: 1, name: 'Hulu' },
  { idCategory: 55, idLenguage: 1, name: 'Spotify Premium' },
  { idCategory: 56, idLenguage: 1, name: 'YouTube Premium' },
  { idCategory: 57, idLenguage: 1, name: 'Paramount+' },
  { idCategory: 58, idLenguage: 1, name: 'Peacock' },
  { idCategory: 59, idLenguage: 1, name: 'Sky' },
  { idCategory: 60, idLenguage: 1, name: 'Dispositivos Electrónicos' },
  { idCategory: 61, idLenguage: 1, name: 'Software y Aplicaciones' },

  // Inglés
  { idCategory: 1, idLenguage: 2, name: 'Salary' },
  { idCategory: 2, idLenguage: 2, name: 'Investments' },
  { idCategory: 3, idLenguage: 2, name: 'Bonuses' },
  { idCategory: 4, idLenguage: 2, name: 'Reimbursements' },
  { idCategory: 5, idLenguage: 2, name: 'Other Income' },
  { idCategory: 6, idLenguage: 2, name: 'Rent/Mortgage' },
  { idCategory: 7, idLenguage: 2, name: 'Water' },
  { idCategory: 8, idLenguage: 2, name: 'Electricity' },
  { idCategory: 9, idLenguage: 2, name: 'Gas' },
  { idCategory: 10, idLenguage: 2, name: 'Internet and Phone' },
  { idCategory: 11, idLenguage: 2, name: 'Health' },
  { idCategory: 12, idLenguage: 2, name: 'Home' },
  { idCategory: 13, idLenguage: 2, name: 'Auto' },
  { idCategory: 14, idLenguage: 2, name: 'Loan Payments' },
  { idCategory: 15, idLenguage: 2, name: 'Food' },
  { idCategory: 16, idLenguage: 2, name: 'Transportation' },
  { idCategory: 17, idLenguage: 2, name: 'Entertainment' },
  { idCategory: 18, idLenguage: 2, name: 'Dining Out' },
  { idCategory: 19, idLenguage: 2, name: 'Clothing' },
  { idCategory: 20, idLenguage: 2, name: 'Shopping' },
  { idCategory: 21, idLenguage: 2, name: 'Emergency Savings' },
  { idCategory: 22, idLenguage: 2, name: 'Retirement Fund' },
  { idCategory: 23, idLenguage: 2, name: 'Stock Investments' },
  { idCategory: 24, idLenguage: 2, name: 'Vacation Savings' },
  { idCategory: 25, idLenguage: 2, name: 'Credit Cards' },
  { idCategory: 26, idLenguage: 2, name: 'Student Loans' },
  { idCategory: 27, idLenguage: 2, name: 'Personal Loans' },
  { idCategory: 28, idLenguage: 2, name: 'Maintenance' },
  { idCategory: 29, idLenguage: 2, name: 'Repairs' },
  { idCategory: 30, idLenguage: 2, name: 'Decoration' },
  { idCategory: 31, idLenguage: 2, name: 'Supplies' },
  { idCategory: 32, idLenguage: 2, name: 'Medical Consultations' },
  { idCategory: 33, idLenguage: 2, name: 'Medications' },
  { idCategory: 34, idLenguage: 2, name: 'Gym' },
  { idCategory: 35, idLenguage: 2, name: 'Therapy' },
  { idCategory: 36, idLenguage: 2, name: 'Tuition and Fees' },
  { idCategory: 37, idLenguage: 2, name: 'School Supplies' },
  { idCategory: 38, idLenguage: 2, name: 'Courses and Workshops' },
  { idCategory: 39, idLenguage: 2, name: 'Food' },
  { idCategory: 40, idLenguage: 2, name: 'Veterinary Care' },
  { idCategory: 41, idLenguage: 2, name: 'Toys and Accessories' },
  { idCategory: 42, idLenguage: 2, name: 'Donations to NGOs' },
  { idCategory: 43, idLenguage: 2, name: 'Support to Family/Friends' },
  { idCategory: 44, idLenguage: 2, name: 'Income Taxes' },
  { idCategory: 45, idLenguage: 2, name: 'Property Taxes' },
  { idCategory: 46, idLenguage: 2, name: 'Travel' },
  { idCategory: 47, idLenguage: 2, name: 'Weekend Getaways' },
  { idCategory: 48, idLenguage: 2, name: 'Recreational Activities' },
  { idCategory: 49, idLenguage: 2, name: 'Netflix' },
  { idCategory: 50, idLenguage: 2, name: 'Disney+' },
  { idCategory: 51, idLenguage: 2, name: 'Amazon Prime Video' },
  { idCategory: 52, idLenguage: 2, name: 'HBO Max' },
  { idCategory: 53, idLenguage: 2, name: 'Apple TV+' },
  { idCategory: 54, idLenguage: 2, name: 'Hulu' },
  { idCategory: 55, idLenguage: 2, name: 'Spotify Premium' },
  { idCategory: 56, idLenguage: 2, name: 'YouTube Premium' },
  { idCategory: 57, idLenguage: 2, name: 'Paramount+' },
  { idCategory: 58, idLenguage: 2, name: 'Peacock' },
  { idCategory: 59, idLenguage: 2, name: 'Sky' },
  { idCategory: 60, idLenguage: 2, name: 'Electronic Devices' },
  { idCategory: 61, idLenguage: 2, name: 'Software and Apps' },

  // Francés
  { idCategory: 1, idLenguage: 3, name: 'Salaire' },
  { idCategory: 2, idLenguage: 3, name: 'Investissements' },
  { idCategory: 3, idLenguage: 3, name: 'Primes' },
  { idCategory: 4, idLenguage: 3, name: 'Remboursements' },
  { idCategory: 5, idLenguage: 3, name: 'Autres Revenus' },
  { idCategory: 6, idLenguage: 3, name: 'Loyer/Hypothèque' },
  { idCategory: 7, idLenguage: 3, name: 'Eau' },
  { idCategory: 8, idLenguage: 3, name: 'Électricité' },
  { idCategory: 9, idLenguage: 3, name: 'Gaz' },
  { idCategory: 10, idLenguage: 3, name: 'Internet et Téléphone' },
  { idCategory: 11, idLenguage: 3, name: 'Santé' },
  { idCategory: 12, idLenguage: 3, name: 'Maison' },
  { idCategory: 13, idLenguage: 3, name: 'Voiture' },
  { idCategory: 14, idLenguage: 3, name: 'Paiements de Prêts' },
  { idCategory: 15, idLenguage: 3, name: 'Nourriture' },
  { idCategory: 16, idLenguage: 3, name: 'Transport' },
  { idCategory: 17, idLenguage: 3, name: 'Divertissement' },
  { idCategory: 18, idLenguage: 3, name: 'Repas au Restaurant' },
  { idCategory: 19, idLenguage: 3, name: 'Vêtements' },
  { idCategory: 20, idLenguage: 3, name: 'Achats' },
  { idCategory: 21, idLenguage: 3, name: 'Épargne de Précaution' },
  { idCategory: 22, idLenguage: 3, name: 'Fonds de Retraite' },
  { idCategory: 23, idLenguage: 3, name: 'Investissements en Actions' },
  { idCategory: 24, idLenguage: 3, name: 'Épargne pour Vacances' },
  { idCategory: 25, idLenguage: 3, name: 'Cartes de Crédit' },
  { idCategory: 26, idLenguage: 3, name: 'Prêts Étudiants' },
  { idCategory: 27, idLenguage: 3, name: 'Prêts Personnels' },
  { idCategory: 28, idLenguage: 3, name: 'Entretien' },
  { idCategory: 29, idLenguage: 3, name: 'Réparations' },
  { idCategory: 30, idLenguage: 3, name: 'Décoration' },
  { idCategory: 31, idLenguage: 3, name: 'Fournitures' },
  { idCategory: 32, idLenguage: 3, name: 'Consultations Médicales' },
  { idCategory: 33, idLenguage: 3, name: 'Médicaments' },
  { idCategory: 34, idLenguage: 3, name: 'Salle de Sport' },
  { idCategory: 35, idLenguage: 3, name: 'Thérapie' },
  { idCategory: 36, idLenguage: 3, name: 'Frais de Scolarité' },
  { idCategory: 37, idLenguage: 3, name: 'Matériel Scolaire' },
  { idCategory: 38, idLenguage: 3, name: 'Cours et Ateliers' },
  { idCategory: 39, idLenguage: 3, name: 'Nourriture' },
  { idCategory: 40, idLenguage: 3, name: 'Soins Vétérinaires' },
  { idCategory: 41, idLenguage: 3, name: 'Jouets et Accessoires' },
  { idCategory: 42, idLenguage: 3, name: 'Dons aux ONG' },
  { idCategory: 43, idLenguage: 3, name: 'Soutien à la Famille/Amis' },
  { idCategory: 44, idLenguage: 3, name: 'Impôts sur le Revenu' },
  { idCategory: 45, idLenguage: 3, name: 'Impôts Fonciers' },
  { idCategory: 46, idLenguage: 3, name: 'Voyage' },
  { idCategory: 47, idLenguage: 3, name: 'Escapades du Week-end' },
  { idCategory: 48, idLenguage: 3, name: 'Activités Récréatives' },
  { idCategory: 49, idLenguage: 3, name: 'Netflix' },
  { idCategory: 50, idLenguage: 3, name: 'Disney+' },
  { idCategory: 51, idLenguage: 3, name: 'Amazon Prime Video' },
  { idCategory: 52, idLenguage: 3, name: 'HBO Max' },
  { idCategory: 53, idLenguage: 3, name: 'Apple TV+' },
  { idCategory: 54, idLenguage: 3, name: 'Hulu' },
  { idCategory: 55, idLenguage: 3, name: 'Spotify Premium' },
  { idCategory: 56, idLenguage: 3, name: 'YouTube Premium' },
  { idCategory: 57, idLenguage: 3, name: 'Paramount+' },
  { idCategory: 58, idLenguage: 3, name: 'Peacock' },
  { idCategory: 59, idLenguage: 3, name: 'Sky' },
  { idCategory: 60, idLenguage: 3, name: 'Appareils Électroniques' },
  { idCategory: 61, idLenguage: 3, name: 'Logiciels et Applications' }
]
