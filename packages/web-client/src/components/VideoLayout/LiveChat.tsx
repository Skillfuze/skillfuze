import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from '@skillfuze/ui-components';
import { LivestreamsEvents, User } from '@skillfuze/types';
import { useSocket } from '@khaled-hamam/use-socketio';
import shortid from 'shortid';

import SendIcon from '../../../assets/icons/send.svg';

interface LiveChatProps {
  user: User;
}

const LiveChat: React.FC<LiveChatProps> = ({ user }: LiveChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId] = useState(shortid.generate);
  const chatDivRef = useRef<HTMLDivElement>();

  const addMessage = (payload) => {
    setMessages((prev) => [...prev, payload]);
  };

  useEffect(() => {
    chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
  }, [messages]);

  const { socket } = useSocket(LivestreamsEvents.CHAT, addMessage);

  const onSend = (event) => {
    event.preventDefault();

    const author = user ? `${user.firstName} ${user.lastName}` : `[Guest] ${userId}`;
    const payload = { author, text: newMessage };
    socket.emit('CHAT', payload);
    addMessage(payload);
    setNewMessage('');
  };

  return (
    <div className="flex chat-container flex-col flex-grow border-solid border border-grey">
      <h5 className="font-semibold p-3 bg-primary text-white">Live Chat</h5>
      <div
        className="flex-grow p-4 space-y-4 overflow-scroll shadow"
        ref={(ref) => {
          chatDivRef.current = ref;
        }}
      >
        {messages.map((message) => (
          <div className="flex flex-col text-sm">
            <p className="font-semibold">
              {`${message.author}: `}
              <span className="font-normal">{message.text}</span>
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={onSend} className="">
        <div className="p-3 flex">
          <div className="flex-grow">
            <Input placeholder="Say something..." borderless value={newMessage} onChange={setNewMessage} />
          </div>
          <Button type="submit">
            <SendIcon width={20} />
          </Button>
        </div>
      </form>
      <style jsx>
        {`
          .chat-container {
            min-width: 35%;
            height: 70vh;
          }
        `}
      </style>
    </div>
  );
};

export default LiveChat;
