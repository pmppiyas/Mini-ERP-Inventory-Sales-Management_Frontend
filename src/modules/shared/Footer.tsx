import Logo from '@/modules/shared/Logo';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-2">
          <Logo />

          <p className="text-sm text-muted-foreground">
            A modern inventory and sales management system designed to help
            businesses manage products, sales, and users efficiently.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-4 font-semibold">Product</h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#features" className="hover:text-primary">
                Features
              </a>
            </li>

            <li>
              <a href="#screenshots" className="hover:text-primary">
                Screenshots
              </a>
            </li>

            <li>
              <a href="#technology" className="hover:text-primary">
                Technology
              </a>
            </li>

            <li>
              <a href="/login" className="hover:text-primary">
                Demo Login
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 font-semibold">Resources</h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary">
                Documentation
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-primary">
                API Reference
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-primary">
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>support@minierp.com</li>

            <li>Built with MERN Stack</li>

            <li>TypeScript • React • Node.js</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} MiniERP. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">
              Privacy
            </a>

            <a href="#" className="hover:text-primary">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
