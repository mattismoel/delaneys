import type { IconType } from "react-icons/lib";
import { SiInstagram, SiFacebook } from "react-icons/si"
import { LuMapPinHouse, LuMail, LuPhone } from "react-icons/lu"

export type ContactType = "phone" | "mail" | "address";

export const socialIconMap = new Map<string, IconType>([
	["instagram", SiInstagram],
	["facebook", SiFacebook],
]);

export const contactTypeIcon = (type: ContactType): IconType => {
	switch (type) {
		case "address":
			return LuMapPinHouse
		case "mail":
			return LuMail;
		case "phone":
			return LuPhone;
	}
};

export const htmlContactPrefixes: Record<ContactType, string | undefined> = {
	mail: "mailto",
	phone: "tel",
	address: undefined
};

export const generateHtmlContactUrl = (type: ContactType, text: string): string => {
	if (type === "address") {
		return `https://maps.google.com/?q=${text}`;
	}

	const prefix = htmlContactPrefixes[type];
	return `${prefix}:${text}`;
};
