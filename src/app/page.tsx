import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Shield,
  Zap,
  FolderOpen,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Search,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Records",
    description: "Create, organize, and manage all your records in one centralized location with powerful search.",
  },
  {
    icon: FolderOpen,
    title: "Categories",
    description: "Organize records into custom categories with colors and icons for easy identification.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find any record instantly with powerful search and filtering capabilities.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with encrypted data storage and secure authentication.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js 16 for optimal performance with server-side rendering.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track your productivity with detailed dashboards and insights about your records.",
  },
];

const benefits = [
  "Full CRUD operations with validation",
  "Responsive design for all devices",
  "Real-time updates and notifications",
  "Advanced search and filtering",
  "Priority and status tracking",
  "Due date reminders",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground shadow-sm">
              <FileText className="h-4 w-4" />
              <span>Smart Record Management</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Manage Your Records{" "}
              <span className="underline decoration-2 underline-offset-4">
                Smarter
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              A clean, secure way to organize and track your important records. 
              Built for simplicity and productivity.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-8 py-6 text-base font-semibold rounded-xl border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Features</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Powerful features to help you manage records efficiently and make data-driven decisions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-black group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Why RecordHub</span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Built for Productivity
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                RecordHub is designed to streamline your workflow and help you stay
                organized. With intuitive interfaces and powerful features, managing
                records has never been easier.
              </p>
              <ul className="space-y-5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-muted-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-muted rounded-3xl blur-2xl opacity-60" />
              <div className="relative aspect-square rounded-3xl bg-black p-10 flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <FileText className="h-12 w-12" />
                  </div>
                  <p className="text-2xl font-bold mb-2">Dashboard Preview</p>
                  <p className="text-white/70">Sign in to see your records</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Start organizing your records today with a simple, secure solution.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2 bg-white text-black hover:bg-gray-100 px-10 py-6 text-base font-semibold rounded-xl shadow-xl transition-all hover:scale-105">
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
