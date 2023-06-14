const mapping: Record<string, string> = {
  auctions: 'auction',
  bids: 'bid',
  marketplaces: 'marketplace',
  products: 'product',
  purchases: 'purchase',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
