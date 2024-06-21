"use client";
import FacebookSpinner from "./ui/facebookSpinner";

const Chat = ({
	messages,
	handleSend,
	prompt,
	setPrompt,
	chatLoading,
	isTyping,
}: {
	messages: any[];
	handleSend: () => void;
	prompt: string;
	setPrompt: (prompt: string) => void;
	chatLoading: boolean;
	isTyping: boolean;
}) => {
	return (
		<div className="flex flex-col flex-1 p-4 bg-white rounded-lg shadow-md">
			<div className="flex-1 overflow-y-auto p-4">
				{chatLoading ? (
					<div className="flex justify-center items-center h-64">
						<FacebookSpinner />
					</div>
				) : (
					messages.map((message, index) => (
						<div key={index} className="mb-2">
							<div
								className={`${
									message.role === "bot"
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-800"
								} p-2 rounded-lg inline-block`}
							>
								{message.message}
							</div>
						</div>
					))
				)}
			</div>
			<div className="flex mt-4">
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
					placeholder="Type your message..."
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleSend();
						}
					}}
				/>
				<button
					onClick={handleSend}
					disabled={isTyping || chatLoading} // Disable if either condition is true
					className={`bg-blue-500 text-white p-2 rounded-lg ${
						isTyping || chatLoading
							? "opacity-50 cursor-not-allowed"
							: ""
					}`} // Add conditional styling
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
