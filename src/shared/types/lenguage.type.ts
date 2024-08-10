export interface tlenguage {
  Spanish: 'es'
  English: 'en'
  French: 'fr'
}
export type tlenguageName = keyof tlenguage
export type tlenguageCode = tlenguage[tlenguageName]
