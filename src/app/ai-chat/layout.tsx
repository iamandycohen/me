import { generatePageMetadata } from "@/lib/metadata-generators";
import data from "@/lib/data";
import { getDisplayName } from "@/lib/data-helpers";

export const metadata = generatePageMetadata(
  "AI Chat",
  `Chat with an AI assistant that has access to detailed information about ${getDisplayName(
    data.contact
  )}'s professional background, projects, and experience via live Model Context Protocol tools.`,
  data.contact,
  {
    keywords: [
      "AI chat",
      "AI assistant",
      getDisplayName(data.contact),
      "professional",
      "experience",
      "MCP",
      "Model Context Protocol",
      "AI tools",
      "proxy mode",
      "native mode", 
      "agents mode",
      "chat implementations",
    ],
  },
  "/ai-chat"
);

export default function AIChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
