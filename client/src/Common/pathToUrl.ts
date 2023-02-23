export default function pathToUrl(url: string, ids: string[]) {
  // ids.forEach((id) => {
  //   if (!id) {
  //     throw Error("id undefined");
  //   }
  // });

  const matches = url.match(/:([^\/]*)/g);

  if (!matches) {
    throw Error("No matches found");
  }
  if (matches.length !== ids.length) {
    throw Error(
      `incorrect amount of ids provided in params, ${matches?.length} matches and ${ids.length} ids`
    );
  }
  matches.forEach((match, index) => {
    url = url.replace(match, ids[index]);
  });

  return url;
}
