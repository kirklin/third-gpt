"use client";

import { Analytics } from "@vercel/analytics/react";
import { memo } from "react";

import { getClientConfig } from "~/config/client";

const { VERCEL_DEBUG } = getClientConfig();

// eslint-disable-next-line react/display-name
const VercelAnalytics = memo(() => <Analytics debug={VERCEL_DEBUG} />);

export default VercelAnalytics;
