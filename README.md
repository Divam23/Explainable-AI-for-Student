# Explainable AI for Student Performance Prediction

This project predicts a student's academic performance using a machine learning model and explains the prediction with feature-level contributions. It also provides AI-generated strengths, weaknesses, and improvement suggestions based on the submitted profile.

The application is split into:

- `frontend/`: React + TypeScript + Vite user interface
- `backend/`: FastAPI API, trained model, SHAP-based explainability, and Gemini-powered suggestions

## Features

- Predicts student performance score on a `0-100` scale
- Explains which input factors increased or decreased the prediction
- Shows positive and negative contributors in a visual analysis page
- Generates personalized strengths, weaknesses, and action steps
- Uses a clean multi-page frontend for input, analysis, and results

## Project Structure

```text
EXPLAINABLE AI PROJECT/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── gemini/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── main.py
│   ├── dataset/
│   ├── models/
│   ├── notebooks/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.example
└── README.md
```

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Axios
- Backend: FastAPI, scikit-learn, SHAP, pandas, NumPy
- AI suggestions: Google Gemini API

## Prerequisites

Install these before running the project:

- Node.js `18+` or `20+` recommended
- npm
- Python `3.10+` recommended
- Git

## Local Installation

Follow the steps in the same order.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd "EXPLAINABLE AI PROJECT"
```

### 2. Set up the backend

Move into the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment:

PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Command Prompt:

```cmd
.venv\Scripts\activate.bat
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Create the backend environment file:

```bash
copy .env.example .env
```

If you are on macOS/Linux, use:

```bash
cp .env.example .env
```

Open `backend/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Notes:

- The Gemini key is recommended for AI suggestions.
- If the key is missing or invalid, the main prediction flow can still work, but AI suggestions may be empty.
- Start the backend from inside the `backend/` directory, otherwise the model path may not resolve correctly.

Run the backend server:

```bash
uvicorn app.main:app --reload
```

The backend should start at:

```text
http://localhost:8000
```

You can test it in the browser:

```text
http://localhost:8000/docs
```

### 3. Set up the frontend

Open a new terminal and move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file:

```bash
copy .env.example .env
```

If you are on macOS/Linux, use:

```bash
cp .env.example .env
```

The default frontend environment file should look like this:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend should start at:

```text
http://localhost:5173
```

## How to Run the Full Project

To run the project locally:

1. Start the backend from the `backend/` directory using `uvicorn app.main:app --reload`
2. Start the frontend from the `frontend/` directory using `npm run dev`
3. Open `http://localhost:5173`
4. Fill in the form on the prediction page
5. Submit the form to view the analysis report, feature impact explanation, and AI suggestions

## Using ngrok to Avoid CORS or Network Access Issues

If your frontend cannot reach the backend reliably in your local environment, you can expose the FastAPI server through `ngrok` and use the public URL in the frontend.

### 1. Start the backend locally

From the `backend/` folder:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start ngrok

In a new terminal, expose port `8000`:

```bash
ngrok http 8000
```

ngrok will give you a public forwarding URL like:

```text
https://your-project-name.ngrok-free.app
```

### 3. Update the frontend environment variable

Open `frontend/.env` and set:

```env
VITE_BACKEND_URL=https://your-project-name.ngrok-free.app
```

### 4. Restart the frontend

If the frontend is already running, stop it and start it again:

```bash
npm run dev
```

### 5. Open the app

Now open:

```text
http://localhost:5173
```

Important notes:

- ngrok changes the public URL each time unless you are using a reserved domain
- whenever the ngrok URL changes, update `frontend/.env` again
- keep the backend server and ngrok tunnel running at the same time
- if you use ngrok often, it is a good option for demos and cross-device testing

## API Overview

### `GET /`

Health-style test route.

Example response:

```json
{
  "message": "Hello World"
}
```

### `POST /predict`

Accepts student data and returns:

- predicted score
- encoded input
- explanation lines
- feature contribution values
- AI suggestions

## Sample Workflow

1. User enters academic, lifestyle, and environmental details
2. Frontend sends the payload to the FastAPI backend
3. The backend encodes the input and runs the trained model
4. SHAP computes feature-wise contributions for explainability
5. Gemini generates strengths, weaknesses, and actionable suggestions
6. The frontend displays the final analysis report

## Troubleshooting

### Backend does not start

- Make sure you are running the command inside the `backend/` folder
- Make sure the virtual environment is activated
- Re-run `pip install -r requirements.txt`

### Frontend cannot connect to backend

- Make sure the backend is running on `http://localhost:8000`
- Make sure `frontend/.env` contains `VITE_BACKEND_URL=http://localhost:8000`
- Restart the frontend after changing the `.env` file
- If local access still fails, run the backend through ngrok and set `VITE_BACKEND_URL` to the ngrok HTTPS URL

### AI suggestions are missing

- Check whether `backend/.env` contains a valid `GEMINI_API_KEY`
- Review backend terminal logs for Gemini-related errors
- The prediction endpoint can still respond even if AI suggestions fail

### Port already in use

Use a different port and update the frontend environment variable if needed.

Example:

```bash
uvicorn app.main:app --reload --port 8001
```

Then update:

```env
VITE_BACKEND_URL=http://localhost:8001
```

## Important Notes

- This is an academic project intended for educational and research use
- Predictions are model-based estimates and should not be treated as final academic decisions
- The included trained model file is loaded from `backend/models/my_model.pkl`
- The backend also uses `backend/dataset/background_data.csv` for SHAP explainability

## Future Improvements

- Add Docker support for one-command setup
- Add automated tests for API and UI flows
- Add model training documentation and reproducibility steps
- Add deployment instructions for cloud hosting

## License

This project currently does not define a license. I will add a license file if it is required in the future.
