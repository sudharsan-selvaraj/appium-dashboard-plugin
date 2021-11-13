import { Model, Table, AllowNull, Column, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Session } from ".";

@Table({
  tableName: "builds",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class Build extends Model<Build> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    unique: true,
  })
  build_id!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  name!: string;

  @HasMany(() => Session, "build_id")
  sessions!: Session[];
}

export { Build };
