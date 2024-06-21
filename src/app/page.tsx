"use client";

import useWebSocket from "@/lib/hooks/useWebsocket";
import { useEffect, useState } from "react";
import Chat from "@/components/chat";
import { axiosInstance } from "@/api/axiosInstance";
import ChatSelection from "@/components/chatSelection";
export default function Home() {
	const [oldMessages, setOldMessages] = useState<any[]>([]);
	const { messages, sendMessage, onChatChange, isTyping, setIsTyping } =
		useWebSocket(
			process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:5000"
		);
	const [prompt, setPrompt] = useState("");
	const [chatId, setChatId] = useState<string | null>(null);
	const [chats, setChats] = useState<any[]>([]);
	const [chatLoading, setChatLoading] = useState(false);

	const fetchChat = async () => {
		const response = await axiosInstance.post("/chats");
		console.log(response.data);
		setChatId(response.data._id);
		setChats([...chats, response.data]);
		return response.data._id;
	};

	const handleSend = async () => {
		if (!chatId && prompt.trim() !== "") {
			setIsTyping(true);
			const newChatId = await fetchChat();
			sendMessage(prompt, newChatId);
			setPrompt("");
		}
		if (chatId && prompt.trim() !== "") {
			setIsTyping(true);
			sendMessage(prompt, chatId);
			setPrompt("");
		}
	};

	const handleSelectChat = async (chatId: string | null) => {
		// add messages to cha
		if (chatId === null) {
			setChatId(null);
			setOldMessages([]);
			onChatChange("");
			return;
		}
		setChatLoading(true);
		setChatId(chatId);
		// refetch chat messages
		const respone = await axiosInstance.get(`/chats/${chatId}`);
		const chat = respone.data;
		setOldMessages(chat.messages);
		onChatChange(chatId);
		setChatLoading(false);
		console.log(chat.messages);
		console.log(messages);
	};

	useEffect(() => {
		const fetchChats = async () => {
			const response = await axiosInstance.get("/chats");
			setChats(response.data);
		};
		fetchChats();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
				<h1 className="text-3xl font-bold">ChatGPT Free</h1>
			</header>

			<div className="flex flex-row flex-grow p-4 bg-gray-100">
				<ChatSelection
					onSelectChat={handleSelectChat}
					selectedChat={chatId}
					chats={chats}
				/>
				<Chat
					messages={oldMessages.concat(messages)}
					handleSend={handleSend}
					prompt={prompt}
					setPrompt={setPrompt}
					chatLoading={chatLoading}
					isTyping={isTyping}
				/>
			</div>
		</div>
	);
}
