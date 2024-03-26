'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Link } from '@mui/material';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
      } else {
        if (router) {
          alert('Login Success!')
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className={`${styles.area} relative min-h-screen flex justify-center items-center overflow-hidden`}>
      <div className="absolute inset-0 flex justify-center items-start bg-black bg-opacity-40">
        <div className="bg-white p-8 rounded shadow-md w-80 relative z-10 mt-20">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center h-12 border border-green-500 rounded-full bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:bg-green-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/api/auth/register">
              <a className="text-blue-500 underline">Don't have an account?</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.circles}>
        <ul>
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
