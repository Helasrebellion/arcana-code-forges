export type TarotCardData = {
  id: string;
  frontImg: string;
  backImg: string;
  altFront: string;
  altBack: string;
};

export const tarotCards: TarotCardData[] = [
  {
    id: "web-design",
    backImg: "./images/TarotBack.png",
    frontImg: "./images/websitedesignfront.png",
    altBack: "Tarot card back",
    altFront: "Custom Responsive Website Design - Our Custom Responsive Website Design service offers tailored solutions to meet your unique needs. We specialize in creating visually stunning and user-friendly websites that adapt seamlessly to different devices and screen sizes. Using a combination of programming languages and popular frameworks, we ensure that your website not only looks great but also delivers an exceptional user experience. Whether you need a simple portfolio site or a complex e-commerce platform, we’ve got you covered. Let us bring your vision to life on the web.",
  },
  {
    id: "full-cycle-dev",
    backImg: "./images/TarotBack.png",
    frontImg: "./images/softwaredevelopmentfront.png",
    altBack: "Tarot card back",
    altFront: "Custom Full-Cycle Development - Our Custom Full-Cycle Development service offers end-to-end solutions for your software needs. From conceptualization and design to development, testing, and deployment, we handle every aspect of the development process. Using a variety of programming languages and frameworks, we build robust and scalable software solutions tailored to your requirements. Whether you’re launching a new web application or updating an existing system, we’re here to help you every step of the way.",
  },
  {
    id: "mentoring",
    backImg: "./images/TarotBack.png",
    frontImg: "./images/mentoringfront.png",
    altBack: "Tarot card back",
    altFront: "Mentoring for Beginners - Our Mentoring for Beginners service provides aspiring coders with personalized guidance and support as they embark on their coding journey. We offer one-on-one mentoring sessions tailored to your individual learning needs, covering fundamental programming concepts, project-based learning, and career guidance. Our curriculum is designed to help you build a strong foundation in coding, develop problem-solving skills, and navigate the challenges of starting a career in tech. Whether you’re interested in learning web or software development, we’re here to help you succeed.",
  },
];

export default tarotCards;
