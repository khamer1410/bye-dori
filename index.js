(function () {
  function injectMemes() {
    return fetch("Dori%20meme%20-%20Sheet1.csv")
      .then((result) => result.text())
      .then((csvString) => {
        const memeTemplateElement = document.querySelector("#template--meme");
        const memeTemplate = memeTemplateElement.cloneNode(true);
        memeTemplate.removeAttribute("id");

        const memesMatch = [
          ...csvString.matchAll(/^([^,^@]+),(.+),([^,]*)$/gm),
        ];

        shuffle(memesMatch);

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
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  injectMemes().then(() => {
    // add intersectionObserver observe memes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.1,
      }
    );

    const memes = document.querySelectorAll(".meme");
    memes.forEach((meme) => observer.observe(meme));
  });

  const noBtn = document.querySelector("#no-btn");

  noBtn.addEventListener("click", () => {
    document.getElementById("rickRoll").play();
    noBtn.textContent = "You've been RickRolled! Scroll down XD"

  });

})();
