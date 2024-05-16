export class Sector {
    id: number;
    name: string;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  
}

export interface UserDataDTO {
  uuid: string | null;
  name: string;
  sectorIds: number[];
  terms: boolean;
}