import { Column, Entity } from "typeorm";
import { CategoryGroup } from "./categorygroups.entity";
import { Favorites } from "./favorites.entity";

@Entity("Profile")
export class ProfileEntity {
  @Column({
    name: "avatar_cdn_url",
    type: "varchar",
    length: 200,
  })
  avatarCdnUrl: string;

  @Column(() => CategoryGroup)
  categoryGroups: CategoryGroup[];

  @Column(() => Favorites)
  favorites: Favorites[];
}
