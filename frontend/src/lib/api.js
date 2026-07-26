import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const getCountries = () => api.get("/countries").then((r) => r.data);
export const getConfig = () => api.get("/config").then((r) => r.data);
export const getProjects = (country) => api.get("/projects", { params: country ? { country } : {} }).then((r) => r.data);
export const getProject = (slug) => api.get(`/projects/${slug}`).then((r) => r.data);
export const getCourses = (country) => api.get("/courses", { params: country ? { country } : {} }).then((r) => r.data);
export const getCourse = (slug) => api.get(`/courses/${slug}`).then((r) => r.data);
export const createRegistration = (payload) => api.post("/registrations", payload).then((r) => r.data);
export const createCheckout = (payload) => api.post("/payments/checkout", payload).then((r) => r.data);
export const getPaymentStatus = (sessionId) => api.get(`/payments/status/${sessionId}`).then((r) => r.data);

// Category code -> tailwind colour classes for the badge chips.
export const CATEGORY_STYLES = {
  EDU: "bg-blue-100 text-blue-700",
  SOCI: "bg-brand-light text-brand",
  ENV: "bg-emerald-100 text-emerald-700",
  SANT: "bg-teal-100 text-teal-700",
  ENTR: "bg-amber-100 text-amber-700",
  LANG: "bg-indigo-100 text-indigo-700",
};
