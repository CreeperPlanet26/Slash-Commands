import { Channel, Guild, GuildMember, MessageEmbed } from "discord.js";
import { Client } from "../../Client";
import { ApplicationCommand } from "./types/ApplicationCommand";
// import { GuildMember } from "./types/GuildMember";
import { Interaction } from "./types/Interaction";
import { InteractionResponseEnum } from "./types/InteractionResponseType";
import { InteractionType } from "./types/InteractionType";
/**
 * Private class used in the SlashCommands class
 * Used to send slash command api requests
 */
export class RestHandler {
  constructor(private client: Client) {}

  public async post(data: ApplicationCommand): Promise<ApplicationCommand> {
    return await this.client.api
      .applications(this.client.user.id)
      .commands.post({ data });
  }
  // Change type to something that actually makes sense, I just don't know what would be returned.
  public async callback(
    interaction: Interaction,
    data: ApplicationCommand,
    member: GuildMember,
    guild?: Guild | null,
    channel?: Channel | null,
  ): Promise<unknown | undefined> {
    // if (!data.response) return undefined;

    const command_callback_response = data.response({
      client: this.client,
      guild,
      member,
      user: this.client.users.cache.get(member?.user.id),
      channel,
      interaction,
    });
    if (!command_callback_response) return undefined;

    // TODO: tts support, allowed_mentions support,
    // flags support, multi type support (ie: MessageEmbed AND string)
    const _data: { content?: string; embeds?: Array<MessageEmbed> } = {};
    if (typeof command_callback_response === "string")
      _data.content = command_callback_response;
    else if (command_callback_response instanceof MessageEmbed)
      _data.embeds = [command_callback_response];
    else if (command_callback_response instanceof Array)
      _data.embeds = command_callback_response;
    // console.log(interaction, member, guild, channel, command_callback_response);

    return await this.client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data: _data,
        },
      });
  }
}
