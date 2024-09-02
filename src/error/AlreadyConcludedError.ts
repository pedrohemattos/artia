export class AlreadyConcludedError extends Error {
  constructor(entity: string) {
    super(`${entity} already concluded`)
  }
}
