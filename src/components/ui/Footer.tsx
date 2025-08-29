import { getDisplayName } from "@/lib/data-helpers";
import data from "@/lib/data";

const displayName = getDisplayName(data.contact);

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-max py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            {displayName} - Building systems that scale, teams that thrive, and
            developer experiences that delight.
          </p>
          <p className="text-sm text-gray-500">
            AI-native architecture • MCP integration • Enterprise platforms
          </p>
        </div>
      </div>
    </footer>
  );
}
