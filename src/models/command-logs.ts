import { Model, Table, AllowNull, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import { Session } from "./session";

@Table({
  tableName: "command_logs",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class CommandLogs extends Model<CommandLogs> {
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
  command_name!: string;

  @Column({
    type: DataTypes.STRING,
  })
  title!: string;

  @Column({
    type: DataTypes.STRING,
  })
  title_info!: string;

  @Column({
    type: DataTypes.STRING,
  })
  response!: string;

  @Column({
    type: DataTypes.STRING,
  })
  params!: string;

  @BelongsTo(() => Session, { foreignKey: "session_id" })
  session!: Session;
}

export { CommandLogs };
