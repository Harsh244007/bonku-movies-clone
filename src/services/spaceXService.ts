import { Movie } from "../configs/types/Types";

const LOCAL_STORAGE_KEY = "localstoredspacexdata";
const dataCache: Record<string, Movie[]> = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
);

export const fetchSpaceXData = async (
  string: string
): Promise<Movie[]> => {
  const filtersString: string = JSON.stringify(string);

  if (dataCache[filtersString]) {
    return dataCache[filtersString];
  }
 {/* @ts-ignore  for vercel deployment*/}
  console.log("queryString: ",string)
  const fetchedData = await fetch(
    `https://bonkumovies.com/wp-json/dooplay/search/?keyword=${string}&nonce=1cdb089570`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .catch(() => []);

  dataCache[filtersString] = fetchedData;

  return fetchedData;
};
