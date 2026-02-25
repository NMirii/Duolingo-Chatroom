interface ChatProps {
  messages: { role: string; text: string }[];
}

export default function Chat({ messages }: ChatProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-lg">Chat History</h3>
      {messages.length === 0 ? (
        <p className="text-gray-400">Heç bir mesaj yoxdur.</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg border ${msg.role === 'teacher' ? 'bg-blue-100' : 'bg-white'}`}>
            <span className="text-[10px] font-bold uppercase block">{msg.role}</span>
            <p>{msg.text}</p>
          </div>
        ))
      )}
    </div>
  );
}