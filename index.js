const Discord = require("discord.js");
const botConfig = require("./botConfig.json");
const findNextLesson = require("./utils/findNextLesson.js");
const parseSchedule = require("./utils/parseSchedule.js");

const discordClient = new Discord.Client();

const commandPrefix = "!";

discordClient.on("message", async (msg) => {
  if (msg.author.bot) return;

  const channelId = msg.channel.id;
  const channel = discordClient.channels.cache.get(channelId);

  if (msg.content.startsWith(commandPrefix)) {
    const splitted = msg.content.split(" ")
    if (splitted.length === 0){
      channel.send("Пустой текст команды");
      return;
    }
    switch(splitted[0].slice(1)) {
      case 'next-lesson': {
        const lessons = parseSchedule("2-147");
        console.log(lessons);
        const nextLesson = findNextLesson(lessons);
        // const nextLesson = "";
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
      case 'gav': {
        if (splitted.length > 1){
          channel.send(`${msg.author.username} ${msg.author.tag}`);
          const n = + splitted[1];
          if (n) {
            for (let i =0 ; i < n; i++){
              channel.send(`Gav`);
            }
            channel.send(`Мокеволеч лыб ешьнар я`);
            channel.send(`Меня%;*:№""№"!`);
            channel.send(`@@@#$Я__:;`);
            channel.send(`Isuct - lier`);
          }
        } else {
          channel.send(`RRRRRRR`)
        }
        break;
      }
    }
  }
});

discordClient.login(botConfig.token);