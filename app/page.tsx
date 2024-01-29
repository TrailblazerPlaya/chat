import { jost } from "@/app/ui/fonts";
import Link from "next/link";
import cls from "@/app/ui/page.module.scss";
import "@/app/ui/global.scss";
export default function Page() {
	return (
		<main className={` ${jost.className} ${cls.Home}`}>
			<div className={cls.CenterContent}>
				Чат, который здоровается с миром.
				<Link href={"/chat"} className={cls.Link}>
					Перейти
				</Link>
			</div>
		</main>
	);
}
