import { displayFacilityMinerals } from "./FacilityMinerals.js";
import { renderColonyMinerals } from "./ColonyMinerals.js";
import { API_BASE_URL } from "./config.js";

export const colonyState = {
  colonyId: 0,
  mineralId: 0,
};

export const facilityState = {
  facilityId: 0,
  mineralId: 0,
  count: 0,
};

export const setFacility = (facilityId) => {
  facilityState.facilityId = facilityId;
};

export const setColony = (colonyId) => {
  colonyState.colonyId = colonyId;
};

export const setMineral = (mineralId) => {
  colonyState.mineralId = mineralId;
  facilityState.mineralId = mineralId;
  console.log(facilityState);
};

export const colonyCount = (colonyCount) => {
  colonyState.count = colonyCount;
  console.log(colonyState);
};

export const facilityCount = (facilityCount) => {
  facilityState.count = facilityCount;
};

export const purchaseMineral = async () => {
  try {
    // Fetch current state
    const [colonies, facilities] = await Promise.all([
      fetch(
        `${API_BASE_URL}/colonyMinerals?colonyId=${colonyState.colonyId}`
      ).then((res) => res.json()),
      fetch(
        `${API_BASE_URL}/facilityMinerals?facilityId=${facilityState.facilityId}&mineralId=${facilityState.mineralId}`
      ).then((res) => res.json()),
    ]);

    const existingMineral = colonies.find(
      (colony) => colony.mineralId === parseInt(colonyState.mineralId)
    );
    const facilityMineral = facilities[0];

    if (facilityMineral.count <= 0) {
      throw new Error("Not enough minerals in facility");
    }

    if (existingMineral) {
      // Update existing colony mineral
      const colonyOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: existingMineral.id,
          colonyId: existingMineral.colonyId,
          mineralId: existingMineral.mineralId,
          count: existingMineral.count + 1,
        }),
      };
      await fetch(
        `${API_BASE_URL}/colonyMinerals/${existingMineral.id}`,
        colonyOptions
      );
    } else {
      // Create new colony mineral
      const colonyOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          colonyId: parseInt(colonyState.colonyId),
          mineralId: parseInt(colonyState.mineralId),
          count: 1,
        }),
      };
      await fetch(`${API_BASE_URL}/colonyMinerals`, colonyOptions);
    }

    // Update facility mineral count
    const facilityOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: facilityMineral.id,
        facilityId: facilityMineral.facilityId,
        mineralId: facilityMineral.mineralId,
        count: facilityMineral.count - 1,
      }),
    };
    await fetch(
      `${API_BASE_URL}/facilityMinerals/${facilityMineral.id}`,
      facilityOptions
    );

    await displayFacilityMinerals(facilityState.facilityId);
    document.dispatchEvent(new CustomEvent("facilityUpdated"));
  } catch (error) {
    console.error("Error during purchase:", error);
    alert(error.message);
  }
};
