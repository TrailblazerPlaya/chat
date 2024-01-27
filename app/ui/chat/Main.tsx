"use client";

import { useChatState } from "@/app/lib/state";
import { useEffect, useState, useRef } from "react";
import { jost } from "@/app/ui/fonts";
import { format } from "date-fns";

import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

import cls from "@/app/ui/chat/style/Main.module.scss";

export default function Main() {
	const [isClient, setIsClient] = useState(false);
	const [editText, setEditText] = useState("");
	const [editIndex, setEditIndex] = useState(-1);
	const mainRef = useRef<HTMLDivElement>(null);
	const { messages, botStatus, deleteMessage, editMessage } = useChatState();
	const currentDate = format(new Date(), "M/d/yyyy");
	useEffect(() => {
		setIsClient(true);
		if (mainRef.current) {
			mainRef.current.scrollTop = mainRef.current.scrollHeight;
		}
	}, [messages]);
	const handleDeleteMessage = (index: number) => {
		deleteMessage(index);
	};
	const handleEditMessage = (index: number) => {
		setEditIndex(index);
		setEditText(messages[index].text);
	};

	const handleSaveEdit = () => {
		if (editIndex !== -1) {
			editMessage(editIndex, editText);
			setEditIndex(-1);
			setEditText("");
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (event.key === "Enter") {
			handleSaveEdit();
		}
	};

	const isValidTimestamp = (timestamp: number) => {
		return !isNaN(timestamp) && timestamp > 0;
	};
	return (
		<main ref={mainRef} className={` ${jost.className}  ${cls.Main}`}>
			<div className={cls.CurrentDate}>{currentDate}</div>
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
									{editIndex === index ? (
										<input
											type="text"
											value={editText}
											onChange={(e) =>
												setEditText(e.target.value)
											}
											onKeyDown={(e) =>
												handleKeyDown(e, index)
											}
										/>
									) : (
										message.text
									)}
								</div>
								{!message.isBot && (
									<div className={cls.MessageActions}>
										<button
											onClick={() =>
												handleDeleteMessage(index)
											}
											className={cls.DeleteButton}
										>
											<DeleteOutlined />
										</button>
										{editIndex === index ? (
											<button
												className={cls.EditButton}
												onClick={handleSaveEdit}
											>
												<EditOutlined />
											</button>
										) : (
											<button
												className={cls.EditButton}
												onClick={() =>
													handleEditMessage(index)
												}
											>
												<EditOutlined />
											</button>
										)}
									</div>
								)}
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
