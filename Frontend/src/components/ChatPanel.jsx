import { BotIcon, BotMessageSquareIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import PromptInput from './PromptInput'

const ChatPanel = ({messages = [], onSend, loading}) => {

    const bottomRef = useRef(null)

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "auto"})
    },[messages, loading])

  return (
    <div className="flex flex-col h-full bg-[#111113] text-zinc-100">
         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar">
            {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                   <p className="text-zinc-500 text-sm text-center">Ask AI to modify your website</p> 
                </div>
            )}

            {messages.map((msg, i)=>(
                <div key={i}>
                    <div className="flex gap-2.5 items-start">
                        <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-zinc-800">
                            {msg.role === "user" ? (
                                <UserIcon size={14} className='text-zinc-300'/>
                            ) : (
                                <BotMessageSquareIcon size={14} className="text-zinc-300"/>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                             <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">
                                {msg.role === "user" ? "You" : "AI"}
                            </p>
                            <p className="text-[13px] text-zinc-200 leading-relaxed tracking-wider whitespace-pre-wrap wrap-break-word">
                                {msg.content.split("- `/").map((text, i)=>(
                                    <span key={i} className="block mt-3">
                                        <span className={i === 0 ? "hidden" : ""}>- `/</span>
                                        {text}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {loading && (
                <div className="flex gap-2.5 items-start">
                    <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-zinc-800">
                    <BotIcon size={13} className='text-zinc-200'/>
                    </div>
                    <div className='flex-1'>
                        <p className="text-[11px] font-medium text-zinc-500 mb-2 uppercase tracking-wider">AI</p>
                        <div className='dot-loader dark-dot-loader'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={bottomRef}/>
         </div>

         {/* Input */}
         <div className="p-3 border-t border-zinc-800">
            <PromptInput onSubmit={onSend} loading={loading} placeholder='Ask AI to modify...' autoFocus variant="dark"/>
         </div>
    </div>
  )
}

export default ChatPanel