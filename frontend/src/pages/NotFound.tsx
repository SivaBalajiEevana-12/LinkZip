import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="text-center">
        <Link2 className="mx-auto mb-4 h-12 w-12" />

        <h1 className="text-7xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page not found
        </h2>

        <p className="mt-2 text-muted-foreground">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-primary px-5 py-2 font-medium text-primary-foreground"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}