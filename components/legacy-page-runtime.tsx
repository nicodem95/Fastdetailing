'use client';

import { useEffect } from 'react';

export function LegacyPageRuntime({ bodyClass, externalScripts, inlineScripts }: { bodyClass: string; externalScripts: string[]; inlineScripts: string[] }) {
  useEffect(() => {
    const classes = bodyClass.split(/\s+/).filter(Boolean);
    document.body.classList.add(...classes);

    const inlineScriptElements = inlineScripts.map((scriptContent) => {
      const script = document.createElement('script');
      script.textContent = scriptContent;
      document.body.append(script);
      return script;
    });

    const scripts = externalScripts.map((source) => {
      const script = document.createElement('script');
      script.src = source;
      script.async = false;
      document.body.append(script);
      return script;
    });

    return () => {
      document.body.classList.remove(...classes);
      scripts.forEach((script) => script.remove());
      inlineScriptElements.forEach((script) => script.remove());
    };
  }, [bodyClass, inlineScripts]);

  return null;
}