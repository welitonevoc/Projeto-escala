import { gapi } from 'gapi-script';

const SPREADSHEET_ID = '1n3APlCM3A09w_RtjudFwiykmDNDrSiAQsrbMgaYKY6w';

// Nota: Para uso em produção no front-end sem backend, o ideal é usar uma API Key 
// ou OAuth2. Como estamos em um ambiente de transição, vamos usar a abordagem 
// de API Key se disponível, ou instruir o usuário.
const API_KEY = 'SUA_API_KEY_AQUI'; 

export const initClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
        resolve(true);
      }).catch((err: any) => {
        reject(err);
      });
    });
  });
};

export const getSheetData = async (range: string) => {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
    });
    return response.result.values;
  } catch (error) {
    console.error('Erro ao buscar dados do Sheets:', error);
    throw error;
  }
};

export const updateSheetData = async (range: string, values: any[][]) => {
  try {
    // Nota: Update requer autenticação OAuth2 no front-end.
    // Para simplificar agora, vamos focar na leitura.
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      resource: { values },
    });
    return response.result;
  } catch (error) {
    console.error('Erro ao atualizar dados no Sheets:', error);
    throw error;
  }
};
