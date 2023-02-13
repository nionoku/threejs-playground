# core

## Prepare

1. Move `.env.local.example` to `.env.local`
2. Set `VITE_APP_BASE_PATH` (this project location, by default "/") and `VITE_APP_TOP_ORIGIN` (core controller application url) enviroment variables

## Build for production

`tsc && vite build --base [base path] --mode production`
