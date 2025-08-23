import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Smile } from 'lucide-react';
import { useChatContext } from './ChatContext';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showEmojiPicker?: boolean;
}

// Common emojis for quick access
const COMMON_EMOJIS = [
  '😀',
  '😂',
  '😍',
  '🥰',
  '😊',
  '😎',
  '🤔',
  '😢',
  '😭',
  '😡',
  '🤯',
  '😴',
  '🤗',
  '🙄',
  '😬',
  '🤐',
  '👍',
  '👎',
  '👌',
  '✌️',
  '🤞',
  '👏',
  '🙌',
  '🤝',
  '❤️',
  '💕',
  '💯',
  '🔥',
  '⭐',
  '✨',
  '🎉',
  '🎊',
];

/**
 * Reusable MessageInput component for sending messages
 * Includes emoji picker functionality and clean input interface
 */
export const MessageInput = ({
  value: propValue,
  onChange: propOnChange,
  onSend: propOnSend,
  placeholder = 'Type a message...',
  disabled = false,
  showEmojiPicker = true,
}: MessageInputProps) => {
  // Get context values for compound component usage
  const context = useChatContext();
  const contextContact = context?.contact;
  const contextOnSend = context?.onSendMessage;

  // Internal state for compound component usage
  const [internalValue, setInternalValue] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  // Use props if provided, otherwise use internal state (compound component usage)
  const value = propValue !== undefined ? propValue : internalValue;
  const onChange = propOnChange || setInternalValue;
  const onSend = propOnSend || contextOnSend;

  // Generate placeholder based on context if not provided
  const finalPlaceholder = contextContact
    ? `Message ${contextContact.name}...`
    : placeholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled && onSend) {
      onSend(value.trim());
      // Clear internal value if using compound component
      if (propValue === undefined) {
        setInternalValue('');
      }
    }
  };

  const handleEmojiClick = (emoji: string) => {
    onChange(value + emoji);
    setShowEmojis(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojis(!showEmojis);
  };

  return (
    <div className="p-4 ">
      {/* Emoji Picker */}
      {showEmojis && showEmojiPicker && (
        <div className="mb-3 p-3 bg-background border border-border rounded-lg">
          <div className="grid grid-cols-8 gap-2">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmojiClick(emoji)}
                className="p-2 hover:bg-accent rounded-md transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={finalPlaceholder}
            disabled={disabled}
            className={cn(
              'rounded-full bg-primary-foreground',
              showEmojiPicker ? 'pr-10' : ''
            )}
          />
          {showEmojiPicker && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleEmojiPicker}
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={!value.trim() || disabled}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
