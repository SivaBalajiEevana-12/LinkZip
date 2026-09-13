import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirect() {
  const { shortCode } = useParams();

  useEffect(() => {
    if (shortCode) {
      window.location.href = ` https://linkzip-2.onrender.com/c/${shortCode}`;
    }
  }, [shortCode]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">
        Redirecting...
      </p>
    </div>
  );
}