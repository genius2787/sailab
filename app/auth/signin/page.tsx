"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GL } from "@/components/gl";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in clicked", { email, password });
    setError("");
    setLoading(true);

    try {
      console.log("Calling signIn...");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        setError("Invalid email or password");
      } else {
        console.log("Login success, redirecting...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Exception during login:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-48 pb-20">
      <div className="absolute inset-0 z-0">
        <GL hovering={false} />
      </div>
      
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center">
        <div className="w-full max-w-md mb-16">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-mono">Member Login</CardTitle>
            <CardDescription className="font-mono">
              Access exclusive dashboard for paid members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="member@saillab.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-mono"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 font-mono">{error}</p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="submit"
                  className="font-mono"
                  disabled={loading}
                  onClick={(e) => {
                    console.log("Button clicked!");
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="font-mono text-foreground/40 border-foreground/20 cursor-not-allowed"
                  disabled
                >
                  Sign Up
                </Button>
              </div>

              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-xs font-mono text-yellow-600 dark:text-yellow-500 text-center">
                  ⚠️ Invitation-only beta testing<br />
                  New registrations are currently closed
                </p>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs font-mono text-foreground/60 text-center">
                  Need access?<br />
                  Contact: <a href="mailto:wasedajoe@gmail.com" className="text-primary hover:underline">wasedajoe@gmail.com</a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>

        {/* Membership Plans */}
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl font-mono font-bold text-center mb-12">Membership Plans</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:border-primary/40 hover-lift transition-all">
              <CardHeader className="text-center">
                <div className="mb-2">
                  <span className="text-3xl font-mono font-bold text-primary">$99</span>
                  <span className="text-sm font-mono text-foreground/60">/month</span>
                </div>
                <CardTitle className="text-xl font-mono">Starter</CardTitle>
                <CardDescription className="font-mono">Perfect for individual investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>3 stock analyses daily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Custom stock selection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Basic AI insights</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Email support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tier 2 */}
            <Card className="bg-card/80 backdrop-blur-sm border-primary/40 hover:border-primary/60 hover-lift transition-all relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-background px-4 py-1 rounded-full text-xs font-mono font-bold">POPULAR</span>
              </div>
              <CardHeader className="text-center">
                <div className="mb-2">
                  <span className="text-3xl font-mono font-bold text-primary">$249</span>
                  <span className="text-sm font-mono text-foreground/60">/month</span>
                </div>
                <CardTitle className="text-xl font-mono">Professional</CardTitle>
                <CardDescription className="font-mono">For serious traders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>10 stock analyses daily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Advanced AI multi-agent analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Real-time market alerts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Portfolio optimization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Priority support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tier 3 */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:border-primary/40 hover-lift transition-all">
              <CardHeader className="text-center">
                <div className="mb-2">
                  <span className="text-3xl font-mono font-bold text-primary">$599</span>
                  <span className="text-sm font-mono text-foreground/60">/month</span>
                </div>
                <CardTitle className="text-xl font-mono">Enterprise</CardTitle>
                <CardDescription className="font-mono">Institutional grade access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>30 stock analyses daily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Full LLM agent suite access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Custom strategy development</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>API access for integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>24/7 premium support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm font-mono text-foreground/60 mt-8">
            Contact <a href="mailto:wasedajoe@gmail.com" className="text-primary hover:underline">wasedajoe@gmail.com</a> to subscribe
          </p>
        </div>
      </div>
    </div>
  );
}

