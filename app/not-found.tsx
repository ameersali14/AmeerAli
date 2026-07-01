import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 flex items-center">
      <div className="container-custom">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-8xl font-serif font-bold text-healthcare-200 mb-4">404</div>
          <h1 className="heading-lg text-neutral-900 mb-4">Page Not Found</h1>
          <p className="text-body mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-healthcare-200 text-healthcare-700 hover:bg-healthcare-50 rounded-full">
              <Link href="/contact">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
