"use client";
import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
	const [messages, setMessages] = useState<any[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const webSocketRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const webSocket = new WebSocket(url);

		webSocket.onopen = () => {
			console.log("WebSocket connection opened");
		};

		webSocket.onmessage = (event) => {
			const data: {
				chunk?: string;
				end?: boolean;
				debugMessage?: boolean;
			} = JSON.parse(event.data);
			if (data.debugMessage) {
				console.log(data.debugMessage);
				return;
			}
			if (data.end) {
				setIsTyping(false);
				return;
			}
			setIsTyping(true);
			// append chunk to last message
			setMessages((prevMessages) => {
				const lastMessage = prevMessages[prevMessages.length - 1];
				if (lastMessage.role === "bot") {
					lastMessage.message += data.chunk;
					return [...prevMessages];
				}
				return [...prevMessages, { role: "bot", message: data.chunk }];
			});
		};

		webSocket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		webSocket.onclose = () => {
			console.log("WebSocket connection closed");
		};

		webSocketRef.current = webSocket;

		return () => {
			webSocket.close();
		};
	}, [url]);

	const sendMessage = (message: string, chatId: string) => {
		if (webSocketRef.current?.readyState === WebSocket.OPEN) {
			webSocketRef.current.send(JSON.stringify({ message, chatId }));
			const newMessage = { role: "user", message };
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			// add empty message to show typing indicator
			setMessages((prevMessages) => [
				...prevMessages,
				{ role: "bot", message: "" },
			]);
		} else {
			console.error("WebSocket is not open");
		}
	};

	const onChatChange = (chatId: string) => {
		setMessages([]);
	};

	return { messages, sendMessage, onChatChange, isTyping, setIsTyping };
};

export default useWebSocket;
