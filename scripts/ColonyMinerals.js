import { colonyCount } from "./TransientState.js";

export const renderColonyMinerals = async (governorData) => {
  try {
    // Updated fetch URL to match Web API endpoint
    const colonies = await fetch(
      `http://localhost:5000/colonyMinerals?colonyId=${governorData.colonyId}`
    ).then((res) => res.json());

    // Update colony title
    const colonyTitle = document.getElementById("colony__name");
    colonyTitle.innerHTML = `${governorData.colonyName} Minerals`;

    // Since the API doesn't expand mineral by default, we'll need to fetch minerals separately
    const minerals = await fetch("http://localhost:5000/minerals").then((res) =>
      res.json()
    );

    // Generate HTML by matching mineralId with minerals data
    const colonyHtml = colonies
      .map((colony) => {
        const mineral = minerals.find((m) => m.id === colony.mineralId);
        if (mineral) {
          return `<p>${colony.count} tons of ${mineral.name}</p>`;
        } else {
          console.warn("Mineral data is missing for colony:", colony);
          return `<p>${colony.count} tons of an unknown mineral</p>`;
        }
      })
      .join("");

    return colonyHtml;
  } catch (error) {
    console.error("Error rendering colony minerals:", error);
    return `<p>Error loading colony minerals</p>`;
  }
};
