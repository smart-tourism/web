'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircleIcon, XIcon } from 'lucide-react'

export default function DialogFlowChat() {
  const [isOpen, setIsOpen] = useState(false)

  const dialogflowUrl = 'https://console.dialogflow.com/api-client/demo/embedded/f301ba46-8b30-49b0-b673-9c917a421c4e'

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-96 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
            <h2 className="text-lg font-semibold">Chat!</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <iframe
            src={dialogflowUrl}
            width="100%"
            height="100%"
            allow="microphone"
            className="flex-grow"
            title="Dialogflow chatbot"
          ></iframe>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg"
          aria-label="Open chat"
        >
          <MessageCircleIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
