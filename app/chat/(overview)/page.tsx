import { Suspense } from "react";
import Header from "@/app/ui/chat/Header";
import Main from "@/app/ui/chat/Main";
import Footer from "@/app/ui/chat/Footer";
import "@/app/ui/global.css";
import { jost } from "@/app/ui/fonts";
export default function Page() {
	return (
		<div className={` ${jost.className}`}>
			<Suspense fallback={<div>Loading...</div>}>
				<Header />
				<Main />
				<Footer />
			</Suspense>
		</div>
	);
}
