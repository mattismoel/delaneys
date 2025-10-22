import KontrolRapport from "../../../assets/kontrol-rapport.gif";
import { LuMail, LuMapPinHouse, LuPhone } from "react-icons/lu";
import Logo from "../logo";
import ContactEntry from "./contact-entry";
import SocialEntry from "./social-entry";
import { SiFacebook, SiInstagram } from "react-icons/si";
import OpeningHours from "./opening-hours";
import type { OpeningHour } from "../../../features/location/location";

type Props = {
	hours: OpeningHour[]
}

const Footer = ({ hours }: Props) => (
	<footer
		className="z-10 px-responsive py-16 flex flex-col gap-12 bg-background-200 border-t border-t-border relative"
	>
		<div className="flex flex-col justify-between gap-16 lg:grid-cols-2 md:flex-row">
			<div className="flex flex-col gap-6 justify-between">
				<Logo variant="dark" className="h-12 md:-translate-x-4 -translate-y-3" />
				<div className="flex flex-col gap-8">
					<ul className="flex flex-col gap-2">
						<ContactEntry type="phone" value="+45 10 99 40" Icon={LuPhone} />
						<ContactEntry type="mail" value="info@delaneys.dk" Icon={LuMail} />
						<ContactEntry type="address" value="Tolderlundsvej 46, 5000 Odense C" Icon={LuMapPinHouse} />
					</ul>

					<ul className="flex items-center gap-2">
						<SocialEntry href="https://www.instagram.com/delaneysodense/" Icon={SiInstagram} />
						<SocialEntry href="https://www.facebook.com/profile.php?id=100090615901671" Icon={SiFacebook} />
					</ul>
				</div>

				<a href="https://www.findsmiley.dk/1343488">
					<img
						src={KontrolRapport}
						alt="Se kontrolrapport"
						className="hidden md:block w-32"
					/>
				</a>
			</div>

			<div>
				<h2 className="font-heading font-bold mb-4">Åbningstider</h2>
				<OpeningHours hours={hours} />
			</div>
			<a
				href="https://www.findsmiley.dk/1343488"
				className="w-full flex justify-center md:hidden"
			>
				<img src={KontrolRapport} alt="Se kontrolrapport" className="lg:block w-32" />
			</a>
		</div>

		<p className="text-center text-sm">
			&copy;&nbsp;Delaney's Bar & Bottleshop {new Date().getFullYear()}
		</p>
	</footer>
)

export default Footer
