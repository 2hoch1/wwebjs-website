import { MacWindowGroup } from '@/components/ui/mac-window'
import { ChatWindow } from './chat-window'
import { CodeWindow } from './code-window'
import { TerminalWindow } from './terminal-window'

export function WWebJSSection() {
  return (
    <MacWindowGroup>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <ChatWindow />
        <TerminalWindow />
        <CodeWindow />
      </div>
    </MacWindowGroup>
  )
}
