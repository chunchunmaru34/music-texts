import { toCamelCase } from "@app/utils";
import { SpotifyDto } from "./spotify-dto.model";

export class ArtistSimple extends SpotifyDto {
  id: string;
  name: string;

  constructor(dto?: any) {
    super();

    if (dto) {
      const camelCased = toCamelCase(dto);

      Object.assign(this, camelCased);
    }
  }
}