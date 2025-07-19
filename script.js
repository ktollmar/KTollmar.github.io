const st = SplitText.create("p", { type: "chars", charsClass: "char" });

st.chars.forEach((char) => {
  gsap.set(char, { attr: { "data-content": char.innerHTML } });
});

const textBlock = document.querySelector(".text-block");

textBlock.onpointermove = (e) => {
  st.chars.forEach((char) => {
    const rect = char.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100)
      gsap.to(char, {
        overwrite: true,
        duration: 1.2 - dist / 100,
        scrambleText: {
          text: char.dataset.content,
          chars: ".:",
          speed: 0.5
        },
        ease: "none"
      });
  });
};
