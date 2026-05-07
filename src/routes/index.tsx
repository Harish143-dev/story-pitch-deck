import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roomy's Jewellery — Digital Growth Pitch Deck" },
      { name: "description", content: "A cinematic pitch deck: turning Hyderabad's most overlooked jewellery brand into its most discoverable one." },
      { property: "og:title", content: "Roomy's Jewellery — Pitch Deck" },
      { property: "og:description", content: "Digital growth strategy for Banjara Hills, Hyderabad." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Deck />;
}
