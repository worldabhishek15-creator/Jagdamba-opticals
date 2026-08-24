import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './db.js';
const secret = process.env.JWT_SECRET;
if(!secret) throw new Error('JWT_SECRET is required');
export async function hashPassword(password){ return bcrypt.hash(password,12); }
export async function comparePassword(password,hash){ return bcrypt.compare(password,hash); }
export function signToken(payload){ return jwt.sign(payload,secret,{expiresIn:'7d'}); }
export function requireAuth(req,res,next){
  try{
    const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
    if(!token) return res.status(401).json({error:'Authentication required'});
    req.user=jwt.verify(token,secret); next();
  }catch{return res.status(401).json({error:'Invalid or expired token'});}
}
export const requireAdmin=(req,res,next)=> req.user?.role==='admin' ? next() : res.status(403).json({error:'Admin access required'});
export async function ensureAdmin(){
  const email=(process.env.ADMIN_EMAIL||'').toLowerCase().trim(), password=process.env.ADMIN_PASSWORD||'';
  if(!email||!password) return;
  const exists=await query('SELECT id FROM admins WHERE email=$1',[email]);
  if(!exists.rowCount){
    await query('INSERT INTO admins(name,email,password_hash) VALUES($1,$2,$3)', ['Admin',email,await hashPassword(password)]);
    console.log(`Admin created: ${email}`);
  }
}