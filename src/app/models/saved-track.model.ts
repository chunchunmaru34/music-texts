import { Track } from "./track.model";
import { toCamelCase } from "@app/utils";

export class SavedTrack {
  track: Track;
  addedAt: Date;

  constructor(dto: any) {
    Object.assign(this, toCamelCase(dto));

    this.addedAt = new Date(this.addedAt);
  }
}