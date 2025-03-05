/**
 * @file userPF.entity.ts
 * @description This class represents a UserPF entity in the system.
 * It encapsulates the properties and behaviors of a user.
 * @module Entities
 */

/**
 * UserPF class
 *
 * This class defines the structure of a UserPF entity, including all the
 * necessary properties that represent a user in the application.
 */
export class UserPF {
  constructor (
    public readonly id: number,
    public email: string,
    public name: string,
    public lastName: string | null,
    public birthday: Date | null,
    public phone: string | null,
    public idSex: number,
    public idLenguage: number,
    public password: string,
    public verify: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
