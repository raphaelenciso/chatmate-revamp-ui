import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatContext } from './ChatContext';
import { cn } from '@/lib/utils';
import { IoSend } from 'react-icons/io5';

interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string, contentType?: 'text' | 'image') => void;
  placeholder?: string;
  disabled?: boolean;
  showEmojiPicker?: boolean;
}

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
  const contextContact = context?.userContact;
  const contextOnSend = context?.onSendMessage;

  // Internal state for compound component usage
  const [internalValue, setInternalValue] = useState('');

  // Use props if provided, otherwise use internal state (compound component usage)
  const value = propValue === undefined ? internalValue : propValue;
  const onChange = propOnChange || setInternalValue;
  const onSend = propOnSend || contextOnSend;

  // Generate placeholder based on context if not provided
  const finalPlaceholder = contextContact
    ? `Message ${contextContact.username}...`
    : placeholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled && onSend) {
      onSend(value.trim(), 'text');
      // Clear internal value if using compound component
      if (propValue === undefined) {
        setInternalValue('');
      }
    }
  };

  return (
    <div className="px-3 py-2 bg-white absolute bottom-0 w-full h-12  flex items-center justify-center z-10 ">
      {/* Emoji Picker */}
      {/* {showEmojis && showEmojiPicker && (
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
      )} */}

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center space-x-2 w-full"
      >
        <div className="w-full relative">
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
          {/* {showEmojiPicker && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleEmojiPicker}
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          )} */}
        </div>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={!value.trim() || disabled}
          className="!p-0"
        >
          <IoSend className="size-5 text-primary" />
        </Button>
      </form>
    </div>
  );
};
