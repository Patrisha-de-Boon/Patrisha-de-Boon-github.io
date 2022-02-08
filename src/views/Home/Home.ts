import { Options, Vue } from "vue-class-component";
import { TimelineEvent } from "@/models/TimelineEvent";
import Timeline from "@/components/Timeline/Timeline.vue"; // @ is an alias to /src
import moment from "moment";
import { ConsoleSection } from "@/models/ConsoleSection";
import ConsoleList from "@/components/ConsoleList/ConsoleList.vue";
import ConsoleCell from "@/components/ConsoleCell/ConsoleCell.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";
import router from "@/router";

@Options({
  components: {
    Timeline,
    ConsoleList,
    ConsoleCell,
  },
})
export default class Home extends Vue {
  selectedEvent: TimelineEvent | null = null;
  careerEvents: TimelineEvent[][] = careerEvents;
  aboutSections: ConsoleSection[] = aboutSections;
  portfolioSections: ConsoleSection[] = portfolioSections;
  fixBackground = false;
  hintEventSection: ConsoleSection = <ConsoleSection>{
    title: "Education And Career",
    body: "Hover over any section of the timeline to see more information.",
  };

  get longestDisplayCareer(): TimelineEvent | null {
    let event: TimelineEvent | null = null;
    let maxLength = 0;
    if (this.careerEvents && this.careerEvents.length > 0) {
      this.careerEvents.forEach((sequence: TimelineEvent[]) => {
        sequence.forEach((e: TimelineEvent) => {
          const newLength = e.description.length;
          if (newLength > maxLength) {
            maxLength = newLength;
            event = e;
          }
        });
      });
    }

    if (event) {
      return event;
    }
    return null;
  }

  mounted(): void {
    document.addEventListener("scroll", this.onScroll);
    const route = useRoute();
    watch(
      () => route.name,
      () => {
        if (route && route.name) {
          this.scrollTo(route.name.toString());
        }
      }
    );
  }

  destroyed(): void {
    document.removeEventListener("scroll", this.onScroll);
  }

  onEventHovered(event: TimelineEvent | null): void {
    this.selectedEvent = event;
  }

  // This function is based on https://stackoverflow.com/questions/42645964/vue-js-anchor-to-div-within-the-same-component
  scrollTo(refName: string, route = false): void {
    if (route) {
      router.push({ name: refName });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const element: any = this.$refs[refName];

      if (element) {
        const top = element.offsetTop;
        window.scrollTo(0, top);
      }
    }
  }

  eventToConsoleSection(event: TimelineEvent): ConsoleSection {
    return <ConsoleSection>{
      title: event.title,
      body: event.description,
      imageSrc: event.imageSrc,
    };
  }

  onScroll(): void {
    let newState = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cover: any = this.$refs["cover"];
    if (cover && cover.getBoundingClientRect().bottom <= 100) {
      newState = true;
    } else {
      newState = false;
    }

    if (this.fixBackground != newState) {
      this.fixBackground = newState;
    }
  }

  openResume(): void {
    window.open("./resume.pdf");
  }
}

