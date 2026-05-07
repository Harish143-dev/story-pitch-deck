type P = { className?: string };

export function InstagramIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Instagram">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1" fill="#fff" />
    </svg>
  );
}

export function MetaIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-label="Meta">
      <defs>
        <linearGradient id="meta-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0064E0" />
          <stop offset="50%" stopColor="#0082FB" />
          <stop offset="100%" stopColor="#A35AF1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#meta-grad)"
        d="M6.6 4.2C3.7 4.2 1.5 7.6 1.5 12s2.2 7.8 5.1 7.8c2.1 0 3.6-1 6.4-5.6.7-1.2 1.5-2.5 2.2-3.7l-.6-.9C13.7 7.5 12.9 6.4 12 5.4 10.5 3.8 9.2 3 7.5 3 7.2 3 6.9 3.4 6.6 4.2zm21.7 0c-1.7 0-3 .8-4.5 2.4-.9 1-1.7 2.1-2.6 3.7-2 3.2-3.4 5.4-4.4 6.6-1.4 1.6-2.2 2.1-3.5 2.1-1.4 0-2.4-1.6-2.4-4.4 0-2.5.8-5 2.1-5.4 1.6-.5 3.4 1.2 5.7 4.6.7-1.2 1.5-2.5 2.2-3.7-2.4-3.6-4.6-5-7.1-5-3.7 0-6.6 3.7-6.6 8.5 0 4.6 2.7 8.4 6.5 8.4 2.5 0 4.4-1.1 6.7-4.7 1.5-2.3 2.5-4 3.6-5.9 1.6-2.7 2.5-3.5 3.6-3.5 1.3 0 2.2 1.5 2.2 4.5 0 2.6-.7 4.7-2.1 5.1-1.6.4-3.4-1.2-5.7-4.6-.7 1.2-1.5 2.5-2.2 3.7 2.4 3.6 4.6 5 7.2 5 3.7 0 6.6-3.7 6.6-8.5 0-4.6-2.7-8.4-6.5-8.4z"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Facebook">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M14.5 12.5h-2v7h-3v-7H8v-2.5h1.5V8.3c0-1.7 1-2.8 2.9-2.8h2v2.5h-1.4c-.6 0-.7.3-.7.7V10h2.2l-.3 2.5z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="WhatsApp">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#fff"
        d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.9-.4-1.7-.9-2.5-1.7-.6-.6-1.1-1.3-1.5-2-.1-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.5 7.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"
      />
    </svg>
  );
}

export function YouTubeIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="YouTube">
      <rect x="1" y="5" width="22" height="14" rx="3" fill="#FF0000" />
      <path d="M10 9l5 3-5 3z" fill="#fff" />
    </svg>
  );
}

export function GoogleIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
