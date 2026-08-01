import z from "zod";

export const UNTAPPD_BASE = "https://business.untappd.com/api/v1"

export const daySchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
])


type Day = z.infer<typeof daySchema>

const dayNames: Record<Day, string> = {
  monday: "Mandag",
  tuesday: "Tirsdag",
  wednesday: "Onsdag",
  thursday: "Torsdag",
  friday: "Fredag",
  saturday: "Lørdag",
  sunday: "Søndag",
}

export const beerSchema = z.object({
  id: z.int().positive(),
  name: z.string().nonempty(),
  brewery: z.string().nonempty(),
  style: z.string().nonempty(),
  abv: z.number().nonnegative(),
  url: z.url().nonempty(),
  rating: z.number(),
})

const menu = z.object({
  beers: beerSchema.array()
})

export const openingHour = z.discriminatedUnion("closed", [
  z.object({
    day: daySchema,
    closed: z.literal(true),
  }),
  z.object({
    day: daySchema,
    closed: z.literal(false),
    from: z.iso.time(),
    to: z.iso.time(),
  }),
])


export const dayName = (day: Day) => {
  return dayNames[day]
}

export type OpeningHour = z.infer<typeof openingHour>
export type Menu = z.infer<typeof menu>
export type Beer = z.infer<typeof beerSchema>
