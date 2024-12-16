const fs = require("fs");

// Charger le fichier JSON
fs.readFile(
  "/Users/juliettecattin/Downloads/cities.json",
  "utf-8",
  (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      return;
    }

    // Parser le contenu JSON
    const jsonData = JSON.parse(data);

    // Extraire les champs souhaités
    const filteredData = jsonData.cities.map((item) => ({
      label: item.label,
      latitude: item.latitude,
      longitude: item.longitude,
    }));

    // Sauvegarder les résultats dans un nouveau fichier
    fs.writeFile(
      "filtered_data.json",
      JSON.stringify(filteredData, null, 4),
      (err) => {
        if (err) {
          console.error("Erreur lors de l'écriture du fichier :", err);
        } else {
          console.log(
            'Extraction réussie, fichier sauvegardé sous "filtered_data.json".',
          );
        }
      },
    );
  },
);
