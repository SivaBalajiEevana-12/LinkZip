import { Link } from "react-router-dom";
import { Link2, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground">
            <Link2 className="h-4 w-4" />
            Simple. Fast. Powerful.
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Make your links
            <span className="block text-primary">short & powerful.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Create short, memorable URLs and track your clicks with simple
            and powerful analytics.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/login"
              className="rounded-md border px-6 py-3 font-medium hover:bg-muted"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <Feature
            icon={<Link2 />}
            title="Shorten URLs"
            description="Convert long URLs into clean and shareable short links."
          />

          <Feature
            icon={<BarChart3 />}
            title="Track Analytics"
            description="Monitor total clicks and unique visitors for your links."
          />

          <Feature
            icon={<ShieldCheck />}
            title="Secure"
            description="Keep your links and account protected with secure authentication."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Ready to shorten your first link?
          </h2>

          <p className="mt-3 text-muted-foreground">
            Create your free account and start sharing smarter links.
          </p>

          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}