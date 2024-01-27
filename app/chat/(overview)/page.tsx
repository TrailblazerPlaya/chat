"use client";

import { Suspense } from "react";
import Header from "@/app/ui/chat/Header";
import Main from "@/app/ui/chat/Main";
import Footer from "@/app/ui/chat/Footer";

import "@/app/ui/global.scss";
import { jost } from "@/app/ui/fonts";
import cls from "@/app/ui/chat/style/Chat.module.scss";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main className={` ${jost.className} ${cls.Chat}`}>
				<Header />
				<Main />
				<Footer />
			</main>
		</Suspense>
	);
}
