'use client';
import { SeoReport } from '@/lib/seo-schema'
import React, { useRef, useState } from 'react'
import {useChat} from '@ai-sdk/react';
const AIChat = ({seoReportId}:  string) => {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const {messages, sendMessage, status} = useChat({
    id: seoReportId
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const isTyping = status === 'submitted';
  return (
    <>
    {isExpanded && (
      <div className='fixed bottom-20 right-6 z-50 w-[500px] h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden'>

        <div className='flex items-center justify-between p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-3xl'>

          <div className='flex items-center gap-3'>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">



            </div>
          </div>

        </div>

      </div>
    )}
    </>
  )
}

export default AIChat