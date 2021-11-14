import { Model, Table, AllowNull, Column, HasMany, ForeignKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Project, Session } from ".";

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

  @Column({
    allowNull: true,
    type: DataTypes.INTEGER,
  })
  @ForeignKey(() => Project)
  project_id!: number;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  name!: string;

  @HasMany(() => Session, { sourceKey: "build_id" })
  sessions!: Session[];
}

export { Build };
