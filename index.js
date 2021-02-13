const Discord = require("discord.js");
const botConfig = require("./botConfig.json");
const findNextLesson = require("./utils/findNextLesson.js");
const discordClient = new Discord.Client();

const commandPrefix = "!";

discordClient.on("message", async (msg) => {
  if (msg.author.bot) return;

  const channelId = msg.channel.id;
  const channel = discordClient.channels.cache.get(channelId);

  if (msg.content.startsWith(commandPrefix)) {

    switch(msg.content.slice(1)) {
      case 'next-lesson': {
        const nextLesson = findNextLesson();

        if (nextLesson) {
          const nextLessonMessage = `
            Предмет: ${nextLesson.type} ${nextLesson.subject},
            Дата: ${nextLesson.startsAt.year}.${nextLesson.startsAt.month}.${nextLesson.startsAt.day},
            Время: ${nextLesson.time.start}-${nextLesson.time.end}
            Аудитория: ${nextLesson.audiences[0].name}
            Группы: ${nextLesson.groups.join(", ")}
          `;

          channel.send(nextLessonMessage);
        } else {
          channel.send("Ближайших пар нет");
        }

        break;
      }
    }
  }
});

discordClient.login(botConfig.token);