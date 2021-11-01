import { Model, Table, AllowNull, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import { Session } from "./session";
import { customModelColumn } from "../utils";

@Table({
  tableName: "logs",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class Logs extends Model<Logs> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  log_id!: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  @ForeignKey(() => Session)
  session_id!: string;

  @Column({
    type: DataTypes.STRING,
  })
  log_type!: string;

  @Column({
    type: DataTypes.STRING,
  })
  message!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
    ...customModelColumn({ name: "args", json: true }),
  })
  args!: string;

  @Column({
    type: DataTypes.DATE,
  })
  timestamp!: Date;

  @BelongsTo(() => Session, { foreignKey: "session_id" })
  session!: Session;
}

export { Logs };
