'use client';

import { useEffect } from 'react';

export function LegacyPageRuntime({ bodyClass, inlineScripts }: { bodyClass: string; inlineScripts: string[] }) {
  useEffect(() => {
    const classes = bodyClass.split(/\s+/).filter(Boolean);
    document.body.classList.add(...classes);

    const inlineScriptElements = inlineScripts.map((scriptContent) => {
      const script = document.createElement('script');
      script.textContent = scriptContent;
      document.body.append(script);
      return script;
    });

    return () => {
      document.body.classList.remove(...classes);
      inlineScriptElements.forEach((script) => script.remove());
    };
  }, [bodyClass, inlineScripts]);

  return null;
}