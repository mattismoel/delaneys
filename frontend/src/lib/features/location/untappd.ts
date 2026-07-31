import z from "zod"
import { beerSchema, daySchema, openingHour, UNTAPPD_BASE, type Beer, type Menu, type OpeningHour } from "./location"
import { env } from "$env/dynamic/private"
import { format } from "date-fns"

export const untappdAPIErrorResponse = z.object({
  error: z.object({
    status: z.int().positive(),
    title: z.string(),
    detail: z.string(),
    code: z.string(),
  })
})

export const untappdHoursResponse = z.object({
  hours: z.object({
    day: daySchema,
    open_at: z.coerce.date(),
    close_at: z.coerce.date(),
    closed: z.boolean()
  }).array()
})

const untappdBeer = z.object({
  name: z.string().nonempty(),
  brewery: z.string().nonempty(),
  style: z.string().transform(style => style.split(" - ").at(0) ?? style),
  untappd_id: z.int().positive(),
  untappd_beer_slug: z.string().nonempty(),

  abv: z.coerce.number().nonnegative(),
  rating: z.coerce.number(),

  position: z.int().nonnegative(),
})

export const untappdMenuResponse = z.object({
  menu: z.object({
    sections: z.object({
      name: z.string().nonempty(),
      items: untappdBeer.array()
    }).array()
  })
})

export const untappdFetch = async <T>(pathname: string) => {
  const url = new URL(`/api/v1/${pathname}`, UNTAPPD_BASE)

  const response = await fetch(url, {
    headers: {
      "Authorization": `Basic ${env.UNTAPPD_ENCODED_ACCESS_KEY}`
    }
  })

  if (!response.ok) {
    try {
      const { error } = untappdAPIErrorResponse.parse(await response.json())
      throw Error(`Could not communicate with Untappd API: ${error.title}, ${error.detail}`)
    } catch (e) {
      console.error(e)
      throw Error("Something went wrong commnuicating with Untappd API")
    }
  }

  return response.json() as Promise<T>
}

const mapUntappdBeer = (beer: z.infer<typeof untappdBeer>): Beer => {
  const untappdBeerUrl = `https://untappd.com/b/${beer.untappd_beer_slug}/${beer.untappd_id}`

  return beerSchema.parse({
    ...beer,
    id: beer.untappd_id,
    url: untappdBeerUrl
  })
}

export const mapUntappdMenuResponse = ({ menu }: z.infer<typeof untappdMenuResponse>): Menu => {
  return {
    beers: menu.sections.flatMap(({ items }) => items
      .map((item) => ({ ...item })))
      .sort((a, b) => a.position - b.position)
      .map(beer => mapUntappdBeer(beer))
  }
}

export const mapUntappdHoursResponse = (response: z.infer<typeof untappdHoursResponse>): OpeningHour[] => {
  return response.hours.map(hour => openingHour.parse({
    ...hour,
    from: format(hour.open_at, "HH:mm"),
    to: format(hour.close_at, "HH:mm"),
  }))
}
