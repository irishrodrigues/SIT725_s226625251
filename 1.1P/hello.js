
const name = "Irish Rodrigues";
console.log(`Hello, ${name}! Welcome to SIT725.`);


const skills = ["JavaScript", "Node.js", "Git", "GitHub"];
skills.forEach((skill, i) => console.log(`${i + 1}. ${skill}`));

function grade(mark) {
  if (mark >= 80) return "HD";
  if (mark >= 70) return "D";
  if (mark >= 60) return "C";
  if (mark >= 50) return "P";
  return "N";
}
console.log("Mark 85 =>", grade(85));
console.log("Mark 55 =>", grade(55));