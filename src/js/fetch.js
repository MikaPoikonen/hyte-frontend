/**
 * Fetches JSON data from APIs
 *Annetaan tätä optioni jos halutaan iskeä dataa serverille eli pitää olla ja tärkeä
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 *
 * @returns {Object} response json data
 */
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "An error occurred" };
    }
    return await response.json(); // Return successful response data
  } catch (error) {
    console.error("fetchData() error:", error.message);
    return { error: error.message };
  }
};

export { fetchData }; //muista export niin saa muille tiedostoille käyttöön
