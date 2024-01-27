"use client";

import { useChatState } from "@/app/lib/state";
import { useEffect, useState, useRef } from "react";
import { jost } from "@/app/ui/fonts";
import { format } from "date-fns";

import cls from "@/app/ui/chat/style/Main.module.scss";

export default function Main() {
	const [isClient, setIsClient] = useState(false);
	const mainRef = useRef<HTMLDivElement>(null);
	const { messages, botStatus } = useChatState();
	useEffect(() => {
		setIsClient(true);
		if (mainRef.current) {
			mainRef.current.scrollTop = mainRef.current.scrollHeight;
		}
	}, [messages]);
	const isValidTimestamp = (timestamp: number) => {
		return !isNaN(timestamp) && timestamp > 0;
	};
	return (
		<main ref={mainRef} className={` ${jost.className}  ${cls.Main}`}>
			{isClient &&
				messages.map((message, index) => (
					<div
						key={index}
						className={`${cls.ChatMessage} ${
							message.isBot ? cls.BotMessage : cls.UserMessage
						}`}
					>
						{message.isBot && (
							<div className={cls.BotAvatar}>
								<div className={cls.Avatar}>
									<div
										className={`${cls.StatusIndicator} ${
											botStatus === "online"
												? cls.Online
												: ""
										}`}
									/>
									<div className={cls.AvatarImage} />
								</div>
							</div>
						)}
						<div className={cls.MessageContent}>
							<div>
								{message.isBot && (
									<div className={cls.BotInfo}>
										<div className={cls.BotName}>Bot</div>
										<div className={cls.BotPosition}>
											Engineer
										</div>
									</div>
								)}
								<div className={cls.MessageText}>
									{message.text}
								</div>
							</div>
							<div className={cls.MessageTime}>
								{isValidTimestamp(message.timestamp) &&
									format(
										new Date(message.timestamp),
										"h:mm a"
									)}
							</div>
						</div>
					</div>
				))}
		</main>
	);
}
