import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GraduationCap, LogIn, LogOut, Menu, Shield, Sparkles, User as UserIcon } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/learning", label: "Learning" },
  { to: "/flashcards", label: "Flashcards" },
  { to: "/exams", label: "Exams" },
  { to: "/live", label: "Live Classes" },
  { to: "/courses", label: "Courses" },
  { to: "/admin", label: "Admin" },
];

import { useAuth } from "@/auth/AuthContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-tight">JLearnHub</div>
            <div className="text-[10px] text-muted-foreground">Nền tảng học tiếng Nhật (JPH)</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems
            .filter((i) => (i.to === "/admin" ? user?.role === "admin" : true))
            .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-foreground",
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:bg-muted/60",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!user ? (
            <>
              <Button asChild variant="outline">
                <Link to="/login"><LogIn className="mr-2 h-4 w-4" />Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register"><GraduationCap className="mr-2 h-4 w-4" />Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <Button asChild variant="outline">
                  <Link to="/admin"><Shield className="mr-2 h-4 w-4" />Admin</Link>
                </Button>
              )}
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <Button variant="ghost" onClick={logout}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
            </>
          )}
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className={cn("md:hidden border-t", open ? "block" : "hidden")}> 
        <div className="container py-2">
          <div className="grid gap-1 py-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm",
                  location.pathname === item.to
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="flex-1" onClick={() => setOpen(false)}>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
                <Button className="flex-1" variant="ghost" onClick={() => { logout(); setOpen(false); }}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
