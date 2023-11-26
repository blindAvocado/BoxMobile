export function declination(number, txt) {
  var cases = [2, 0, 1, 1, 1, 2];
  return `${number} ${txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]}`;
}

export function removeHtml(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

export function normalizeAirDate(dateStr) {
  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  return formattedDate;
}

export function translateGenres(genresArr) {
  const ru = {
    "Drama": "Драма",
    "Family": null,
    "Crime": "Криминал",
    "Supernatural": "Сверхъестественное",
    "Action": "Боевик",
    "Adventure": "Приключения",
    "Science-Fiction": "Научная фантастика"
  }

  const resultArr = [];

  for (const genre of genresArr) {
    if (ru[genre] && ru[genre] !== null) {
      resultArr.push(ru[genre]);
    } 
  }

  return resultArr;
}

export function translateCountry(country) {
  const ru = {
    "United States": "США",
    "Canada": "Канада",
    "UK": "Великобритания",
    "Turkey": "Турция",
    "Mexico": "Мексика",
    "Russia": "Россия",
    "USSR": "СССР"
  }

  if (ru[country]) return ru[country];

  return country;
}