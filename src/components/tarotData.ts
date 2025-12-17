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
    altBack: "Tarot card back – Arcana Code Forges",
    altFront: "Custom Responsive Website Design",
  },
  {
    id: "full-cycle-dev",
    backImg: "./images/TarotBack.png",
    frontImg: "./images/softwaredevelopmentfront.png",
    altBack: "Tarot card back – Arcana Code Forges",
    altFront: "Custom Full-Cycle Development",
  },
  {
    id: "mentoring",
    backImg: "./images/TarotBack.png",
    frontImg: "./images/mentoringfront.png",
    altBack: "Tarot card back – Arcana Code Forges",
    altFront: "Mentoring for Beginners",
  },
];

export default tarotCards;
