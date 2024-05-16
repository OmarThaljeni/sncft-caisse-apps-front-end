import { Bank } from "./bank";

// bank.model.ts
export class Encaissment {
    constructor(
      public ref: string,
      public matricule: string,
      public fullname: string,
      public cin: string,
      public motif: string,
      public somme: string,
      public banque: Bank,
    ) {}
  }
  