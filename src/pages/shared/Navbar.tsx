import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Sales',
    url: '/sales',
  },
  {
    title: 'Reports',
    url: '/reports',
  },
];

export default function Navbar() {
  const isLoggedIn = true;
  const user = {
    name: 'Admin',
    role: 'Admin',
  };

  return (
    <header className="bg-background">
      <div className="container mx-auto px-5">
        {/* Desktop */}
        <nav className="hidden h-16 lg:flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Mini ERP
          </Link>

          {/* Nav */}
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.url}
                      className="px-4 py-2 rounded-md hover:bg-muted transition"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.name} ({user.role})
                </span>

                <Button variant="outline">Logout</Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>

                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          <Link to="/" className="text-xl font-bold text-primary">
            Mini ERP
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Mini ERP</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4  items-center">
                {navLinks.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className="text-xl rounded-md  hover:bg-muted"
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="flex flex-col gap-4">
                  {isLoggedIn ? (
                    <>
                      <p className="text-xl">{user.name}</p>

                      <Button variant="outline">Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link to="/login">Login</Link>
                      </Button>

                      <Button asChild>
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
