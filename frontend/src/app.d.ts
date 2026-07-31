// See https://svelte.dev/docs/kit/types#app.d.ts

import PocketBase from "pocketbase"
import type { User } from "$lib/features/users/user";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pocketbase: PocketBase
      user: User | undefined | null
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
