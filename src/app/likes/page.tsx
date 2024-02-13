import { Heart } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <Button size="icon" variant="ghost">
        <Heart />
      </Button>
    </div>
  );
}
