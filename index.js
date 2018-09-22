const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");


client.on("ready", () => {
  console.log(`Estou on na AvalonNetwork com ${client.users.size} players!`); 
  client.user.setActivity(`@Network_Avalon`);
});

client.on("message", async message => {
  
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    const m = await message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: `📡O teu ping é:`,
              value: `📡 ${Math.round(client.ping)}ms`
            }
          ]
        }
      }
    );
  }
  
  if(command === "anuncio") {
    if(!message.member.roles.some(r=>["COO", "CEO", "MANAGER", "MODERAÇÃO"].includes(r.name)) )
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `🚫Não podes usar este comando🚫`,
                value: `📜Faz !help para veres a minha lista de comandos`
              }
            ]
          }
        }
      )
    const sayMessage = args.join(" ");     
    message.delete().catch(O_o=>{}); 
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: `📢 Anuncio:`,
              value: `${sayMessage}`
            }
          ]
        }
      }
    );
  }
  
  if(command === "kick") {
    if(!message.member.roles.some(r=>["COO", "CEO", "MANAGER", "MODERAÇÃO"].includes(r.name)) )
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `🚫Não podes usar este comando🚫`,
                value: `📜Faz !help para veres a minha lista de comandos`
              }
            ]
          }
        }
      );
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `❌ Não encontro esse jogador❌ `,
                value: `Verifica se ele está no server!`
              }
            ]
          }
        }
      );
    if(!member.kickable) 
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `❌ Não consegui banir esse jogador❌ `,
                value: `Verifica se ele está no servidor!`
              }
            ]
          }
        }
      );
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Razão de expulsão não mencionada";
    
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} Não consegui expulsar porque : ${error}`));
      message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `❗️${member.user.tag} foi expulso por ${message.author.tag}❗️`,
                value: `Motivo: ${reason}`
              }
            ]
          }
        }
      )
    }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["COO", "CEO", "MANAGER", "MODERAÇÃO"].includes(r.name)) )
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `🚫Não podes usar este comando🚫`,
                value: `📜Faz !help para veres a minha lista de comandos`
              }
            ]
          }
        }
      );
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `❌ Não encontro esse jogador❌ `,
                value: `Verifica se ele está no server!`
              }
            ]
          }
        }
      )
    if(!member.bannable) 
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `❌ Não consegui banir esse jogador❌ `,
                value: `Verifica se ele está no servidor!`
              }
            ]
          }
        }
      )

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Razão de ban não mencionada";
    
    await member.ban(reason)
      .catch(error => message.reply(`Desculpa ${message.author} não consegui banir 
