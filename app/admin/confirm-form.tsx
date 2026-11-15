'use client';

import { useId, useRef, type FormEvent, type ReactNode } from 'react';

export function ConfirmForm({
  action,
  message,
  title = 'Confirmer cette action',
  confirmLabel = 'Confirmer',
  destructive = false,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  message: string;
  title?: string;
  confirmLabel?: string;
  destructive?: boolean;
  children: ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmedRef = useRef(false);
  const id = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (confirmedRef.current) {
      confirmedRef.current = false;
      return;
    }

    event.preventDefault();
    dialogRef.current?.showModal();
  }

  function confirmAction() {
    const form = formRef.current;
    if (!form) return;

    dialogRef.current?.close();
    confirmedRef.current = true;
    form.requestSubmit();
  }

  return (
    <>
      <form ref={formRef} action={action} onSubmit={handleSubmit}>
        {children}
      </form>
      <dialog
        ref={dialogRef}
        className="admin-confirm-dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-message`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="admin-confirm-content">
          <span className="admin-confirm-mark" aria-hidden="true">!</span>
          <h2 id={`${id}-title`}>{title}</h2>
          <p id={`${id}-message`}>{message}</p>
          <div className="admin-confirm-actions">
            <button className="admin-small-btn admin-confirm-cancel" type="button" onClick={() => dialogRef.current?.close()}>
              Annuler
            </button>
            <button
              className={`admin-small-btn admin-confirm-submit${destructive ? ' is-danger' : ''}`}
              type="button"
              onClick={confirmAction}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
