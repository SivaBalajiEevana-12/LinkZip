import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  MousePointerClick,
} from "lucide-react";

import { api,publicApi } from "../services/api";
// import axios from "axios";

interface LinkData {
  _id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  totalClicks: number;
  uniqueClicks: number;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ClickData {
  _id: string;
  linkId: string;
  ip?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  referer?: string;
  createdAt: string;
  updatedAt: string;
}

export default function LinkDetails() {
  const { id } = useParams();

  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const linkResponse = await api.get(`/link/${id}`);
        setLinkData(linkResponse.data.link);

        const clickResponse = await publicApi.get(
          `/c/details/${id}`
        );

        setClicks(clickResponse.data.clicks);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Failed to load link details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !linkData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-destructive">
          {error || "Link not found"}
        </p>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 rounded-md border px-4 py-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const shortUrl = `https://server-iota-two-26.vercel.app/c/${linkData.shortCode}`;

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="mx-auto max-w-6xl px-6 py-10">

        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="mb-8 text-3xl font-bold">
          Link Details
        </h1>

        {/* Link Information */}
        <div className="rounded-xl border bg-background p-6">

          <div className="space-y-5">

            <div>
              <p className="text-sm text-muted-foreground">
                Original URL
              </p>

              <a
                href={linkData.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex items-center gap-2 break-all text-primary hover:underline"
              >
                {linkData.originalUrl}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Short URL
              </p>

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-primary hover:underline"
              >
                {shortUrl}
              </a>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Custom Alias
              </p>

              <p>
                {linkData.customAlias || "Not set"}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-lg border p-5">
                <div className="flex items-center gap-3">
                  <MousePointerClick className="h-5 w-5" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Clicks
                    </p>

                    <p className="text-2xl font-bold">
                      {linkData.totalClicks}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-5">
                <p className="text-sm text-muted-foreground">
                  Unique Clicks
                </p>

                <p className="text-2xl font-bold">
                  {linkData.uniqueClicks}
                </p>
              </div>

            </div>

            <div className="grid gap-4 border-t pt-5 md:grid-cols-3">

              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>

                <p className="font-medium">
                  {linkData.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Created
                </p>

                <p>
                  {new Date(
                    linkData.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Expires
                </p>

                <p>
                  {linkData.expiresAt
                    ? new Date(
                        linkData.expiresAt
                      ).toLocaleString()
                    : "Never"}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Click Details */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Click Details
          </h2>

          {clicks.length === 0 ? (
            <div className="rounded-xl border bg-background p-6 text-center text-muted-foreground">
              No clicks yet.
            </div>
          ) : (
            <div className="space-y-4">

              {clicks.map((click, index) => (
                <div
                  key={click._id}
                  className="rounded-xl border bg-background p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Click #{clicks.length - index}
                    </h3>

                    <span className="text-sm text-muted-foreground">
                      {new Date(
                        click.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <p className="text-sm text-muted-foreground">
                        IP Address
                      </p>
                      <p>{click.ip || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Country
                      </p>
                      <p>{click.country || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Device
                      </p>
                      <p>{click.device || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Browser
                      </p>
                      <p>{click.browser || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Operating System
                      </p>
                      <p>{click.os || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Referer
                      </p>
                      <p className="break-all">
                        {click.referer || "Direct"}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        User Agent
                      </p>

                      <p className="break-all text-sm">
                        {click.userAgent || "Unknown"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Clicked At
                      </p>

                      <p>
                        {new Date(
                          click.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Updated At
                      </p>

                      <p>
                        {new Date(
                          click.updatedAt
                        ).toLocaleString()}
                      </p>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

      </main>
    </div>
  );
}