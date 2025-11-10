// Приклад 1: var – джерело помилок vs const/let

console.log("--- Приклад 1 (ДО): var ---");
(function () {
  var name = "Ivan";
  if (true) {
    var name = "Petro"; // Змінна var не має блочної області видимості, тому відбувається перезапис
  }
  console.log(name); // Виведе "Petro", бо змінна одна й та сама в межах функції
})(); // IIFE використано для ізоляції області видимості

console.log("--- Приклад 1 (ПІСЛЯ): const ---");
(function () {
  const name = "Ivan";
  if (true) {
    const name = "Petro"; // Тут створюється нова змінна у власному блоці
  }
  console.log(name); // Виведе "Ivan", бо зовнішня змінна не змінювалась
})();

// Приклад 2: "Магічні числа"

// Тимчасові дані для демонстрації
const user = { role: 3 };
const session = { duration: 90000 };

console.log("--- Приклад 2 (ДО): Магічні числа ---");
if (user.role === 3) {
  // Незрозуміло, що означає 3 без контексту
  console.log("Користувач має роль 3");
}
if (session.duration > 86400) {
  // 86400 — теж «магічне» число без пояснення
  console.log("Сесія триває довше 86400");
}

console.log("--- Приклад 2 (ПІСЛЯ): Константи ---");
const ADMIN_ROLE = 3;
const SECONDS_IN_A_DAY = 86400;

if (user.role === ADMIN_ROLE) {
  // Код став зрозумілішим: тепер видно, що це роль адміністратора
  console.log("Користувач має роль Адміна");
}
if (session.duration > SECONDS_IN_A_DAY) {
  // Константа пояснює значення — це доба у секундах
  console.log("Сесія триває довше одного дня");
}

// Приклад 3: "Пастка" булевих значень

console.log("--- Приклад 3 (ДО): Пастка булевих значень ---");

// Функція з великою кількістю булевих аргументів
function createUser_before(
  name: string,
  pass: string,
  isAdmin: boolean,
  isTemp: boolean,
  isActive: boolean
) {
  console.log(`Створено (до): ${name}, admin: ${isAdmin}`);
  // Код складно читати, бо важко зрозуміти, що означає кожен параметр
}

// Виклик: значення неочевидні
createUser_before("ivan", "pass123", true, false, true);

console.log("--- Приклад 3 (ПІСЛЯ): Об'єкт налаштувань ---");

// Тепер функція приймає об’єкт — це зручніше і читабельніше
function createUser_after({
  name,
  password,
  isAdmin = false,
}: {
  name: string;
  password?: string;
  isAdmin?: boolean;
}) {
  console.log(`Створено (після): ${name}, admin: ${isAdmin}`);
  // Параметри тепер мають очевидні назви
}

// Виклик став самодокументованим
createUser_after({
  name: "ivan",
  password: "pass123",
  isAdmin: true,
});

// Можна викликати й без необов’язкових параметрів
createUser_after({
  name: "petro",
});

