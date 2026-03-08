import { ReactNode } from 'react';
import BottomNav from '@/components/BottomNav';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {title && (
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          </div>
        </header>
      )}
      <main className="max-w-lg mx-auto px-4 py-4 bottom-nav-safe">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
