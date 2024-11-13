import { Request, Response } from "express";
import Role from '../models/roles.ts'
import User from "../models/users.ts";
import jwt from 'jsonwebtoken'

export const signUp = async(req: Request, res: Response) =>{
    try{

    const {username, mail, password, roles} = req.body;
    const nUser = new User({
        username,
        mail,
        password: await new User().encryptPassword(password)
    });
    
    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        nUser.roles = foundRoles.map(role => role._id)
    } else{
        const role = await Role.findOne({name: "user"})
        if (role) {
            nUser.roles = [role._id];
        } else {
            throw new Error("Role 'user' not found.");
        }
    }

    const savedUser = await nUser.save()
    
    const secret = process.env.SECRET || 'default_secret_key';

    if (!process.env.SECRET) {
      console.warn("WARNING: SECRET is not defined in the environment variables. Using default value.");
    }

    const token = jwt.sign({id: savedUser._id}, secret,{
        expiresIn:86400 //24 hrs
    })
    res.status(201).json({ user: nUser, token });    
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Error al añadir nuevo usuario"})
    }
}
export const signIn = async(req: Request, res: Response) =>{
    try{
        const foundUser = await User.findOne({mail: req.body.mail}).populate("roles");
        if(!foundUser){
            res.status(404).json({message: "Usuario no encontrado"});
            return;
        }
        const password = foundUser.password;
        const receivedPassword = req.body.password;
        const matchPassword:boolean = await new User().comparePassword(receivedPassword,password);
         if(!matchPassword){
             res.status(401).json({message: "Contraseña incorrecta"});
             return;
         }
         const secret = process.env.SECRET || 'default_secret_key';

         if (!process.env.SECRET) {
            console.warn("WARNING: SECRET is not defined in the environment variables. Using default value.");
          }
        const token = jwt.sign({id: foundUser._id}, secret,{
            expiresIn: 86400
        })
        res.status(200).json({token})
    }catch(error){
        res.status(500).json({message: "Error al iniciar sesion"})
    }

}
