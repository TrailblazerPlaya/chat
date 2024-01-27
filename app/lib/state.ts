"use client";

import create from "zustand";
import { format } from "date-fns";

interface Message {
	text: string;
	timestamp: number;
	isBot?: boolean;
}

interface ChatState {
	messages: Message[];
	botStatus: string;
	currentDate: string;
	addMessage: (message: string) => void;
	deleteMessage: (index: number) => void;
	editMessage: (index: number, newText: string) => void;
}

const getMessagesFromLocalStorage = (): Message[] => {
	if (typeof window !== "undefined") {
		const storedMessages = localStorage.getItem("chatMessages");
		return storedMessages ? JSON.parse(storedMessages) : [];
	}
	return [];
};

const saveMessagesToLocalStorage = (messages: Message[]) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("chatMessages", JSON.stringify(messages));
	}
};

export const useChatState = create<ChatState>((set) => ({
	messages: getMessagesFromLocalStorage(),
	botStatus: "online",
	currentDate: format(new Date(), "M/d/yyyy"),

	addMessage: (message) => {
		const newMessage: Message = {
			text: message,
			timestamp: Date.now(),
		};

		// Добавляем сообщение бота
		if (!message.includes("бот")) {
			const botMessage: Message = {
				text: "Hello World!",
				timestamp: Date.now() + 1000,
				isBot: true,
			};

			set((state) => {
				const updatedMessages = [
					...state.messages,
					newMessage,
					botMessage,
				];
				saveMessagesToLocalStorage(updatedMessages);
				return {
					messages: updatedMessages,
					botStatus: state.botStatus,
					currentDate: state.currentDate,
				};
			});
		} else {
			set((state) => {
				const updatedMessages = [...state.messages, newMessage];
				saveMessagesToLocalStorage(updatedMessages);
				return {
					messages: updatedMessages,
					botStatus: state.botStatus,
					currentDate: state.currentDate,
				};
			});
		}
	},
	deleteMessage: (index: number) => {
		set((state) => {
			const updatedMessages = [...state.messages];
			updatedMessages.splice(index, 1);
			saveMessagesToLocalStorage(updatedMessages);
			return {
				messages: updatedMessages,
				botStatus: state.botStatus,
				currentDate: state.currentDate,
			};
		});
	},
	editMessage: (index: number, newText: string) => {
		set((state) => {
			const updatedMessages = [...state.messages];
			updatedMessages[index].text = newText;
			saveMessagesToLocalStorage(updatedMessages);
			return {
				messages: updatedMessages,
				botStatus: state.botStatus,
				currentDate: state.currentDate,
			};
		});
	},
}));
