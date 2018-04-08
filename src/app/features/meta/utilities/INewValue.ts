export interface INewValue {
  isNew?: boolean;
}

export namespace INewValue {
  export function removeIsNew(values: any[]) {
    for (const value of values) {
      delete (value as INewValue).isNew;
    }
  }

  export function isNew(value: any): boolean {
    return (value as INewValue).isNew;
  }
}
