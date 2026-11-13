'use client';

import { useState, type FormEvent } from 'react';
import { authClient } from '@/lib/auth/client';

export default function SignInPage() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);

    const { error: authError } = await authClient.signIn.email({
      email: String(form.get('email')),
      password: String(form.get('password')),
    });

    setPending(false);
    if (authError) {
      setError(authError.message || 'Identifiants invalides.');
      return;
    }
    window.location.assign('/admin');
  }

  return (
    <main className="section-pad">
      <div className="container" style={{ maxWidth: 420 }}>
        <h1>Connexion</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input name="email" type="email" placeholder="E-mail" autoComplete="email" required />
          <input name="password" type="password" placeholder="Mot de passe" autoComplete="current-password" required />
          {error ? <p role="alert">{error}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={pending}>Se connecter</button>
        </form>
      </div>
    </main>
  );
}
