export interface MissionVisionContent {
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
}

export const missionVisionContent: MissionVisionContent = {
  mission: {
    title: "Our Mission",
    description:
      "To deliver rapid emergency medical response, exceptional patient care, and professional healthcare services while fostering teamwork, integrity, and continuous learning throughout XLANTIS City.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To become the benchmark for emergency medical services by combining innovation, professionalism, and compassion to build a safer and healthier community.",
  },
};