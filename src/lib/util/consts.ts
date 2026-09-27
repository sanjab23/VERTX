import { PUB_DISABLE_ALL_EXTERNAL_REQUESTS, PUB_ENV } from "$env/static/public";

export const GITHUB_URL_VERT = "https://github.com/sanjab23/VERTX";
export const GITHUB_URL_VERTD = "https://github.com/sanjab23/VERTX";
export const GITHUB_API_URL = "https://api.github.com/repos/sanjab23/VERTX";
export const DISCORD_URL = "https://github.com/sanjab23/VERTX";
export const VERT_NAME = "VertX • By Jagan";
export const CONTACT_EMAIL = "jagan@newhorizonindia.edu";

// i'm not entirely sure this should be in consts.ts, but it is technically a constant as .env is static for VERT
export const DISABLE_ALL_EXTERNAL_REQUESTS =
	PUB_DISABLE_ALL_EXTERNAL_REQUESTS === "true";

export const GB = 1024 * 1024 * 1024;
