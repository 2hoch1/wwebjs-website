'use client'

import { MacWindow } from '@/components/ui/mac-window'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const botCode = `const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', (msg) => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();`

export function CodeWindow() {
  return (
    <MacWindow title="Bot.js" groupKey="code" className="h-113.75 flex flex-col">
      <div className="flex-1 min-h-0 [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0 [&_pre]:overflow-visible">
        <DynamicCodeBlock
          lang="js"
          code={botCode}
          codeblock={{ keepBackground: false, allowCopy: true }}
        />
      </div>
    </MacWindow>
  )
}
