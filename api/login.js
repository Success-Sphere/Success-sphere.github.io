import bcrypt from 'bcryptjs';
import { getDB } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing' });

  const db = await getDB();
  const [rows] = await db.execute(
    'SELECT full_name, pass_hash FROM users WHERE email = ?',
    [email.toLowerCase()]
  );
  db.end();

  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.pass_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = Buffer.from(JSON.stringify({ email, t: Date.now() })).toString('base64url');
  res.setHeader('Set-Cookie', `ssphere=${token}; HttpOnly; Path=/; SameSite=Lax; Secure=${req.headers['x-forwarded-proto']==='https'}`);
  return res.json({ ok: true, fullName: user.full_name, email });
}
