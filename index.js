(function () {
  fetch("Dori%20meme%20-%20Sheet1.csv")
    .then((result) => result.text())
    .then((csvString) => {
      const memeTemplateElement = document.querySelector("#template--meme");
      const memeTemplate = memeTemplateElement.cloneNode(true);
      memeTemplate.removeAttribute("id");

      const memesMatch = [...csvString.matchAll(/^([^,^@]+),(.+),([^,]*)$/gm)];
      memesMatch.forEach(([_, name, descriptionStr, imageStr]) => {
        const newMeme = memeTemplate.cloneNode(true);
        newMeme.querySelector(".name").innerHTML = name;

        const description = descriptionStr.startsWith('"')
          ? descriptionStr.substring(1, descriptionStr.length - 1)
          : descriptionStr;
        newMeme.querySelector(".description").innerHTML = description;

        let image = imageStr.replace("\r", "");
        if (image.includes("//giphy.com/")) {
          const gifId = image.match(/([^-]*)$/g)[0];
          gifId && (image = `https://i.giphy.com/media/${gifId}/giphy.gif`);
        }
        if (image) newMeme.querySelector(".image").src = image;
        else newMeme.querySelector(".image").remove();

        memeTemplateElement.parentElement.append(newMeme);
      });
    });

  const noBtn = document.querySelector("#no-btn");

  noBtn.addEventListener("click", () => {
    alert("CLICKED");
  });
})();
