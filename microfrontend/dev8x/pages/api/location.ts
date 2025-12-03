import type { NextApiRequest, NextApiResponse } from 'next';

type LocationResponse = {
  countryCode: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationResponse>
) {
  const headerCountry =
    (req.headers['x-user-country'] as string | undefined) ||
    (req.headers['cf-ipcountry'] as string | undefined) ||
    'PK';

  res.status(200).json({ countryCode: headerCountry });
}
