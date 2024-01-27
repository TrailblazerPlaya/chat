"use client";

import { jost } from "@/app/ui/fonts";

import cls from "@/app/ui/chat/style/Header.module.scss";

export default function Header() {
	const chatTitle = "Team Unicorns";
	return (
		<main className={cls.Header}>
			<div className={cls.ChatTitle}>{chatTitle}</div>

			<p>last seen 45 minutes ago</p>
		</main>
	);
}
