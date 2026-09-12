import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ExternalLink, Copy, Trash2 } from "lucide-react";

import { api } from "../services/api";

interface LinkData {
  _id: string;
  originalUrl: string;
  shortCode: string;
  totalClicks: number;
  uniqueClicks: number;
  isActive: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLinks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/link");

      setLinks(response.data.links);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch links"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const copyLink = (shortCode: string) => {
    navigator.clipboard.writeText(
      `https://server-iota-two-26.vercel.app/c/${shortCode}`
    );
  };

  const deleteLink = async (id: string) => {
    try {
      await api.delete(`/link/${id}`);

      setLinks((prev) =>
        prev.filter((link) => link._id !== id)
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to delete link"
      );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="mx-auto max-w-6xl px-6 py-10">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Links</h1>
            <p className="mt-1 text-muted-foreground">
              Manage all your shortened URLs.
            </p>
          </div>

          <Link
            to="/create"
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            Create Link
          </Link>
        </div>

        {loading && (
          <p className="text-muted-foreground">
            Loading links...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-destructive">
            {error}
          </p>
        )}

        {!loading && links.length === 0 && (
          <div className="rounded-xl border bg-background p-10 text-center">
            <h2 className="text-xl font-semibold">
              No links yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              Create your first shortened link.
            </p>

            <Link
              to="/create"
              className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Create Link
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {links.map((item) => {
            const shortUrl =
              `https://server-iota-two-26.vercel.app/c/${item.shortCode}`;

            return (
              <div
                key={item._id}
                className="rounded-xl border bg-background p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div className="min-w-0">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {shortUrl}
                    </a>

                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {item.originalUrl}
                    </p>

                    <div className="mt-3 flex gap-5 text-sm text-muted-foreground">
                      <span>
                        Clicks: {item.totalClicks}
                      </span>

                      <span>
                        Unique: {item.uniqueClicks}
                      </span>

                      <span>
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyLink(item.shortCode)}
                      className="rounded-md border p-2 hover:bg-muted"
                      title="Copy"
                    >
                      <Copy className="h-4 w-4" />
                    </button>

                    <Link
                      to={`/link/${item._id}`}
                      className="rounded-md border p-2 hover:bg-muted"
                      title="Details"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() => deleteLink(item._id)}
                      className="rounded-md border p-2 text-destructive hover:bg-muted"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}