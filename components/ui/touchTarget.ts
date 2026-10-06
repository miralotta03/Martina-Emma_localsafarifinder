// Större tryckyta för små länkar och knappar: ett osynligt ::after som når
// 12 px utanför elementet åt alla håll (minst 44 px för en 20 px hög länk).
// Påverkar inte layouten, så desktop ser likadan ut. Elementet får
// position: relative; använd inte på element som redan är positionerade.
export const touchTarget =
  "relative after:absolute after:-inset-3 after:content-['']";
