export default function handler(req, res) {
  res.setHeader('Set-Cookie', 'ssphere=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
  return res.json({ ok: true });
}
