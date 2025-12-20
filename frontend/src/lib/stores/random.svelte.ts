import { randomIndex } from "../random";

type OverrideProps<T> = {
  newValue: T | null;
  findFn?: (v: T) => boolean;
};

export class Randomiser<T> {
  choices = $state<T[]>([]);

  currentIdx = $state<number>();

  current = $derived.by(() => {
    if (this.currentIdx === undefined) return;
    return this.choices.at(this.currentIdx);
  });

  constructor(choices: T[]) {
    this.choices = choices;
    if (choices.length > 0) {
      this.currentIdx = randomIndex(choices);
    }
  }

  override = (props: OverrideProps<T>) => {
    if (!props.newValue || !props.findFn) return;

    const newIdx = this.choices.findIndex(props.findFn);

    if (newIdx === -1) {
      return;
    }

    this.currentIdx = newIdx;
  };

  randomise = () => {
    if (this.choices.length === 0) return;
    if (this.choices.length === 1) {
      this.currentIdx = 0;
      return;
    }

    let newIdx = randomIndex(this.choices);
    while (newIdx === this.currentIdx) {
      newIdx = randomIndex(this.choices);
    }

    this.currentIdx = newIdx;
  };
}
