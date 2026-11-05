"use strict";

const mapElement = document.getElementById("elections-map");
const assistantElement = document.getElementById("elections-assistant");
const mapStatus = document.getElementById("map-status");
const assistantStatus = document.getElementById("assistant-status");
let mapHasError = false;

function setStatus(element, message, state = "info") {
  element.textContent = message;
  element.dataset.state = state;
}

// This classic script attaches listeners before the deferred SDK module upgrades the elements.
mapElement.addEventListener("arcgisViewReadyChange", () => {
  if (mapElement.ready && !mapHasError) {
    setStatus(mapStatus, "Map ready. Expand the legend to explore voter turnout and polling stations.");
  }
});

function showMapError(message) {
  mapHasError = true;
  setStatus(mapStatus, message, "error");
}

mapElement.addEventListener("arcgisLoadError", () => {
  showMapError("The elections map could not load. Check connectivity and access, then reload.");
});

mapElement.addEventListener("arcgisViewReadyError", () => {
  showMapError("The map view could not initialize. Check browser WebGL support, then reload.");
});

mapElement.addEventListener("arcgisViewLayerviewCreateError", () => {
  showMapError("A map layer could not load. Queries may be incomplete; check service access and reload.");
});

assistantElement.addEventListener("arcgisReady", () => {
  setStatus(assistantStatus, "Assistant ready. Try a suggested prompt.");
});

assistantElement.addEventListener("arcgisSubmit", () => {
  setStatus(assistantStatus, "Processing your request...");
});

assistantElement.addEventListener("arcgisResponse", () => {
  if (assistantStatus.dataset.state !== "error") {
    setStatus(assistantStatus, "Response received. Check the answer and any requested action on the map.");
  }
});

assistantElement.addEventListener("arcgisCancel", () => {
  setStatus(assistantStatus, "Request cancelled. You can try another prompt.");
});

assistantElement.addEventListener("arcgisError", () => {
  setStatus(
    assistantStatus,
    "The assistant encountered an error. Check its notice, sign-in, organization AI/beta permissions, and service access. Reload if needed.",
    "error"
  );
});

document.getElementById("arcgis-sdk").addEventListener("error", () => {
  showMapError("The ArcGIS SDK could not load. Check access to js.arcgis.com, then reload.");
  setStatus(assistantStatus, "The assistant cannot load without the ArcGIS SDK.", "error");
});

customElements.whenDefined("arcgis-assistant")
  .then(async () => {
    await assistantElement.componentOnReady();
    assistantElement.suggestedPrompts = [
      "What can you help me do with this map?",
      "How many polling stations are in the Polling Stations layer?",
      "Zoom to the polling district with the highest Turnout Percent.",
      "What is the average Turnout Percent across polling districts?",
      "What is the total Voted across all polling districts?"
    ];
  })
  .catch(() => {
    setStatus(assistantStatus, "The assistant component could not initialize. Reload and check SDK access.", "error");
  });
