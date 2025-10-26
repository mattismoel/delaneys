import z from "zod";
import type { Menu, MenuProvider } from "../../menu.ts";
import { env } from "../../../env.ts";
import { UNTAPPD_BASE, untappdAPIErrorResponse } from "./untappd.ts";

const untappdMenuProvider = (): MenuProvider => {


	return { getMenu }
}


export default untappdMenuProvider
