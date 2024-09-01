export class DateRangeError extends Error {
  constructor(input: Input) {
    const { type } = input
    if(type === 'default') super('The start date must be earlier than the end date')
    if(type === 'activity') super("The activity's start date must be later than the project's start date")
  }
}

type Input = {
  type: 'default' | 'activity'
}