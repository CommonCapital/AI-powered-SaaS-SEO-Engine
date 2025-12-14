'use client';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import React, { useEffect, useRef, useState } from 'react'
import {useChat} from '@ai-sdk/react';
import { Loader2, MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  seoReportId: string
  isExpanded: boolean
  onClose: () => void
}

const AIChat = ({seoReportId, isExpanded, onClose}: Props) => {
  const [input, setInput] = useState("");
  const {messages, sendMessage, status} = useChat({
    id: seoReportId
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({text: input, metadata: {seoReportId}});
      setInput("");
    }
  }
  
  const isTyping = status === 'submitted';
  
  return (
    <>
      {/* Backdrop overlay */}
      {isExpanded && (
        <div 
          className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300'
          onClick={onClose}
        />
      )}
      
      {/* Chat window */}
      <div 
        className={cn(
          'fixed bottom-6 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300',
          isExpanded ? 'w-[90vw] sm:w-[500px] h-[90vh] sm:h-[600px] opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-95 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-3xl'>
          <div className='flex items-center gap-3'>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className='font-semibold text-base'>
                AI SEO Assistant
              </h3>
              <div className='flex items-center gap-2'>
                <div className={cn(
                  'w-2 h-2 rounded-full', 
                  isTyping ? "bg-yellow-300 animate-pulse" : "bg-green-300"
                )}>
                </div>
                <p className='text-xs text-indigo-100'>
                  {isTyping ? "Thinking..." : "Online"}
                </p>
              </div>
            </div>
          </div>
          
          <div className='flex items-center gap-2'>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className='h-8 w-8 rounded-full hover:bg-white/20 text-white'
            >
              <Minimize2 className='h-4 w-4' />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className='h-8 w-8 rounded-full hover:bg-white/20 text-white'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Messages area */}
        <div ref={chatRef} className='flex-1 overflow-y-auto p-6 space-y-4'>
          {messages.length === 0 && (
            <div className='text-center text-gray-500 text-sm py-8'>
              <div className='mb-4'>
                <MessageCircle className='h-12 w-12 text-indigo-300 mx-auto mb-2' />
              </div>
              <p className='font-medium text-gray-700 mb-1'>
                Welcome to AI SEO Assistant!
              </p>
              <p className='text-xs text-gray-500'>
                Ask me anything about your SEO report
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={cn(
              'flex', 
              message.role === 'user' ? "justify-end" : "justify-start"
            )}>
              <div className={cn(
                "max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm",
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md'
                  : "bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-md"
              )}>
                {message.parts.map((part, index) => {
                  if (part.type === 'tool-web_search') {
                    switch (part.state) {
                      case 'input-streaming':
                      case 'input-available':
                        return (
                          <div
                            key={`${message.id}-${index}`}
                            className='flex items-center gap-2 text-sm text-gray-600'
                          >
                            <Loader2 className='w-4 h-4 animate-spin' />
                            <span>Searching the web...</span>
                          </div>
                        );
                      case 'output-available':
                        return (
                          <div
                            key={`${message.id}-${index}`}
                            className='text-sm text-green-600 font-medium'
                          >
                            ✓ Finished web search
                          </div>
                        );
                      case 'output-error':
                        return (
                          <div 
                            key={`${message.id}-${index}`}
                            className='text-sm text-red-600'
                          >
                            ✗ Web search failed: {part.errorText}
                          </div>
                        )
                    }
                  }

                  if (part.type === 'text') {
                    return (
                      <div key={`${message.id}-${index}`} className="leading-relaxed">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({children}) => (
                              <p className='mb-3 last:mb-0'>{children}</p>
                            ),
                            ul: ({children}) => (
                              <ul className='mb-3 pl-4 space-y-1 list-disc'>
                                {children}
                              </ul>
                            ),
                            ol: ({children}) => (
                              <ol className='mb-3 pl-4 space-y-1 list-decimal'>{children}</ol>
                            ),
                            li: ({children}) => (
                              <li className='text-sm'>{children}</li>
                            ),
                            a: ({children, href}) => (
                              <a 
                                href={href}
                                className='text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-medium'
                                target="_blank"
                                rel="noopener noreferrer"
                              >{children}</a>
                            ),
                            h1: ({children}) => (
                              <h1 className='text-lg font-semibold mb-2 mt-4 first:mt-0'>
                                {children}
                              </h1>
                            ),
                            h2: ({children}) => (
                              <h2 className='text-base font-semibold mb-2 mt-3 first:mt-0'>
                                {children}
                              </h2>
                            ),
                            h3: ({children}) => (
                              <h3 className='text-sm font-semibold mb-1 mt-2 first:mt-0'>{children}</h3>
                            ),
                            strong: ({children}) => (
                              <strong className='font-semibold'>{children}</strong>
                            ),
                            em: ({children}) => (
                              <em className='italic'>{children}</em>
                            ),
                            code: ({children}) => (
                              <code className='bg-gray-100 px-1 py-0.5 rounded text-xs font-mono'>
                                {children}
                              </code>
                            ),
                            pre: ({children}) => (
                              <pre className='bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-3'>
                                {children}
                              </pre>
                            ),
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className='flex justify-start'>
              <div className='bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]'>
                <div className='flex items-center gap-2'>
                  <Loader2 className='w-4 h-4 animate-spin text-indigo-600'/>
                  <span className='text-sm text-gray-600'>
                    AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className='p-5 border-t border-gray-100 bg-gray-50/50'>
          <div className='flex gap-3'>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your question..."
              className='flex-1 h-11 bg-white border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              disabled={isTyping}
            />
            <Button 
              onClick={handleSubmit}
              disabled={!input.trim() || isTyping}
              className='h-11 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-sm disabled:opacity-50'
            >
              <Send className='w-4 h-4'/>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AIChat