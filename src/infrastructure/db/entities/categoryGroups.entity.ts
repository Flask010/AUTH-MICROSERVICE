import { Column, Entity } from "typeorm";

@Entity("CategoryGroups")
export class CategoryGroup {
  @Column({
    name: "name",
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    name: "categories",
    array: true,
    type: "uuid",
    length: 100,
  })
  categories: string[];

  @Column({
    type: "timestamp without time zone",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "timestamp without time zone",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
