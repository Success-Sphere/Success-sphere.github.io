export default function handler(req, res) {
  const cookie = (req.headers.cookie || '')
    .split('; ')
    .find(c => c.startsWith('ssphere='));
  if (!cookie) return res.status(204).end();

  try {
    const payload = JSON.parse(Buffer.from(cookie.split('=')[1], 'base64url').toString());
    return res.json({ email: payload.email });
  } catch {
    return res.status(204).end();
  }
}
