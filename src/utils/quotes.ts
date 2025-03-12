// src/utils/quotes.ts

export interface Quote {
    text: string;
    author: string;
  }
  
  export const fitnessQuotes: Quote[] = [
    {
      text: "Change can be scary.",
      author: "Sam Sulek"
    },
    {
      text: "If you wanna look freaky, you got to do some freaky shit.",
      author: "Sam Sulek"
    },
    {
      text: "I know you are not doing your cardio.",
      author: "Sam Sulek"
    },
    {
      text: "You´re not what you think you´re, you´re what you´re doing everyday.",
      author: "Chris Bumstead"
    },
    {
      text: "If the bar ain't bending, you're just pretending.",
      author: "Ronnie Coleman"
    },
    {
      text: "Yeah Buddy.",
      author: "Ronnie Coleman"
    },
    {
      text: "It is important to have people beilieve in you. With this support, what you can achieve is limitless.",
      author: "Ronnie Coleman"
    },
    {
      text: "Don´t fart, dont fart, dont fart...",
      author: "Me while squatting."
    },
    {
      text: "I thought they said 'rest day' not 'rest week'... my bad.",
      author: "Procrastinating Athlete"
    },
    {
      text: "I flex when I walk past windows, mirrors, and shiny spoons.",
      author: "Every Bodybuilder Ever"
    },
    {
      text: "I don't sweat, I leak awesomeness.",
      author: "Gym Enthusiast"
    },
    {
      text: "My biceps have biceps.",
      author: "Arnold Schwarzenegger Fan"
    },
    {
      text: "I'm on a roll... a cinnamon roll. Cheat day rules!",
      author: "Honest Fitness Lover"
    },
    {
      text: "I work out to eat more pizza. It's all about balance.",
      author: "Realistic Fitness Coach"
    },
    {
      text: "If you still look cute after your workout, you didn't train hard enough.",
      author: "Hardcore Trainer"
    },
    {
      text: "The only marathon I'm running is a Netflix marathon. But I'll lift those weights tomorrow!",
      author: "Relatable Gym Member"
    },
    {
      text: "My fitness goal is to lose my breath running into your arms not up the stairs.",
      author: "Romantic Exerciser"
    },
    {
      text: "I'm just one workout away from a good mood.",
      author: "Exercise Science Fact"
    },
    {
      text: "Do I have abs yet? *checks after 5 sit-ups*",
      author: "Impatient Newbie"
    },
    {
      text: "Legs day? Sorry, I suddenly remember I have to wash my hair.",
      author: "Leg Day Avoider"
    },
    {
      text: "The first rule of CrossFit is: Always talk about CrossFit.",
      author: "Everyone Not in CrossFit"
    },
    {
      text: "I'm into fitness... fit'ness whole pizza in my mouth.",
      author: "Honest Gym Rat"
    },
    {
      text: "Remember, it's 'No pain, no gain', not 'No pain, no pain'.",
      author: "Captain Obvious at the Gym"
    },
    {
      text: "My workout routine consists of running out of patience and jumping to conclusions.",
      author: "Mental Gymnast"
    },
    {
      text: "If you want to look like a freak, you got to eat, sleep and train like a freak.",
      author: "Modified Gym Wisdom"
    }
  ];
  
  // Function to get a random quote
  export const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * fitnessQuotes.length);
    return fitnessQuotes[randomIndex];
  };