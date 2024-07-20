import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectIdColumn,
} from "typeorm";
import { UserRoles } from "../../../enums/roles/roles.enum";
import { ProfileEntity } from "./profile.entity";

@Entity("user")
export class UserEntity {
  @ObjectIdColumn()
  id: string;

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
  })
  password: string;

  @Column({
    type: "varchar",
    length: "500",
    name: "refresh_token",
  })
  refreshToken: string;

  @Column({
    type: "timestamp",
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    name: "updated_at",
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
