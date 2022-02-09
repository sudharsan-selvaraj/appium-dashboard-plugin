import { Model, Table, AllowNull, Column, ForeignKey, HasMany, HasOne, BelongsTo } from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import { customModelColumn } from "../utils";
import { Build } from "./build";
import { Project } from ".";

@Table({
  tableName: "session",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class Session extends Model<Session> {
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
  session_id!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  @ForeignKey(() => Build)
  build_id!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.INTEGER,
  })
  @ForeignKey(() => Project)
  project_id!: number;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  platform!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  platform_name!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  automation_name!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  device_name!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  platform_version!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  app!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  browser_name!: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.INTEGER,
  })
  live_stream_port!: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  udid!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    ...customModelColumn({ name: "capabilities", json: true }),
  })
  capabilities!: any;

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
    ...customModelColumn({ name: "device_info", json: true }),
  })
  device_info!: any;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  is_completed?: boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  is_paused?: boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.DATE,
    defaultValue: false,
  })
  start_time!: Date;

  @AllowNull(true)
  @Column({
    type: DataTypes.DATE,
    defaultValue: null,
  })
  end_time?: Date;

  @AllowNull(true)
  @Column({
    type: DataTypes.BOOLEAN,
  })
  is_test_passed?: boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  is_profiling_available?: boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  is_http_logs_available?: boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM,
    values: ["PASSED", "FAILED", "TIMEOUT", "RUNNING"],
    defaultValue: "RUNNING",
  })
  session_status?: "PASSED" | "FAILED" | "TIMEOUT" | "RUNNING";

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  video_path?: string | null;

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  session_status_message?: string;

  @BelongsTo(() => Build)
  build!: Build;

  @BelongsTo(() => Project)
  project!: Project;
}

export { Session };
