
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AuthMode = "signin" | "signup";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email for verification.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-beige py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-warm-brown mb-6 text-center">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-warm-brown hover:bg-warm-brown/90"
              disabled={loading}
            >
              {loading ? "Processing..." : mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            {mode === "signin" ? (
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  className="text-warm-brown hover:underline"
                  onClick={() => setMode("signup")}
                  type="button"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  className="text-warm-brown hover:underline"
                  onClick={() => setMode("signin")}
                  type="button"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
