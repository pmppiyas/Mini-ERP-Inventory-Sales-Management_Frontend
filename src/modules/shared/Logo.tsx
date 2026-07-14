import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0 py-1">
      <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-xs">X</span>
      </div>
      <span className="font-bold text-foreground text-base">InventoryX</span>
    </Link>
  );
};

export default Logo;
