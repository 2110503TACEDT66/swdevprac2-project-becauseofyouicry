// serverSideLogin.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
  }

  const { email, password } = req.body;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      return res.status(401).json({ error: result.error });
    }

    // Redirect to the homepage upon successful login
    return res.status(200).json({ redirect: '/' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
