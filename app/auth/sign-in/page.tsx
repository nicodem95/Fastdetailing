'use client';

import { useState, type FormEvent } from 'react';
import { authClient } from '@/lib/auth/client';
import '../../admin/admin.css';

export default function SignInPage() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);

    try {
      const { error: authError } = await authClient.signIn.email({
        email: String(form.get('email')),
        password: String(form.get('password')),
      });
      if (authError) throw authError;
    } catch {
      setPending(false);
      setError('E-mail ou mot de passe incorrect.');
      return;
    }

    window.location.assign('/admin');
  }

  return (
    <main className="section-pad">
      <div className="admin-login">
        <h1>Connexion</h1>
        <form className="admin-form" onSubmit={onSubmit}>
          <input name="email" type="email" placeholder="E-mail" autoComplete="email" required />
          <input name="password" type="password" placeholder="Mot de passe" autoComplete="current-password" required />
          {error ? <p className="admin-alert" role="alert">{error}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={pending}>Se connecter</button>
        </form>
      </div>
    </main>
  );
}
