import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  trackingNumber?: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your logistics assistant. I can help you track packages, check delivery status, or answer questions about your shipments. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        trackingNumber: botResponse.trackingNumber,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("track") || input.includes("where is") || input.includes("package")) {
      return {
        text: "I can help you track your package! Your shipment SH-2024-001 is currently in transit from New York to Los Angeles. It's 75% complete and expected to arrive in 2 hours. Would you like me to provide more details about this shipment?",
        trackingNumber: "SH-2024-001"
      };
    }
    
    if (input.includes("delivery") || input.includes("when") || input.includes("arrive")) {
      return {
        text: "Based on your current shipments, here are the delivery estimates:\n• SH-2024-001: 2 hours (Los Angeles)\n• SH-2024-003: 4 hours late (Denver)\n• SH-2024-004: Not started (Atlanta)\n\nWould you like to reschedule any of these deliveries?",
      };
    }
    
    if (input.includes("reschedule") || input.includes("cancel")) {
      return {
        text: "I can help you reschedule or cancel your delivery. Please provide your tracking number and your preferred new delivery date. I'll update your shipment details and send you a confirmation.",
      };
    }
    
    if (input.includes("status") || input.includes("update")) {
      return {
        text: "Here's your current shipment status:\n• 1 In Transit (75% complete)\n• 1 Delivered\n• 1 Delayed (4 hours)\n• 1 Pending\n\nWould you like detailed information about any specific shipment?",
      };
    }

    return {
      text: "I understand you're asking about logistics services. I can help with:\n• Package tracking\n• Delivery status updates\n• Rescheduling deliveries\n• Shipment information\n• General logistics questions\n\nWhat specific information do you need?",
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl border-card-border bg-card z-[9999] flex flex-col">
          <CardHeader className="pb-3 border-b border-card-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">AI Assistant</CardTitle>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-status-delivered"></div>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted text-card-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.text}</div>
                      {message.trackingNumber && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {message.trackingNumber}
                        </Badge>
                      )}
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-card-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your shipments..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  autoFocus
                  className="pointer-events-auto focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                AI assistant powered by LogiTrack Pro
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;