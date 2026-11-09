
const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://credit-risk-api-mu.vercel.app"
).replace(/\/+$/, "");

export async function assessCreditRisk(application) {
  let response;

  try {
    response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });
  } catch (error) {
    console.error("API URL:", `${API_URL}/predict`);
    console.error("Connection error:", error);

    throw new Error(
      "Cannot connect to the prediction API. Check the backend URL and CORS settings."
    );
  }

  if (!response.ok) {
    let message = `Prediction failed (HTTP ${response.status}).`;

    try {
      const data = await response.json();

      if (Array.isArray(data.detail)) {
        message = data.detail
          .map((item) => item.msg)
          .join("; ");
      } else if (typeof data.detail === "string") {
        message = data.detail;
      }
    } catch {
      // Keep the HTTP error message
    }

    throw new Error(message);
  }

  return response.json();
}
