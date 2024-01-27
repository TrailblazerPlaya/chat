"use client";

import { useState } from "react";
import { useChatState } from "@/app/lib/state";
import { jost } from "@/app/ui/fonts";

import cls from "@/app/ui/chat/style/Footer.module.scss";

export default function Footer() {
	const [newMessage, setNewMessage] = useState("");
	const { addMessage } = useChatState();

	const handleSendMessage = () => {
		if (newMessage.trim() !== "") {
			addMessage(newMessage);
			setNewMessage("");
		}
	};
	return (
		<main className={` ${jost.className} ${cls.Footer}`}>
			<input
				type="text"
				placeholder="Введите ваше сообщение..."
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={handleSendMessage}>Отправить</button>
		</main>
	);
}
