import { Model, Table, AllowNull, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import { Session } from "./session";
import { customModelColumn } from "../utils";

@Table({
  tableName: "http_logs",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class HttpLogs extends Model<HttpLogs> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  @ForeignKey(() => Session)
  session_id!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  url!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  method!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
    ...customModelColumn({ name: "request_headers", json: true }),
  })
  request_headers!: string;

  @Column({
    type: DataTypes.TEXT,
  })
  request_post_data!: string;

  @Column({
    type: DataTypes.STRING,
  })
  request_content_type!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  request_type?: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  context?: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
  response_status?: number;

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  response_status_text?: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
    ...customModelColumn({ name: "response_headers", json: true }),
  })
  response_headers?: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  response_content_type?: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  response_body?: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  remote_ip_address?: string;

  @Column({
    type: DataTypes.DATE,
  })
  start_time?: Date;

  @AllowNull(true)
  @Column({
    type: DataTypes.DATE,
  })
  end_time?: Date;

  @BelongsTo(() => Session, { foreignKey: "session_id" })
  session!: Session;
}

export { HttpLogs };
