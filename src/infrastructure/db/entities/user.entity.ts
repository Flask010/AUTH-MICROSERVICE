import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectIdColumn,
} from "typeorm";
import { UserRoles } from "../../../enums/roles/roles.enum";
import { ProfileEntity } from "./profile.entity";
import { ObjectId } from "mongodb";

@Entity("user")
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    type: "varchar",
    length: 100,
    name: "username",
  })
  username: string;

  @Column({
    type: "varchar",
    length: 100,
    name: "email",
  })
  email: string;

  @Column({
    type: "boolean",
    name: "notifications",
    default: () => false,
  })
  notifications: boolean = false;

  @Column({
    type: "varchar",
    length: 100,
    name: "password",
    select: false,
  })
  password: string;

  @Column({
    type: "varchar",
    length: "500",
    name: "refreshToken",
  })
  refreshToken: string;

  @Column({
    type: "timestamp",
    name: "createdAt",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    name: "updatedAt",
  })
  updatedAt: Date;

  @Column({
    name: "roles",
    type: "enum",
    array: true,
    enum: UserRoles,
    default: [UserRoles.User],
  })
  roles: UserRoles[];

  @Column({
    type: "boolean",
    name: "blocked",
    default: () => false,
  })
  blocked: boolean = false;

  @Column(() => ProfileEntity)
  profile: ProfileEntity;

  @BeforeInsert()
  setCreatedAt() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
