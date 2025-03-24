const canvas = document.getElementById("loveCanvas");
  const stage = new createjs.Stage(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const w = canvas.width;
  const h = canvas.height;

  // Text in center
  const text = new createjs.Text(
    "",
    "bold 28px Arial",
    "#fff"
  );
  text.textAlign = "center";
  text.y = h / 2;
  text.x = w / 2;
  stage.addChild(text);

  // Floating colorful stars array
  const stars = [];
  const colors = ["#ff4d4d", "#ff66cc", "#66ccff", "#99ff66", "#ffff66", "#ff9966", "#cc66ff"];

  for (let i = 0; i < 300; i++) {
    const star = new createjs.Shape();
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.graphics.beginFill(color).drawPolyStar(0, 0, 5 + Math.random() * 15, 5, 0.6, -90);
    star.x = Math.random() * canvas.width;
    star.y = Math.random() * canvas.height;
    star.alpha = 0.5 + Math.random() * 0.5;
    star.scaleX = star.scaleY = 0.5 + Math.random() * 1.5;
    stage.addChild(star);
    stars.push(star);
  }

  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick() {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.y -= 1 + Math.random() * 2;
      if (star.y < -20) {
        star.y = canvas.height + 20;
        star.x = Math.random() * canvas.width;
      }
    }
    stage.update();
  }