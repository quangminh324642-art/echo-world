import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, GraduationCap, Layers, Library, LineChart, LucideIcon, Shield, Sparkles, Video } from "lucide-react";
import { Link } from "react-router-dom";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
};

const features: Feature[] = [
  {
    title: "Learning Modules",
    description:
      "Hiragana, Katakana, Kanji (N5 → N3), grammar and vocabulary aligned with Dekiru Nihongo.",
    icon: Library,
    to: "/learning",
  },
  {
    title: "Personalized Path",
    description:
      "AI-assisted study plan from your current level to target level, with adaptive SRS.",
    icon: Layers,
    to: "/learning",
  },
  {
    title: "Exam Preparation",
    description:
      "JLPT mock tests with instant scoring, explanations and attempt history.",
    icon: CheckCircle2,
    to: "/exams",
  },
  {
    title: "Live Classes",
    description:
      "Google Meet integration for scheduled live sessions and notifications.",
    icon: Video,
    to: "/live",
  },
  {
    title: "Courses & Enrollment",
    description:
      "Free and paid courses, instructor tools for lessons, quizzes and participants.",
    icon: GraduationCap,
    to: "/courses",
  },
  {
    title: "Administration",
    description:
      "Role-based admin panel to manage users, content, reports and moderation.",
    icon: Shield,
    to: "/admin",
  },
];

export default function Index() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-100px,theme(colors.primary.DEFAULT/.15),transparent_60%)]" />
        <div className="container flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <Badge className="gap-2" variant="secondary">
            <Sparkles className="h-3.5 w-3.5" />
            English: A Web-based Japanese Language Learning Support Platform
          </Badge>
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            Nền tảng học tiếng Nhật trực tuyến hỗ trợ lộ trình và ôn luyện
          </h1>
          <p className="max-w-3xl text-pretty text-muted-foreground md:text-lg">
            JLearnHub (JPH) is an integrated platform for structured Japanese learning
            with Dekiru Nihongo-aligned content, adaptive flashcards, mock exams,
            live classes and progress analytics.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="px-7">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-7">
              <a href="#features">Explore Features</a>
            </Button>
          </div>
          <div className="grid w-full max-w-4xl grid-cols-3 gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground md:text-base">
            <div className="rounded-md bg-muted p-3 text-center">
              Levels: N5 → N3
            </div>
            <div className="rounded-md bg-muted p-3 text-center">SRS Flashcards</div>
            <div className="rounded-md bg-muted p-3 text-center">Live Classes</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16 md:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Main Features</h2>
          <p className="mt-3 text-muted-foreground">
            Designed for Vietnamese learners with structured content and practice tools to reach your JLPT goals.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.description}</p>
                <Button asChild variant="link" className="mt-2 px-0"> 
                  <Link to={f.to}>Learn more →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Actors */}
      <section className="container py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Actors of the System</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Student / Learner</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Learn via courses, flashcards, tests, and live classes. Track progress and follow a personalized path.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Instructor / Mentor</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Create lessons, quizzes and manage participants. Schedule live classes and monitor outcomes.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Administrator</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Manage users, content quality and system reports with role-based access.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Service Provider</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Handle secure payments for courses and subscriptions.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Guest / Visitor</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Browse public information and free resources without signing in.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech & APIs */}
      <section className="container grid gap-6 py-16 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="font-medium">Server</div>
              <p className="text-muted-foreground">Java Spring Boot • MySQL • MongoDB</p>
            </div>
            <div>
              <div className="font-medium">Client</div>
              <p className="text-muted-foreground">ReactJS • HTML5 • CSS3 • JavaScript</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>APIs Provided</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4" />User & Authentication (JWT, OAuth2)</div>
            <div className="flex items-center gap-2"><Library className="h-4 w-4" />Learning Content (lessons, flashcards, quizzes)</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />Exam & Test (mock tests, scoring, history)</div>
            <div className="flex items-center gap-2"><LineChart className="h-4 w-4" />Analytics & Reporting (progress, admin)</div>
            <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" />Payment (subscriptions)</div>
          </CardContent>
        </Card>
      </section>

      {/* Security & CTA */}
      <section className="container py-16">
        <Card>
          <CardHeader>
            <CardTitle>Security Features</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <div>• Role-based authentication and authorization (JWT)</div>
            <div>• Encrypted passwords with BCrypt</div>
            <div>• Secure online payment gateway integration</div>
          </CardContent>
        </Card>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border bg-gradient-to-br from-primary/10 via-transparent to-transparent p-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold">Ready to start your JLPT journey?</h3>
            <p className="text-muted-foreground">Register now or explore courses to begin.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
