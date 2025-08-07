require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

// In-memory user store — hash regenerated for “Password123!”
const users = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@example.com',
    // Generated via bcrypt.hashSync('Password123!', 12)
    passwordHash: '$2b$12$nsoGk/5bwDOCOWi7aRSifeSUHyjZSQabDsOU49F.QMPqB86rneCBq'
  }
];

app.post('/api/login', async (req, res) => {
  console.log('→ Login payload:', req.body);
  const { user, pass } = req.body;

  const account = users.find(u => u.username === user || u.email === user);
  console.log('→ Account found:', account);

  if (!account) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password' });
  }

  const match = await bcrypt.compare(pass, account.passwordHash);
  console.log('→ bcrypt.compare result:', match);

  if (!match) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: account.id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ success: true, token, message: 'Logged in successfully!' });
});

app.get('/api/protected', (req, res) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) {
    return res
      .status(401)
      .json({ success: false, message: 'Missing Authorization header' });
  }

  try {
    const payload = jwt.verify(auth, JWT_SECRET);
    res.json({ success: true, data: `Hello user ${payload.userId}!` });
  } catch {
    res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
