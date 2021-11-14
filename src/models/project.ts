import { Model, Table, AllowNull, Column, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Build, Session } from ".";

@Table({
  tableName: "projects",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class Project extends Model<Project> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id!: number;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  name!: string;

  @HasMany(() => Session)
  sessions!: Session[];

  @HasMany(() => Build)
  builds!: Build[];
}

export { Project };
