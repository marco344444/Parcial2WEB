import { Request, Response } from 'express'
import User from '../types/User'
import { renderRegisterForm, renderUser, renderError } from '../../template/renderer'

export default class UserView {
  readonly register = (req: Request, res: Response) => {
    const { nombres, apellidos, cedula, direccion, telefono } = (req.body || {}) as Partial<User>
    if (!nombres || !apellidos || !cedula || !direccion || !telefono) {
      return res.status(400).send(renderError('Todos los campos son obligatorios.'))
    }
    const user: User = {
      nombres: String(nombres),
      apellidos: String(apellidos),
      cedula: String(cedula),
      direccion: String(direccion),
      telefono: String(telefono)
    }
    return res.status(200).send(renderUser(user))
  }

  readonly formRegister = (_req: Request, res: Response) => {
    return res.status(200).send(renderRegisterForm())
  }
}