Motivo: ${error}`));
   message.channel.send(
  {
    embed: {
      url: "https://discordapp.com",
      color: 1279565,
      fields: [
        {
          name: `❗️${member.user.tag} foi banido por ${message.author.tag}❗️`,
          value: `Motivo: ${reason}`
        }
      ]
    }
  }
)
}
  
  if(command === "limpar") {
    if(!message.member.roles.some(r=>["COO", "CEO", "MANAGER", "MODERAÇÃO"].includes(r.name)) )
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `🚫Não podes usar este comando🚫`,
                value: `📜Faz !help para veres a minha lista de comandos`
              }
            ]
          }
        }
      )
    
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: "🚫Só podes eliminar entre 2 a 100 mensagens🚫",
                value: "Tenta outra vez!"
              }
            ]
          }
        }
      )
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não consegui eliminar as mensagens por: ${error}`));
      message.channel.send(
        {
          embed: {
            url: "https://discordapp.com",
            color: 1279565,
            fields: [
              {
                name: `🗑Eliminei ${deleteCount} mensagens`,
                value: `A pedido do ${message.author.tag}`
              }
            ]
          }
        }
      )
    }

  if(command === "help") {
    if(!message.member.roles.some(r=>["COO", "CEO", "MANAGER", "MODERAÇÃO"].includes(r.name)) )
    message.author.send({
      embed: {
        color: 1279565,
        footer: {
          text: "@AvalonNetwork"
        },
        image: {
        },
        author: {
          name: "Estes são todos os meus comando!",
          url: "https://discordapp.com",
        },
        fields: [
          {
            name: "📜Comandos:",
            value: "- !ping- Mostra o teu ping;\n- ip- Mostra o ip do servidor da AvalonNetwork"
          },
          {
            name: "🎶Comandos de musica(VIP):",
            value: "- !play Titulo|url- Toca a musica;\n- !queue- Mostra a fila de musicas;\n- !skip- Vota para saltar uma musica;\n- !nowplaying- Mostra a musica que está a tocar"
          },
        ]
      }
    })

    if(!message.member.roles.some(r=>["COO", "CEO", "MANAGER", "MODERAÇÃO", "SUPORTE"].includes(r.name)) )
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "📜Mandei a lista de comandos para voce",
              value: "✔️Verifique as mensagens privadas"
            }
          ]
        }
      }
    )
  }


  if(command === "help") {
    if(!message.member.roles.some(r=>["EXCALIBUR", "ARTHUR", "MERLIN", "AVALON", "BUILDER", "YOUTUBER", "MEMBRO", "EX", "MUTED", "BOT", "SUPORTE"].includes(r.name)) )
    message.author.send({
      embed: {
        color: 1279565,
        footer: {
          text: "@AvalonNetwork"
        },
        image: {
        },
        author: {
          name: "Estes são todos os meus comando!",
          url: "https://discordapp.com",
        },
        fields: [
          {
            name: "📜Comandos:",
            value: "- !ping- Mostra o teu ping;\n- ip- Mostra o ip do servidor da AvalonNetwork"
          },
          {
            name: "🎶Comandos de musica(VIP):",
            value: "- !play Titulo|url- Toca a musica;\n- !queue- Mostra a fila de musicas;\n- !skip- Vota para saltar uma musica;\n- !nowplaying- Mostra a musica que está a tocar"
          },
          {
            name: "👑Comandos Staff",
            value: "- !kick @Player Razão- Expulsa o jogador do servidor, caso não seja dada razão para o kick o bot mencionará que não houve razão de expulsão;\n- !ban @Player Razão- Ban o jogador do servidor, caso não seja dada razão para o ban o bot mencionará que não houve razão de ban;\n- !anuncio Mensagem- O bot fará um anuncio no canal em que o comando foi feito;\n- !limpar Numero de mensagens para eliminar- Limpa o chat entre 2 a 100 mensagens"
          }
        ]
      }
    })
    if(!message.member.roles.some(r=>["EXCALIBUR", "ARTHUR", "MERLIN", "AVALON", "BUILDER", "YOUTUBER", "MEMBRO", "EX", "MUTED", "BOT"].includes(r.name)) )
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "📜Mandei a lista de comandos para voce",
              value: "✔️Verifique as mensagens privadas"
            }
          ]
        }
      }
    )
  }
  if(command === "pause"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "skip"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "play"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "queue"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "volume"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "stop"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "nowplaying"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }

  if(command === "playlists"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }

  if(command === "remove"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }

  if(command === "shuffle"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }

  if(command === "skipto"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "🚫Não podes usar este comando aqui!🚫",
              value: "🎶Experimenta na sala de musica!"
            }
          ]
        }
      }
    )
  }
  if(command === "ip"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "Ip: jogar.avalon.network.com :joystick: ",
              value: "Bom jogo :smiley:"
            }
          ]
        }
      }
    )
  }
  if(command === "loja"){
    message.channel.send(
      {
        embed: {
          url: "https://discordapp.com",
          color: 1279565,
          fields: [
            {
              name: "Loja: loja.avalon-network.com 💰",
              value: "Se tiveres algum problema fala com a staff! ✔️"
            }
          ]
        }
      }
    )
  }
}); 

client.login(config.token);

client.on("guildMemberAdd", function(member) {
  let role = member.guild.roles.find("name", "MEMBRO");
  member.addRole(role).catch(console.error);
  member.guild.channels.get("491980242064244736").send({
    embed: {
    color: 1279565,
    footer: {
      icon_url: ("https://cdn.discordapp.com/attachments/482883460470538242/492886508420857877/semfundo.png"),
      text: "@AvalonNetwork"
    },
    thumbnail: {
      icon_url: (`${member.user.avatarURL}`)
    },
    image: {
      url: ("https://cdn.discordapp.com/attachments/482883460470538242/492886508420857877/semfundo.png")
    },
    author: {
      name: "Bem-vindo à AvaloNetwork!",
      url: "https://discordapp.com",
      icon_url: ("https://cdn.discordapp.com/attachments/482883460470538242/492886508420857877/semfundo.png")
    },
    fields: [
      {
        name: "Bem-vindo",
        value: (` ${member}`)
      },
      {
        name: "Redes sociais:",
        value: "Twitter-  @Network_Avalon 🐦"
      },
      {
        color: 1279565,
        name: "Youtube: ",
        value: "🎥"
      },
      {
        name: "Ip: jogar.avalon.network.com 🕹",
        value: "Para aprenderes como jogar no servidor - Vai ao nosso canal no youtube🎥",
        inline: true
      },
      {
        name: "Visita as regras para evitares ser punido!📜",
        value: "Bom jogo 😃",
        inline: true
      }
    ]
  }
})
})