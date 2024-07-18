import { Column } from "typeorm";

export class Favorites {
  @Column({
    name: "url",
    type: "varchar",
    length: 500,
  })
  url: string;

  @Column({
    type: "varchar",
    name: "title",
    length: 500,
  })
  title: string;

  @Column({
    name: "description",
    type: "varchar",
    length: 2000,
  })
  description: string;

  @Column({
    name: "price",
    type: "varchar",
    length: 200,
  })
  price: string;

  @Column({
    name: "image_cdn_url",
    type: "varchar",
    length: 200,
  })
  imageCdnUrl: string;

  @Column({
    type: "float",
    name: "rating",
  })
  rating: number;

  @Column({
    type: "timestamp without time zone",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "varchar",
    name: "prompt",
    length: 2000,
  })
  prompt: string;
}
