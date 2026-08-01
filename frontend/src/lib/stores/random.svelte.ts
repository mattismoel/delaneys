import { randomIndex } from "../random";

export class Randomiser<T, K = string | number> {
  #choices = $state<T[]>([]);
  #getKey: (value: T) => K

  currentIdx = $state<number>();

  current = $derived.by(() => {
    if (this.currentIdx === undefined) return;
    return this.#choices.at(this.currentIdx);
  });

  constructor(choices: T[], getKey: (value: T) => K) {
    this.#choices = choices;
    this.#getKey = getKey

    if (choices.length > 0) {
      this.currentIdx = randomIndex(choices);
    }
  }

  // select = (value: T) => {
  //   const idx = this.#choices.findIndex(choice => this.#getKey(choice) === this.#getKey(value))
  //
  //   if (idx === -1) return
  //
  //   this.currentIdx = idx
  // };

  selectByKey = (key: K) => {
    const idx = this.#choices.findIndex(
      choice => this.#getKey(choice) === key,
    )

    if (idx === -1) return

    this.currentIdx = idx
  }

  randomise = () => {
    const { length } = this.#choices

    if (length === 0) return

    if (this.#choices.length === 1) {
      this.currentIdx = 0;
      return;
    }

    let idx: number;
    do {
      idx = randomIndex(this.#choices)
    } while (idx === this.currentIdx)

    this.currentIdx = idx
  };
}
