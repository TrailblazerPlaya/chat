"use client";

import { jost } from "@/app/ui/fonts";
import { format } from "date-fns";
import { useChatState } from "@/app/lib/state";

import cls from "@/app/ui/chat/style/Header.module.scss";

export default function Header() {
	// const currentTime = format(new Date(), "HH:mm");
	const chatTitle = "Team Unicorns";
	return (
		<main className={cls.Header}>
			<div className={cls.ChatTitle}>{chatTitle}</div>
			{/* <p>Текущее время: {currentTime}</p> */}
			{/* Другие элементы шапки чата могут быть добавлены здесь */}
			<p>last seen 45 minutes ago</p>
		</main>
	);
}
