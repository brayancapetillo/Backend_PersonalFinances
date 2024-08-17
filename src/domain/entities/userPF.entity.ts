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
