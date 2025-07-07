import bcrypt from 'bcryptjs';
import { getDB } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { fullName, email, phone, password } = req.body || {};
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const passHash = await bcrypt.hash(password, 10);
  const db = await getDB();

  try {
    await db.execute(
      'INSERT INTO users (full_name, email, phone, pass_hash) VALUES (?,?,?,?)',
      [fullName, email.toLowerCase(), phone || '', passHash]
    );
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already used' });
    }
    console.error(err);
    return res.status(500).json({ error: 'DB error' });
  } finally {
    db.end();
  }

  const token = Buffer.from(JSON.stringify({ email, t: Date.now() })).toString('base64url');
  res.setHeader('Set-Cookie', `ssphere=${token}; HttpOnly; Path=/; SameSite=Lax; Secure=${req.headers['x-forwarded-proto']==='https'}`);
  return res.json({ ok: true, fullName, email });
}
