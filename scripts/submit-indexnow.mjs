const HOST = "badgely-alpha.vercel.app";
const SITE_URL = `https://${HOST}`;
const KEY = "a7a15100683f42d6993e98aee8b00051";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const candidate = trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `${SITE_URL}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;

  const url = new URL(candidate);
  if (url.protocol !== "https:" || url.hostname !== HOST) {
    throw new Error(`IndexNow URL must belong to ${SITE_URL}: ${value}`);
  }

  url.hash = "";
  return url.toString().replace(/\/$/, url.pathname === "/" ? "/" : "");
}

const urls = [...new Set(process.argv.slice(2).map(normalizeUrl).filter(Boolean))];

if (urls.length === 0) {
  console.error("Usage: npm run indexnow -- /path-one /path-two");
  process.exit(1);
}

if (urls.length > 10000) {
  console.error("IndexNow accepts at most 10,000 URLs per request.");
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

if (response.status !== 200 && response.status !== 202) {
  const body = await response.text();
  console.error(`IndexNow submission failed (${response.status}): ${body}`);
  process.exit(1);
}

console.log(
  response.status === 202
    ? `IndexNow accepted ${urls.length} URL(s); key validation is pending.`
    : `IndexNow accepted ${urls.length} URL(s).`,
);
