"use client";

import { useState } from "react";
import ChatModesExplainer, { ChatModesExplainerTrigger } from "./ChatModesExplainer";

/**
 * Small client wrapper component that only handles modal state.
 * This keeps the main page as a server component for better performance.
 */
export default function ChatModesExplainerWrapper() {
  const [showModesExplainer, setShowModesExplainer] = useState(false);

  return (
    <>
      <ChatModesExplainerTrigger onClick={() => setShowModesExplainer(true)} />
      <ChatModesExplainer 
        isOpen={showModesExplainer} 
        onClose={() => setShowModesExplainer(false)} 
      />
    </>
  );
}
