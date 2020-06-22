import { getClient, wrapRequest } from ".";

type Data = {
  studentName: string;
  gender: string;
  classLevel: string;
  homeState: string;
  major: string;
  extracurricularActivity: string;
};

export async function getData(): Promise<Data[]> {
  const values = await getSheetByUrl(
    "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit",
    "Class Data!A2:F"
  );

  return values.map(
    ([
      studentName,
      gender,
      classLevel,
      homeState,
      major,
      extracurricularActivity,
    ]: string[]) => ({
      studentName,
      gender,
      classLevel,
      homeState,
      major,
      extracurricularActivity,
    })
  );
}

export async function getSheetByUrl(
  sheetUrl: string,
  range: string
): Promise<string[][]> {
  const path = new URL(sheetUrl).pathname;
  const re = new RegExp("/spreadsheets/d/(?<spreadsheetId>[^/]+)/", "g");

  const match = re.exec(path);
  if (match === undefined || match === null) {
    throw new Error();
  }

  const spreadsheetId = match!.groups!.spreadsheetId;

  const client = await getClient();
  return wrapRequest(async () => {
    // @ts-ignore
    const response = await client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const { values } = response.result;

    return values as string[][];
  });
}
