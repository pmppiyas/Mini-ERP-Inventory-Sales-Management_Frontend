import CTA from '@/modules/home/CTA';
import Features from '@/modules/home/Features';
import Hero from '@/modules/home/Hero';
import Screenshot from '@/modules/home/Screenshot';
import Technology from '@/modules/home/Technology';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Screenshots Section */}
      <Screenshot />

      {/* Technology Section */}
      <Technology />

      {/* Demo CTA Section */}
      <CTA />
    </div>
  );
}
