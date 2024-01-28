"use client";

import { useChatState } from "@/app/lib/state";
import { useState, useRef } from "react";
import { jost } from "@/app/ui/fonts";
import Image from "next/image";

import UploadImg from "@/public/dog.svg";
import Smile from "@/public/smile.svg";
import { SendOutlined } from "@ant-design/icons";

import cls from "@/app/ui/chat/style/Footer.module.scss";

export default function Footer() {
	const [newMessage, setNewMessage] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const { addMessage } = useChatState();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSendMessage = () => {
		if (newMessage.trim() !== "") {
			addMessage(newMessage);
			setNewMessage("");
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSendMessage();
		}
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleUpload = () => {
		if (fileInputRef && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];

			alert(`Uploaded file: ${file.name}`);
		}
	};

	return (
		<main
			className={` ${jost.className} ${cls.Footer} ${
				isFocused ? cls.Focus : ""
			}`}
		>
			<Image
				src={Smile}
				width={16}
				height={16}
				alt="smile"
				className={cls.Smile}
			/>
			<input
				type="text"
				placeholder="Start typing..."
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				className={cls.FooterInput}
			/>
			<Image
				src={UploadImg}
				width={16}
				height={16}
				alt="upload"
				className={cls.Upload}
				onClick={handleUpload}
			/>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>
			<SendOutlined
				onClick={handleSendMessage}
				className={`${cls.Samoletik} ${
					isFocused || newMessage.trim() !== ""
						? cls.ActiveSamoletik
						: ""
				}`}
			/>
		</main>
	);
}
