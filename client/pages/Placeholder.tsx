import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Placeholder() {
  const location = useLocation();
  const path = location.pathname.replace(/\//g, " ").trim() || "Home";
  const title = path
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">
          This page is a placeholder. Tell me which exact content and features you want here
          and I will implement them next. For now it is linked to keep navigation complete.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
