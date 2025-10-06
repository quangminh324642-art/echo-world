import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("admin@jph.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [search] = useSearchParams();
  const redirectTo = search.get("redirect") || "/";
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.ok) setError(res.error || "Login failed");
    else navigate(redirectTo, { replace: true });
  }

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-3">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
              </div>
              <Button type="submit" className="w-full">Sign in</Button>
            </form>
            <div className="mt-4 text-xs text-muted-foreground">
              Admin demo: admin@jph.local / admin123. Student demo: any email with password "student".
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">You will be redirected to: {redirectTo}</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
