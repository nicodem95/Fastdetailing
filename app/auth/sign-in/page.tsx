'use client';

import { useState, type FormEvent } from 'react';
import { authClient } from '@/lib/auth/client';

export default function SignInPage() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    const { error: authError } = mode === 'sign-in'
      ? await authClient.signIn.email({ email, password })
      : await authClient.signUp.email({ email, password, name: email });

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
        <h1>{mode === 'sign-in' ? 'Connexion' : 'Créer un compte'}</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input name="email" type="email" placeholder="E-mail" autoComplete="email" required />
          <input name="password" type="password" placeholder="Mot de passe" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} minLength={8} required />
          {error ? <p role="alert">{error}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={pending}>
            {mode === 'sign-in' ? 'Se connecter' : 'Créer le compte'}
          </button>
        </form>
        <p>
          <button type="button" onClick={() => { setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'); setError(''); }}>
            {mode === 'sign-in' ? 'Première connexion : créer un compte' : 'J’ai déjà un compte'}
          </button>
        </p>
      </div>
    </main>
  );
}
