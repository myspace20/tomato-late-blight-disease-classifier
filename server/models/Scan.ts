import { Model } from "objection";
import User from "./User";

export default class Scan extends Model {
  id: string;
  image_url: string;
  disease_class: string;
  confidence_level: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  static get tableName() {
    return "scans";
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "scans.user_id",
        to: "users.id",
      },
    },
  };
}