const portfolioSections = [
  <ConsoleSection>{
    title: "The Name of the Game",
    body: "The Name of the Game is a game made by the team Good Question \
    (consisting of Patrisha de Boon, Arseniy Kouzmenkov, Joseph Meleshko, \
    and Jacob Paton) during HackED, a 24 hour hackathon in 2018. This project \
    won third place overall for this hackathon. \
    \n \
    The Name of the Game is a build your own platform style game meant to \
    introduce people to the concepts of coding and using a terminal in order \
    to accomplish a goal. In this case, the goal is to get the character \
    from the start point to the finish line. The game is written entirely \
    in C++ using the SDL 2 framework, and was made collaboratively using \
    Windows, Linux, and Mac devices through GitHub. \
    \n \
    Part of the reason we chose SDL 2 as the framework for this game is \
    because none of us had any experience with it prior to beginning the \
    hackathon, and we enjoyed challenging ourselves to learn a new \
    framework while building a complete project, all within 24 hours.",
    imageSrc: "The_Name_Of_The_Game.png",
    href: "https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2Fjosephmeleshko%2FGoodQuestion-Hackathon2018&sa=D&sntz=1&usg=AFQjCNFCyz1aL9ADclcgzB-rOF-7cVvtUg",
    iframeSrc: "https://www.youtube.com/embed/lS6wTw2B83c",
  },
  <ConsoleSection>{
    title: "ChAI",
    body: "ChAI, or Checkers with AI, is an ongoing project. Currently, only the game \
    portion is complete, and the AI is being developed. The game has a menu \
    screen, save and load game features, and aesthetic options the user \
    can change. Only multiplayer gameplay is currently supported, but an AI \
    opponent is being created to allow single player gameplay against the AI. \
    \n \
    The goal is to create an opponent with multiple difficulties that the user \
    can chose. Each difficulty will be based on a different heuristic for \
    the minimax algorithm. In the future, machine learning may be implemented \
    to create an AI with higher difficulty. The game itself is written in \
    python, and the AI will be written in C++. The purpose of creating ChAI is \
    to gain experience developing AI and to also gain experience making programs \
    written in different languages communicate effectively and efficiently with \
    each other.",
    imageSrc: "ChAI.png",
    href: "https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2FPatrisha-de-Boon%2FCheckers-With-AI&sa=D&sntz=1&usg=AFQjCNG9pY_o4Cv0A-IrMph8_2pYMNshGA",
  },
  <ConsoleSection>{
    title: "Retro Bullet Hell",
    body: "Retro Bullet Hell is the CMPUT 275 final project made by Patrisha de Boon \
    and Arseniy Kouzmenkov in 2018. It is in the 'bullet hell' genre and was \
    heavily inspired by retro arcade games such as Galaga and Space Invaders. \
    The game is made in python using PyGame. \
    \n \
    After the game is launched and a \
    skipable splash screen has played, the user can navigate a menu using a \
    keyboard or mouse. They can load a saved game if one is available, change \
    the difficulty, view the recorded high scores, or start a new game. The goal \
    of the game is to destroy as many enemy ships as possible before loosing all \
    of your health. ",
    imageSrc: "retro_bullet_hell.png",
    href: "https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2FArseniyKD%2FRetroBulletHell&sa=D&sntz=1&usg=AFQjCNGGrtgm5mwvLhSKLBm33sQcT2Ipnw",
    iframeSrc: "https://www.youtube.com/embed/iaAyapXF9hw",
  },
  <ConsoleSection>{
    title: "Arduino Air Hockey",
    body: "Arduino Air Hockey is the CMPUT 274 final project made by Patrisha de Boon \
    and Areseniy Kouzmenkov in 2018. The game is written in C++ and is meant to \
    be uploaded to two separate arduinos, one which will be wired as the menu \
    arduino, and one which will be wired as the game arduino. The arduinos \
    communicate with each other through the serial port. \
    \n \
    After start up, the \
    menu arduino displays a menu and takes user input from the game arduino to \
    chose the game parameters, such as each player's colour choice and the score \
    required to win the game. During game play, the menu arduino displays the \
    current score while the game arduino receives user input and runs the game \
    state. The reflection physics for collisions between the circular puck and \
    the circular paddles is handled through calculations applied from linear \
    algebra. ",
    imageSrc: "arduino_air_hockey.png",
    href: "https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2FArseniyKD%2FAAH&sa=D&sntz=1&usg=AFQjCNFplpTQczV5SDMc_LRSLLbkwOog5Q",
  },
];

const aboutSections = [
  <ConsoleSection>{
    title: "Education",
    body: "I'm currently in my final year of the Computer Engineering Co-op program at the \
      University of Alberta, in the Software Co-op Option.",
  },
  <ConsoleSection>{
    title: "Passion For Learning",
    body: 'I have a passion for learning and I enjoy challenging myself to gain \
      new skills and improve on existing ones. As a result, I have \
      participated in every 24 hour hackathon offered by the Computer \
      Engineering Club of UAlberta since I have been at the University. In \
      the second hackathon I attended, my team Good Question won 3rd place \
      overall for our game "The Name of the Game". I have also participated \
      in Computer Programming Competitions with the University of Alberta \
      Programming Competition Club. \
      \n \n \
      Currently, I have a particular interest in augmented reality, smart \
      home systems, and wearable tech, as well as learning how technologies \
      like these can be used to improve our everyday lives.',
  },
  <ConsoleSection>{
    title: "Passion For Sharing Knowledge",
    body: "I feel it is just as important to know a topic as it is to be able \
    share that understanding with others. This is why I have been a TA for \
    CMPUT 274 and 275, and why I have consistantly continued working with \
    previous co-op employers as needed after the end of my work terms to \
    support my collegues as they worked with the software I developed.",
  },
  <ConsoleSection>{
    title: "Fun Fact",
    body: "An interesting fact about me is that I volunteer every summer as a \
    Race Official for the Northern Alberta Sports Car Club and a variety \
    of related clubs. I am also currently in the processes of developing a \
    number of pieces of software to streamline some of the processes \
    releated to these events.",
  },
];

