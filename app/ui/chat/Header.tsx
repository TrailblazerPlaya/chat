"use client";

import cls from "@/app/ui/chat/style/Header.module.scss";
import Image from "next/image";

import Image1 from "@/public/avatar2.svg";
import Image2 from "@/public/avatar3.svg";
import Image3 from "@/public/avatar4.svg";
import Image4 from "@/public/avatar.svg";
import Icon from "@/public/Icon.svg";

import { Suspense } from "react";

export default function Header() {
	const chatTitle = "🦄Team Unicorns";
	return (
		<Suspense>
			<main className={cls.Header}>
				<div className={cls.HeaderImage}>
					<Image src={Image1} width={24} height={24} alt="avatar 1" />
					<Image src={Image2} width={24} height={24} alt="avatar 2" />
					<Image src={Image3} width={24} height={24} alt="avatar 3" />
					<Image src={Image4} width={24} height={24} alt="avatar 4" />
				</div>
				<div className={cls.HeaderTitle}>
					<div className={cls.ChatTitle}>{chatTitle}</div>
					<p>last seen 45 minutes ago</p>
				</div>
				<div className={cls.HeaderIcon}>
					<Image src={Icon} width={16} height={16} alt="icon" />
				</div>
			</main>
		</Suspense>
	);
}
