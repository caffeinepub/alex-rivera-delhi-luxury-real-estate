export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'delhi-luxury-realestate');

  return (
    <footer className="bg-surface border-t border-gold/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold text-lg">AR</span>
            <span className="text-muted-foreground text-sm">Alex Rivera — Delhi Luxury Real Estate</span>
          </div>
          <div className="text-muted-foreground text-xs text-center">
            &copy; {year} Alex Rivera. All rights reserved.
          </div>
          <div className="text-muted-foreground text-xs">
            Built with{' '}
            <span className="text-crimson">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