const careerEvents = [
  [
    <TimelineEvent>{
      title: "Undergraduate Teaching Assistant",
      company: "University of Alberta",
      imageSrc: "UAlberta.png",
      description:
        "I worked part-time with the University of Alberta as an Undergraduate Teaching \
        Assistant for the class CMPUT 274, which focusses on teaching Python and C++. I \
        worked during office hours to assist students with coursework and to help answer \
        their course-related questions.",
      start: moment("01 09 2018", "DD MM YYYY"),
      end: moment("30 12 2018", "DD MM YYYY"),
      cssClass: "ta",
      fullTime: false,
    },
    <TimelineEvent>{
      title: "Undergraduate Teaching Assistant",
      company: "University of Alberta",
      imageSrc: "UAlberta.png",
      description:
        "I was a Teaching Assistant for CMPUT 274 and 275 in the Fall Term of 2019 and \
        the Winter Term of 2020, respectively. I held office hours to assist \
        students in learning the course content, which focused on introducing \
        Computer Engineering and Computer Science students to the programming \
        languages Python and C++.",
      start: moment("01 09 2019", "DD MM YYYY"),
      end: moment("30 04 2020", "DD MM YYYY"),
      cssClass: "ta",
      fullTime: false,
    },
    <TimelineEvent>{
      title: "Undergraduate Teaching Assistant",
      company: "University of Alberta",
      imageSrc: "UAlberta.png",
      description:
        "I worked part-time with the University of Alberta as an Undergraduate Teaching \
        Assistant for the class CMPUT 275, which focusses on teaching Python and C++. I \
        worked during office hours to assist students with coursework and to help answer \
        their course-related questions.",
      start: moment("01 01 2021", "DD MM YYYY"),
      end: moment("30 04 2021", "DD MM YYYY"),
      cssClass: "ta",
      fullTime: false,
    },
  ],
  [
    <TimelineEvent>{
      title: "Executive Assistant",
      company: "Youth HQ",
      imageSrc: "YouthHQ.jpg",
      description:
        "While working with Youth HQ I assisted in updating the registration process for \
        the Boys and Girls Club of Red Deer and District to allow online registration and \
        developed a physical form which coincides with the online registration for ease of \
        data entry. I also recommended and implemented a more efficient file searching \
        software for use on the Executive Director's Computer, created instructions for the \
        use of this software, and helped to develop a new filing system for the Executive \
        Director's Office. As well as that, I compiled documents from three years of Board \
        meetings with three different agencies into Minute Books and assisted with data entry \
        and filing documents. During my time with Youth HQ I was also able to create the \
        first-ever Executive Director Manual for the agency: a 140-page document which includes \
        field codes to allow the manual to be more easily updated.",
      start: moment("01 06 2017", "DD MM YYYY"),
      end: moment("30 08 2017", "DD MM YYYY"),
      cssClass: "youthHQ",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Repair Technician",
      company: "Alberta Computers For Schools",
      imageSrc: "ACFS.png",
      description:
        "I worked with a team to repair and refurbish computers donated to us, in order \
        to send them to schools and other not for profit organisations. This co-op \
        position has provided experience in building, refurbishing, and troubleshooting \
        issues with many models of desktop and laptop computers. It also presented the \
        opportunity to work as an IT service provider for the competitors of the Skills \
        Canada provincial and national competitions as ACFS helped to provide computers, \
        equipment, and support staff for the events. ",
      start: moment("01 04 2018", "DD MM YYYY"),
      end: moment("30 08 2018", "DD MM YYYY"),
      cssClass: "acfs",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Social Media Youth Intern",
      company: "Alberta Computers For Schools",
      imageSrc: "ACFS.png",
      description:
        "I worked part-time with Alberta Computers For Schools to manage their social media \
        presence on Facebook, Twitter, and Instagram, and to develop marketing solutions to \
        improve brand recognition.",
      start: moment("01 09 2018", "DD MM YYYY"),
      end: moment("30 04 2019", "DD MM YYYY"),
      cssClass: "acfs",
      fullTime: false,
    },
  ],
  [
    <TimelineEvent>{
      title: "Technical Solutions Analyst Student",
      company: "PCL Construction",
      imageSrc: "PCL.png",
      description:
        "I worked with PCL as a Technical Solutions Analyst Student. I worked in C# to develop \
        an Add-In for a 3D Virtual Construction Software to facilitate Data Extraction for the \
        purposes of Data Analysis. I also worked in C#, HTML and JavaScript to develop a web \
        application to allow viewing 3D models and extracting data from a cloud based platform.",
      start: moment("01 01 2019", "DD MM YYYY"),
      end: moment("30 08 2019", "DD MM YYYY"),
      cssClass: "pcl",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Technical Solutions Analyst Student",
      company: "PCL Construction",
      imageSrc: "PCL.png",
      description:
        "I worked with PCL as a Technical Solutions Analyst Student. I worked in C# to develop \
        an Add-In for a 3D Virtual Construction Software to facilitate Data Extraction for the \
        purposes of Data Analysis. I also worked in C#, HTML and JavaScript to develop a web \
        application to allow viewing 3D models and extracting data from a cloud based platform.",
      start: moment("01 09 2019", "DD MM YYYY"),
      end: moment("30 11 2019", "DD MM YYYY"),
      cssClass: "pcl",
      fullTime: false,
    },
    <TimelineEvent>{
      title: "Software Developer Student",
      company: "PCL Construction",
      imageSrc: "PCL.png",
      description:
        "During my time as a Software Developer Student, I had the opportunity to work on a number \
        of different interesting projects. Initially, I rotated between 3 different projects, spending \
        a few weeks with each, before being assigned a more permanent position with a new project that \
        I was able to help create from the ground up as the primary developer during it's first year or \
        so. Overall, I have worked on 4 different servers, 2 different Angular websites and 5 different \
        Xamarin based mobile applications. I also had the opportunity to integrate API calls from an \
        external company into our system, develop control menchanisms for external hardware through \
        a mobile application.",
      start: moment("01 05 2020", "DD MM YYYY"),
      end: moment("30 12 2020", "DD MM YYYY"),
      cssClass: "pcl",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Software Developer Student",
      company: "PCL Construction",
      imageSrc: "PCL.png",
      description:
        "During my time as a Software Developer Student, I had the opportunity to work on a number \
        of different interesting projects. Initially, I rotated between 3 different projects, spending \
        a few weeks with each, before being assigned a more permanent position with a new project that \
        I was able to help create from the ground up as the primary developer during it's first year or \
        so. Overall, I have worked on 4 different servers, 2 different Angular websites and 5 different \
        Xamarin based mobile applications. I also had the opportunity to integrate API calls from an \
        external company into our system, develop control menchanisms for external hardware through \
        a mobile application.",
      start: moment("01 02 2021", "DD MM YYYY"),
      end: moment("30 05 2021", "DD MM YYYY"),
      cssClass: "pcl",
      fullTime: false,
    },
    <TimelineEvent>{
      title: "Software Developer Student",
      company: "PCL Construction",
      imageSrc: "PCL.png",
      description:
        "During my time as a Software Developer Student, I had the opportunity to work on a number \
        of different interesting projects. Initially, I rotated between 3 different projects, spending \
        a few weeks with each, before being assigned a more permanent position with a new project that \
        I was able to help create from the ground up as the primary developer during it's first year or \
        so. Overall, I have worked on 4 different servers, 2 different Angular websites and 5 different \
        Xamarin based mobile applications. I also had the opportunity to integrate API calls from an \
        external company into our system, develop control menchanisms for external hardware through \
        a mobile application.",
      start: moment("01 06 2021", "DD MM YYYY"),
      end: moment("30 08 2021", "DD MM YYYY"),
      cssClass: "pcl",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Software Developer Student",
      company: "PCL Construction",
      imageSrc: "PCL.png",
      description:
        "During my time as a Software Developer Student, I had the opportunity to work on a number \
        of different interesting projects. Initially, I rotated between 3 different projects, spending \
        a few weeks with each, before being assigned a more permanent position with a new project that \
        I was able to help create from the ground up as the primary developer during it's first year or \
        so. Overall, I have worked on 4 different servers, 2 different Angular websites and 5 different \
        Xamarin based mobile applications. I also had the opportunity to integrate API calls from an \
        external company into our system, develop control menchanisms for external hardware through \
        a mobile application.",
      start: moment("01 09 2021", "DD MM YYYY"),
      end: moment("30 04 2022", "DD MM YYYY"),
      cssClass: "pcl",
      fullTime: false,
    },
  ],
  [
    <TimelineEvent>{
      title: "First Year Engineering",
      company: "Red Deer College",
      imageSrc: "rdc.png",
      description:
        "I took the first year of the Engineering program at Red Deer College. Red Deer College works \
        closely with the University of Alberta to ensure that the courses offered in this program are \
        fully transferable. In order to also be transferrable with other universities, RDC includes extra \
        computer engineering curriculum that is not included in the first year program at the University of \
        Alberta. \n \
        I am extremely thankful for this exposure to C++ and the arduino, because it was this content that \
        made me chose to specialize into Computer Engineering. I originally intended to specialize into \
        Chemical Engineering or Engineering Physics. Instead, I was able to discover my passion for \
        programming that has lead me to my current career path.",
      start: moment("01 09 2016", "DD MM YYYY"),
      end: moment("30 04 2017", "DD MM YYYY"),
      cssClass: "rdc",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Engineering - Software Co-op Option",
      company: "University of Alberta",
      imageSrc: "Engineering_Co-op_Logo.png",
      description:
        "I'm currently in my final year of the Computer Engineering Co-op program at the \
        University of Alberta, in the Software Co-op Option. I am on track to graduate in \
        the winter term of 2022.",
      start: moment("01 09 2017", "DD MM YYYY"),
      end: moment("30 04 2018", "DD MM YYYY"),
      cssClass: "university",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Engineering - Software Co-op Option",
      company: "University of Alberta",
      imageSrc: "Engineering_Co-op_Logo.png",
      description:
        "I'm currently in my final year of the Computer Engineering Co-op program at the \
        University of Alberta, in the Software Co-op Option. I am on track to graduate in \
        the winter term of 2022.",
      start: moment("01 09 2018", "DD MM YYYY"),
      end: moment("30 12 2018", "DD MM YYYY"),
      cssClass: "university",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Engineering - Software Co-op Option",
      company: "University of Alberta",
      imageSrc: "Engineering_Co-op_Logo.png",
      description:
        "I'm currently in my final year of the Computer Engineering Co-op program at the \
        University of Alberta, in the Software Co-op Option. I am on track to graduate in \
        the winter term of 2022.",
      start: moment("01 09 2019", "DD MM YYYY"),
      end: moment("30 04 2020", "DD MM YYYY"),
      cssClass: "university",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Engineering - Software Co-op Option",
      company: "University of Alberta",
      imageSrc: "Engineering_Co-op_Logo.png",
      description:
        "I'm currently in my final year of the Computer Engineering Co-op program at the \
        University of Alberta, in the Software Co-op Option. I am on track to graduate in \
        the winter term of 2022.",
      start: moment("01 09 2019", "DD MM YYYY"),
      end: moment("30 04 2020", "DD MM YYYY"),
      cssClass: "university",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Engineering - Software Co-op Option",
      company: "University of Alberta",
      imageSrc: "Engineering_Co-op_Logo.png",
      description:
        "I'm currently in my final year of the Computer Engineering Co-op program at the \
        University of Alberta, in the Software Co-op Option. I am on track to graduate in \
        the winter term of 2022.",
      start: moment("01 01 2021", "DD MM YYYY"),
      end: moment("30 04 2021", "DD MM YYYY"),
      cssClass: "university",
      fullTime: true,
    },
    <TimelineEvent>{
      title: "Computer Engineering - Software Co-op Option",
      company: "University of Alberta",
      imageSrc: "Engineering_Co-op_Logo.png",
      description:
        "I'm currently in my final year of the Computer Engineering Co-op program at the \
        University of Alberta, in the Software Co-op Option. I am on track to graduate in \
        the winter term of 2022.",
      start: moment("01 09 2021", "DD MM YYYY"),
      end: moment("30 04 2022", "DD MM YYYY"),
      cssClass: "university",
      fullTime: true,
    },
  ],
];
