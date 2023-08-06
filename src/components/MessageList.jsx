const MessageList = ({ messages, userId }) => {
  return (
    <div className="chat-list p-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`p-4 mb-2 w-3/4 ${
            message.sender._id === userId ? "text-end" : "text-start"
          }`}
        >
          <div className="">
            <div className="text-gray-500 mb-1 font-semibold">
              {message.sender._id === userId ? "You" : message.sender.username}
            </div>
            <div className={`text-black py-3 mb-2 `}>
              <span
                className={` mb-2 p-3 rounded-lg ${
                  message.sender._id === userId ? "bg-red-300" : "bg-gray-300"
                } `}
              >
                {message.content}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
};

export default MessageList;
