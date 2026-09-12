import {  useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, Link2 } from "lucide-react";

import { api } from "../services/api";

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/link", {
        originalUrl: url,
        customAlias: customAlias || undefined,
        expiresAt: expiresAt || null,
      });

      setShortUrl(response.data.shortUrl);

      setUrl("");
      setCustomAlias("");
      setExpiresAt("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to create link"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="mx-auto max-w-xl px-6 py-10">

        <Link
          to="/dashboard"
          className="mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="rounded-xl border bg-background p-6 shadow-sm">

          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Link2 className="h-6 w-6" />
              <h1 className="text-2xl font-bold">
                Create Short Link
              </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter a URL to create your short link.
            </p>
          </div>

          {!shortUrl ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="text-sm font-medium">
                  Original URL
                </label>

                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Custom Alias
                </label>

                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-link"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Expiration
                </label>

                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Short Link"}
              </button>

            </form>
          ) : (
            <div className="space-y-5">

              <div className="rounded-lg border p-4">
                <p className="mb-2 text-sm text-muted-foreground">
                  Your short link
                </p>

                <p className="break-all font-semibold text-primary">
                  {shortUrl}
                </p>
              </div>

              <button
                onClick={copyLink}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </button>

              <Link
                to="/dashboard"
                className="block w-full rounded-md border px-4 py-2 text-center font-medium"
              >
                View All Links
              </Link>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}