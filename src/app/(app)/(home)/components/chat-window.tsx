'use client'

import { MacWindow } from '@/components/ui/mac-window'
import { startTransition, useEffect, useState } from 'react'
import { Animated, Chat, History, Message, Reply, Text } from 'whatsapp-ui-react'

function useCurrentTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    startTransition(() => setTime(fmt()))
  }, [])
  return time
}

// Delay after the last message animation before unlocking the chat input
const UNLOCK_AFTER_MS = 21000 + 600

export function ChatWindow() {
  const T = useCurrentTime()
  const [locked, setLocked] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setLocked(false), UNLOCK_AFTER_MS)
    return () => clearTimeout(id)
  }, [])

  return (
    <MacWindow title="WhatsApp Web" groupKey="chat" className="h-113.75 flex flex-col">
      <Chat
        name="Dev Group"
        subtitle={locked ? 'typing...' : 'online'}
        avatarUrl="/logo-old.png"
        className="h-full"
        locked={locked}
        onReply={
          <Reply
            onMessage={<Text content="!ping" />}
            replyMessage={
              <Message
                direction="in"
                group
                senderId="bot"
                senderName="WWebJS Bot"
                avatarUrl="/logo-old.png"
                mode="neutral"
                time={T}
              >
                <Text content="pong" />
              </Message>
            }
          />
        }
      >
        <History>
          <Animated delay={3000}>
            <Message
              direction="in"
              group
              senderId="pedro"
              senderName="Pedro"
              avatarUrl="/pedro.png"
              mode="neutral"
              time={T}
            >
              <Text content="Hey, is the WhatsApp bot you mentioned already running?" />
            </Message>
          </Animated>

          <Animated delay={6500}>
            <Message direction="out" senderId="me" mode="neutral" time={T} status="sent">
              <Text content="Yes, just deployed it. Built with whatsapp-web.js. Try !ping." />
            </Message>
          </Animated>

          <Animated delay={11500}>
            <Message
              direction="in"
              group
              senderId="pedro"
              senderName="Pedro"
              avatarUrl="/pedro.png"
              mode="neutral"
              time={T}
            >
              <Text content="!ping" />
            </Message>
          </Animated>

          <Animated delay={12000}>
            <Message
              direction="in"
              group
              senderId="bot"
              senderName="WWebJS Bot"
              avatarUrl="/logo-old.png"
              mode="neutral"
              time={T}
            >
              <Text content="pong" />
            </Message>
          </Animated>

          <Animated delay={15500}>
            <Message
              direction="in"
              group
              senderId="rajeh"
              senderName="Rajeh"
              avatarUrl="/rajeh.png"
              mode="neutral"
              time={T}
            >
              <Text content="Nice, looks like it responds instantly." />
            </Message>
          </Animated>

          <Animated delay={18500}>
            <Message
              direction="in"
              group
              senderId="pedro"
              senderName="Pedro"
              avatarUrl="/pedro.png"
              mode="neutral"
              time={T}
            >
              <Text content="That's actually pretty clean." />
            </Message>
          </Animated>

          <Animated delay={21000}>
            <Message direction="out" senderId="me" mode="neutral" time={T} status="read">
              <Text content="~15 lines of code." />
            </Message>
          </Animated>
        </History>
      </Chat>
    </MacWindow>
  )
}
