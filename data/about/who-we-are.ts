export interface WhoWeAreContent {
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export const whoWeAreContent: WhoWeAreContent = {
  title: "Who We Are",
  description:
    "XLANTIS Medical Department is committed to delivering professional emergency medical services with excellence, teamwork, and compassion.",
  image: "/images/about/team.jpg",
  highlights: [
    "24/7 Emergency Response",
    "Professional Medical Team",
    "Advanced Medical Equipment",
    "Community Healthcare",
  ],
};