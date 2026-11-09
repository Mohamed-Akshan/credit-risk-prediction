const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export async function assessCreditRisk(application, signal) {
  let response;
  try {
    response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('Cannot connect to FastAPI. Start the backend on port 8000 and check its CORS settings.');
  }

  if (!response.ok) {
    let detail = `Prediction failed (HTTP ${response.status}).`;
    try {
      const data = await response.json();
      if (Array.isArray(data.detail)) {
        detail = data.detail.map((item) => `${item.loc?.slice(-1)?.[0] || 'Field'}: ${item.msg}`).join('; ');
      } else if (typeof data.detail === 'string') {
        detail = data.detail;
      }
    } catch { /* retain HTTP status message */ }
    throw new Error(detail);
  }
  return response.json();
}
