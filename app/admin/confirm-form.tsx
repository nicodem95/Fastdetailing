'use client';

import type { ReactNode } from 'react';

// Form that asks for a confirmation before running its server action.
export function ConfirmForm({ action, message, children }: { action: (formData: FormData) => Promise<void>; message: string; children: ReactNode }) {
  return (
    <form action={action} onSubmit={(event) => { if (!window.confirm(message)) event.preventDefault(); }}>
      {children}
    </form>
  );
}
