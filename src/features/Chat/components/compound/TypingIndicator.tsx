/**
 * Reusable TypingIndicator component for showing when someone is typing
 * Displays animated dots to indicate typing activity
 */
export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl chat-bubble-other">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" />
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  );
};
