import { Model, Table, AllowNull, Column } from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";

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

  @AllowNull(true)
  @Column({
    type: DataTypes.STRING,
  })
  app!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  udid!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.JSONB,
  })
  capabilities!: any;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  is_completed?: boolean;

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
    defaultValue: true,
  })
  is_test_passed?: Boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM,
    values: ["PASSED", "FAILED"],
    defaultValue: "PASSED",
  })
  session_status?: Boolean;

  @AllowNull(true)
  @Column({
    type: DataTypes.TEXT,
  })
  session_status_message?: string;
}

export { Session };
