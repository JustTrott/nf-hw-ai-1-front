import { newChatIcon } from "./ui/icons";

const ChatSelection = ({
	onSelectChat,
	selectedChat,
	chats,
}: {
	onSelectChat: (chatId: string | null) => void;
	selectedChat: string | null;
	chats: any[];
}) => {
	const handleSelectChat = (chatId: string) => {
		onSelectChat(chatId);
	};

	return (
		<div className="w-64 bg-gray-200 p-4 rounded-lg shadow-md">
			<div className="flex items-start">
				<h2 className="text-xl font-bold mb-4 text-center">
					Select a Chat
				</h2>
				<button
					className="ml-auto"
					onClick={() => onSelectChat(null)}
					title="New Chat"
				>
					{newChatIcon({ className: "w-6 h-6" })}
				</button>
			</div>
			<ul className="space-y-2">
				{chats.map((chat, index) => (
					<li
						key={chat._id}
						className={`p-2 cursor-pointer rounded-lg ${
							selectedChat === chat._id
								? "bg-blue-500 text-white"
								: "bg-white text-gray-800"
						}`}
						onClick={() => handleSelectChat(chat._id)}
					>
						{chat.name || `Chat ${index + 1}`}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ChatSelection;
