import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'
import { UserPF } from '@domain/entities/userPF.entity'
import { Request, Response } from 'express'

export class UserPFController {
  constructor (private readonly registerUserPF: RegisterUserPF) {}

  async register (req: Request, res: Response): Promise<void> {
    try {
      const userPFDTO: registerUserPFDTO = req.body

      const ResUserPF: UserPF = await this.registerUserPF.execute(userPFDTO)

      res.status(201).send(ResUserPF)
    } catch (e) {
      console.log(e)

      res.status(500).send(e)
    }
  }
}
