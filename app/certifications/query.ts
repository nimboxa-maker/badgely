type SearchParams = Record<string, string | string[] | undefined>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function parseCertificationQuery(params: SearchParams) {
  return {
    query: firstParam(params.q).trim(),
    category: firstParam(params.category),
    provider: firstParam(params.provider),
    level: firstParam(params.level),
    vendorType: firstParam(params.vendorType),
    status: firstParam(params.status),
    targetRole: firstParam(params.targetRole),
    sort: firstParam(params.sort) || "featured",
  };
}
