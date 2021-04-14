import { Channel, Guild, GuildMember, MessageEmbed, User } from "discord.js";
import { Client } from "../../../Client";
import { ApplicationCommandOption } from "./ApplicationCommandOption";
import { Interaction } from "./Interaction";

export interface ApplicationCommand {
  id?: string;
  application_id?: string;
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
  default_permissions?: boolean | true;
  // I am unsure of how the responses work, I looked through the docs, but its honestly kind of confusing.
  // Removing callback from ApplicationCommand type as it's wrong, making its own type.
}
