export const FETCH_GAMING_SESSIONS = "FETCH_GAMING_SESSIONS";
export const FETCH_GAMING_SESSIONS_RESULT = "FETCH_GAMING_SESSIONS_RESULT";
export const FETCH_GAMING_SESSIONS_ERROR = "FETCH_GAMING_SESSIONS_ERROR";
export const FETCH_GAMING_SESSIONS_NO_DATA = "FETCH_GAMING_SESSIONS_NO_DATA";
export const REFRESH_GAMING_SESSIONS = "REFRESH_GAMING_SESSIONS";
export const LOAD_MORE_GAMING_SESSIONS = "LOAD_MORE_GAMING_SESSIONS";
export const LOAD_MORE_GAMING_SESSIONS_RESULT =
  "LOAD_MORE_GAMING_SESSIONS_RESULT";

export const fetchGamingSessions = endpoint => ({
  type: FETCH_GAMING_SESSIONS,
  endpoint
});

export const refreshGamingSessions = endpoint => ({
  type: REFRESH_GAMING_SESSIONS,
  endpoint
});

export const loadMoreGamingSessions = endpoint => ({
  type: LOAD_MORE_GAMING_SESSIONS,
  endpoint
});
